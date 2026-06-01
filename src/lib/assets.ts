import { BASE_PATH } from "./config";

const isPages = process.env.GITHUB_PAGES === "true";
const basePath = isPages ? BASE_PATH : "";

export function asset(path: string): string {
  if (!path) return path;
  if (/^https?:\/\//.test(path)) return path;
  return `${basePath}${path}`;
}
