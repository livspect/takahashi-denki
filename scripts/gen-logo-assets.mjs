// ブランドロゴ(縦長の青マーク)から各種アイコン/ロゴ画像を生成する一回限りのスクリプト。
//
// 生成物:
//   src/app/icon.png         … ファビコン(512px・透過・余白付き)。Next.js が <link rel=icon> を自動付与。
//   src/app/apple-icon.png   … iOS ホーム画面用(180px・白背景・角丸対策)。
//   src/app/favicon.ico      … 旧来/検索エンジン向け(16/32/48 の PNG を内包した .ico)。
//   public/logo.webp         … ヘッダー等で使う透過ロゴマーク(高さ240px・トリミング済み)。
//
// 実行: node scripts/gen-logo-assets.mjs [入力PNGパス]
//   入力省略時は scripts/_logo-src.png を使用。

import sharp from "sharp";
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const SRC = process.argv[2] ?? resolve(__dirname, "_logo-src.png");

// 透過の余白を除去してマーク本体だけを取り出す。
const trimmed = await sharp(SRC).trim().png().toBuffer();

/** マークを正方形キャンバスへ contain 配置(余白 pad%)。背景は bg(透過 or 白)。 */
async function square(size, padRatio, bg) {
  const inner = Math.round(size * (1 - padRatio * 2));
  const fg = await sharp(trimmed)
    .resize(inner, inner, { fit: "inside", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();
  return sharp({
    create: { width: size, height: size, channels: 4, background: bg },
  })
    .composite([{ input: fg, gravity: "center" }])
    .png()
    .toBuffer();
}

const TRANSPARENT = { r: 0, g: 0, b: 0, alpha: 0 };
const WHITE = { r: 255, g: 255, b: 255, alpha: 1 };

// favicon (透過・少し余白)
await writeFile(resolve(root, "src/app/icon.png"), await square(512, 0.06, TRANSPARENT));
// apple-icon (白背景・iOSの角丸を考慮して余白多め)
await writeFile(resolve(root, "src/app/apple-icon.png"), await square(180, 0.12, WHITE));
// ヘッダー用ロゴ(高さ240・透過・トリミングのみ)
await sharp(trimmed)
  .resize({ height: 240, fit: "inside" })
  .webp({ quality: 92 })
  .toFile(resolve(root, "public/logo.webp"));

// ---- favicon.ico (PNG内包) ----
// ICO は単純: 6byte ヘッダ + 16byte/エントリ + 各画像データ。
// 各エントリに PNG をそのまま入れる(モダンブラウザは PNG-in-ICO 対応)。
async function icoFromSizes(sizes) {
  const images = await Promise.all(
    sizes.map((s) => square(s, 0.06, TRANSPARENT).then((data) => ({ size: s, data }))),
  );
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(images.length, 4);

  const entries = [];
  let offset = 6 + images.length * 16;
  for (const img of images) {
    const e = Buffer.alloc(16);
    e.writeUInt8(img.size >= 256 ? 0 : img.size, 0); // width (0 = 256)
    e.writeUInt8(img.size >= 256 ? 0 : img.size, 1); // height
    e.writeUInt8(0, 2); // palette
    e.writeUInt8(0, 3); // reserved
    e.writeUInt16LE(1, 4); // color planes
    e.writeUInt16LE(32, 6); // bpp
    e.writeUInt32LE(img.data.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += img.data.length;
    entries.push(e);
  }
  return Buffer.concat([header, ...entries, ...images.map((i) => i.data)]);
}

await writeFile(resolve(root, "src/app/favicon.ico"), await icoFromSizes([16, 32, 48]));

console.log("generated: icon.png / apple-icon.png / favicon.ico / public/logo.webp");
