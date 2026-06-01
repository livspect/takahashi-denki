// ビルド後処理: out/ の各 HTML にクリティカル CSS をインライン化し、
// 本体スタイルシートを非ブロッキング(preload→swap)で読み込ませる。
// これにより「レンダリングをブロックする CSS」を解消する。
// next build (output: export) は CSS を <link rel=stylesheet> として吐くため、
// 静的エクスポートでは experimental.optimizeCss が効かず、この後処理で対応する。
import Beasties from "beasties";
import { readFile, writeFile, readdir } from "node:fs/promises";
import { join } from "node:path";

const OUT = "out";

async function* htmlFiles(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* htmlFiles(p);
    else if (e.name.endsWith(".html")) yield p;
  }
}

const beasties = new Beasties({
  path: OUT,
  publicPath: "/",
  preload: "swap", // 非クリティカルCSSを preload→onload で非同期読込に
  pruneSource: false, // 共有CSSファイルは全ページで使うため削らない
  logLevel: "silent",
});

let n = 0;
for await (const file of htmlFiles(OUT)) {
  const html = await readFile(file, "utf8");
  const processed = await beasties.process(html);
  await writeFile(file, processed);
  n++;
}
console.log(`[inline-critical-css] processed ${n} HTML files`);
