// ホームHeroの店舗外観画像から、レスポンシブな AVIF / WebP 変種を生成する。
//
// - デスクトップ/タブレット: 横長(元の storefront 1280x1135)をそのまま幅違いで
// - モバイル: フルスクリーンHero(縦長ビューポート)に合わせ 9:16 の縦長クロップを生成
//   （横長を object-cover すると左右を大量に捨てるため、看板中心の縦長に切り出す）
//
// 実行: node scripts/gen-hero-images.mjs

import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const photos = resolve(__dirname, "..", "public", "photos");
const SRC = resolve(photos, "storefront.webp"); // 1280x1135（最大元データ）

// ---- デスクトップ/タブレット用(横長) ----
const LANDSCAPE_WIDTHS = [640, 768, 1024, 1280];
for (const w of LANDSCAPE_WIDTHS) {
  const base = sharp(SRC).resize({ width: w, withoutEnlargement: true });
  // Heroは55-65%の青オーバーレイ下のため q50・effort4 で十分(攻めすぎない)
  await base.clone().avif({ quality: 50, effort: 4 }).toFile(resolve(photos, `storefront-${w}.avif`));
  if (w === 640) {
    await base.clone().webp({ quality: 78 }).toFile(resolve(photos, `storefront-640.webp`));
  }
}

// ---- モバイル用(縦長 9:16 クロップ) ----
const meta = await sharp(SRC).metadata();
const targetAspect = 9 / 16; // 幅/高さ
let cropW = Math.round(meta.height * targetAspect);
let cropH = meta.height;
if (cropW > meta.width) {
  cropW = meta.width;
  cropH = Math.round(meta.width / targetAspect);
}
const left = Math.round((meta.width - cropW) / 2); // 看板が中央寄りのため中央クロップ
const top = Math.round((meta.height - cropH) / 2);
const portrait = await sharp(SRC)
  .extract({ left, top, width: cropW, height: cropH })
  .toBuffer();

// クロップ元の幅が 638px のためそれ以上は無意味(withoutEnlargementで打ち止め)
const PORTRAIT_WIDTHS = [414, 512, 638];
for (const w of PORTRAIT_WIDTHS) {
  const base = sharp(portrait).resize({ width: w, withoutEnlargement: true });
  await base.clone().avif({ quality: 50, effort: 4 }).toFile(resolve(photos, `storefront-m-${w}.avif`));
  await base.clone().webp({ quality: 78 }).toFile(resolve(photos, `storefront-m-${w}.webp`));
}

console.log(
  `generated: landscape storefront-{${LANDSCAPE_WIDTHS}}.avif + portrait storefront-m-{${PORTRAIT_WIDTHS}}.{avif,webp} (crop ${cropW}x${cropH})`,
);
