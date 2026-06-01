type JsonLdData = Record<string, unknown>;

/**
 * JSON-LD 構造化データを <script type="application/ld+json"> として出力する。
 * data は自前の静的オブジェクトのみを渡す前提（ユーザー入力を埋め込まない）。
 */
export function JsonLd({ data }: { data: JsonLdData | JsonLdData[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
