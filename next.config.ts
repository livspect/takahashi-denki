import type { NextConfig } from "next";

const isPages = process.env.GITHUB_PAGES === "true";
const repoBase = "/electrics-website";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: isPages ? repoBase : "",
  assetPrefix: isPages ? `${repoBase}/` : "",
};

export default nextConfig;
