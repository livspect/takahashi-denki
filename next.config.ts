import type { NextConfig } from "next";
import { BASE_PATH } from "./src/lib/config";

const isPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: isPages ? BASE_PATH : "",
  assetPrefix: isPages ? `${BASE_PATH}/` : "",
};

export default nextConfig;
