// =============================================================
// サイトの公開 URL に関する単一の真実 (single source of truth)
//
// ホスティング先が変わったら、このファイルの SITE_ORIGIN / BASE_PATH
// だけを書き換えれば、canonical・OpenGraph・サイトマップ・構造化データ・
// 静的アセットの参照先がすべて追従します。
//
//   現在 (Cloudflare Workers, ルート配信):
//     SITE_ORIGIN = "https://takahashi-denki.livspect.workers.dev"
//     BASE_PATH   = ""
//     → 公開 URL: https://takahashi-denki.livspect.workers.dev
//
//   独自ドメインに移行する場合:
//     SITE_ORIGIN = "https://www.example.co.jp"
//     BASE_PATH   = ""
//
//   GitHub Pages 等サブパス配信に戻す場合のみ BASE_PATH に "/repo名" を入れる。
//
// このファイルは Next の設定 (next.config.ts) からも読み込むため、
// ランタイム依存 (next / DOM 等) を import しないこと。
// =============================================================

/** プロトコル + ホスト（末尾スラッシュなし） */
export const SITE_ORIGIN = "https://takahashi-denki.livspect.workers.dev";

/**
 * 公開サブパス（先頭スラッシュあり・末尾なし）。ルート配信では "" にする。
 * next.config.ts の basePath / assetPrefix もこの値を参照します。
 */
export const BASE_PATH = "";

/** 正規の公開ルート URL（末尾スラッシュなし）。例: https://livspect.github.io/takahashi-denki */
export const SITE_URL = `${SITE_ORIGIN}${BASE_PATH}`;

/**
 * 相対パスを正規の絶対 URL に変換する。
 * メタデータの canonical / OpenGraph、構造化データ、サイトマップで使用。
 *
 *   url("/")              -> https://takahashi-denki.livspect.workers.dev/
 *   url("/business")      -> https://takahashi-denki.livspect.workers.dev/business/
 *   url("/stock/a.webp")  -> https://takahashi-denki.livspect.workers.dev/stock/a.webp
 *
 * next.config.ts の trailingSlash: true に合わせ、ファイル拡張子を含まない
 * ページパスには末尾スラッシュを付与する（画像等の拡張子付きは付与しない）。
 */
export function url(path = "/"): string {
  if (/^https?:\/\//.test(path)) return path;
  const clean = `/${path.replace(/^\/+/, "").replace(/\/+$/, "")}`;
  if (clean === "/") return `${SITE_URL}/`;
  const isFile = /\.[a-z0-9]+$/i.test(clean);
  return `${SITE_URL}${clean}${isFile ? "" : "/"}`;
}
