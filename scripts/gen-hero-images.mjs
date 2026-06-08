// ホームHeroの店舗外観画像から、レスポンシブな AVIF / WebP 変種を生成する。
//
// 既存の storefront.webp(1280) を元に、LCP 軽量化のため AVIF を追加し、
// 小型端末向けに 640w も用意する。再実行は冪等。
//
// 実行: node scripts/gen-hero-images.mjs

import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const photos = resolve(__dirname, "..", "public", "photos");
const SRC = resolve(photos, "storefront.webp"); // 1280x1135（最大元データ）

const WIDTHS = [640, 768, 1024, 1280];

for (const w of WIDTHS) {
  const base = sharp(SRC).resize({ width: w, withoutEnlargement: true });
  // AVIF（高圧縮。Heroは55-65%の青オーバーレイ下で実写真の3-4割しか見えないため、
  // q42・effort6 まで攻めても劣化はほぼ不可視。LCPリソースを軽量化する）
  await base
    .clone()
    .avif({ quality: 42, effort: 6 })
    .toFile(resolve(photos, `storefront-${w}.avif`));
  // WebP は 640 のみ新規追加（768/1024/1280 は既存を維持して二重圧縮を避ける）
  if (w === 640) {
    await base
      .clone()
      .webp({ quality: 78 })
      .toFile(resolve(photos, `storefront-640.webp`));
  }
}

console.log("generated: storefront-{640,768,1024,1280}.avif, storefront-640.webp");
