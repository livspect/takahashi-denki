// =============================================================
// サイトの公開 URL に関する単一の真実 (single source of truth)
//
// ホスティング先が変わったら、このファイルの SITE_ORIGIN / BASE_PATH
// だけを書き換えれば、canonical・OpenGraph・サイトマップ・構造化データ・
// 静的アセットの参照先がすべて追従します。
//
//   現在 (GitHub Pages):
//     SITE_ORIGIN = "https://livspect.github.io"
//     BASE_PATH   = "/takahashi-denki"
//     → 公開 URL: https://livspect.github.io/takahashi-denki
//
//   将来 独自ドメインに移行する場合:
//     SITE_ORIGIN = "https://www.example.co.jp"
//     BASE_PATH   = ""   // サブパス無し
//
// このファイルは Next の設定 (next.config.ts) からも読み込むため、
// ランタイム依存 (next / DOM 等) を import しないこと。
// =============================================================

/** プロトコル + ホスト（末尾スラッシュなし） */
export const SITE_ORIGIN = "https://livspect.github.io";

/**
 * リポジトリ名に対応する公開サブパス（先頭スラッシュあり・末尾なし）。
 * 独自ドメイン運用ではここを "" にする。
 * next.config.ts の basePath / assetPrefix もこの値を参照します。
 */
export const BASE_PATH = "/takahashi-denki";

/** 正規の公開ルート URL（末尾スラッシュなし）。例: https://livspect.github.io/takahashi-denki */
export const SITE_URL = `${SITE_ORIGIN}${BASE_PATH}`;

/**
 * 相対パスを正規の絶対 URL に変換する。
 * メタデータの canonical / OpenGraph、構造化データ、サイトマップで使用。
 *
 *   url("/")             -> https://livspect.github.io/takahashi-denki/
 *   url("/business")     -> https://livspect.github.io/takahashi-denki/business/
 *   url("/stock/a.jpg")  -> https://livspect.github.io/takahashi-denki/stock/a.jpg
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
