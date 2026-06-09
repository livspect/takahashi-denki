// 記事本文(microCMS リッチエディタの HTML)から目次を生成するビルド時ユーティリティ。
// h2/h3 を抽出して id を付与し、目次データと読了時間を返す。サーバー側で実行する。

export type TocItem = { id: string; text: string; level: 2 | 3 };

export type BuiltBlogContent = {
  html: string; // 見出しに id を付与済みの HTML
  toc: TocItem[];
  readingMinutes: number;
};

/** タグを除去してプレーンテキスト化（目次ラベル・読了時間用）。 */
function stripTags(html: string): string {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * 本文 HTML を受け取り、h2/h3 に id を付けつつ目次と読了時間を生成する。
 * microCMS の出力は素直な <h2>...</h2> / <h3>...</h3> 形式のためそれを前提にする。
 */
export function buildBlogContent(rawHtml: string): BuiltBlogContent {
  const toc: TocItem[] = [];
  let i = 0;

  const html = rawHtml.replace(
    /<h([23])(\s[^>]*)?>([\s\S]*?)<\/h\1>/g,
    (_match, lvl: string, attrs: string | undefined, inner: string) => {
      i += 1;
      const attrStr = attrs ?? "";
      const existing = attrStr.match(/\sid="([^"]+)"/);
      const id = existing ? existing[1] : `heading-${i}`;
      const text = stripTags(inner);
      if (text) toc.push({ id, text, level: Number(lvl) as 2 | 3 });
      return `<h${lvl}${attrStr}${existing ? "" : ` id="${id}"`}>${inner}</h${lvl}>`;
    },
  );

  const plainLength = stripTags(rawHtml).length;
  // 日本語はおよそ 500 文字/分で読める想定
  const readingMinutes = Math.max(1, Math.round(plainLength / 500));

  return { html, toc, readingMinutes };
}
