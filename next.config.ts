import type { NextConfig } from "next";
import { BASE_PATH } from "./src/lib/config";

const isPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: isPages ? BASE_PATH : "",
  assetPrefix: isPages ? `${BASE_PATH}/` : "",
  // NOTE: render-blocking CSS の解消は output:"export" では experimental.optimizeCss が
  // 効かないため、ビルド後に scripts/inline-critical-css.mjs (beasties) で対応する。
};

export default nextConfig;
