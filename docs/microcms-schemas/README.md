# microCMS スキーマ インポート用 JSON

各エンドポイントの**スキーマ設定**を microCMS にインポートするための JSON です。

## インポート手順
1. microCMS 管理画面で **API を新規作成**（型 = **リスト形式**）
   - エンドポイント名: ファイル名に合わせる（`stats` / `positions` / `works`）
2. 作成した API の **「API設定」→「スキーマ」→「スキーマの設定をインポート」**
3. 対応する JSON ファイルの中身を貼り付け／アップロードしてインポート
4. 必要なら各フィールドの必須・説明を微調整

> インポートはフィールド定義のみです。中身（コンテンツ）は別途、管理画面で追加するか
> `scripts/seed-*.mjs`（書き込みAPIキーが必要）で投入してください。

## ファイル
| ファイル | エンドポイント | 用途 | 備考 |
|---|---|---|---|
| `stats.json` | `stats` | ホームの実績数値バンド | label / value / unit / order |
| `positions.json` | `positions` | 採用の募集要項 | 既存なら再インポート不要 |
| `works.json` | `works` | 施工事例 | category はセレクト。既存なら再インポート不要 |

※ `blogs`（ブログ）は microCMS 標準のブログテンプレート（`title` / `content`(リッチエディタ) /
`eyecatch`(画像) / `category`(参照)）を利用しているため、ここには含めていません。

## 対応コード
- 取得: `src/lib/microcms.ts`（`getStats` / `getPositions` / `getWorks`）
- 表示: `stats`→`src/app/page.tsx` の StatsBand、`positions`→`src/app/recruit/page.tsx`、
  `works`→`src/app/works/page.tsx`
- いずれも未投入時は現行のサンプル値にフォールバックします。
