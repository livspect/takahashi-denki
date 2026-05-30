const isPages = process.env.GITHUB_PAGES === "true";
const basePath = isPages ? "/electrics-website" : "";

export function asset(path: string): string {
  if (!path) return path;
  if (/^https?:\/\//.test(path)) return path;
  return `${basePath}${path}`;
}
