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

## コンテンツの一括インポート（CSV）
スキーマを作成したら、`content/` 配下の CSV でコンテンツを一括投入できます。

手順:
1. 各 API の **「コンテンツ」画面 → 右上の「…」→「インポート」**（CSV）
2. 対応する CSV を選択してインポート（文字コードは UTF-8）

| CSV | エンドポイント | 備考 |
|---|---|---|
| `content/stats.csv` | `stats` | 現行の4件（16年/32名/480件+/98%） |
| `content/positions.csv` | `positions` | 募集要項3件（サンプル。内容は要確認・編集） |
| `content/works.csv` | `works` | 施工事例7件（**サンプル**。実案件に差し替え推奨） |

注意点:
- **1列目は `id`（半角英数字）が必須**です（microCMS 仕様）。同梱 CSV は `stat1` `pos1` `work1`…
  と設定済み。日本語や記号は不可（idエラーになります）。
- **画像（works の thumbnail / blogs の eyecatch）は CSV で取り込めません**。インポート後に
  各コンテンツで手動アップロードしてください（CSV はテキスト系フィールドのみ）。
- CSV はカンマ区切りのため、本文に半角カンマ「,」を使う場合はそのセルを `"..."` で囲みます
  （同梱の CSV は全角読点「、」を使用しておりエスケープ不要）。
- インポート後、各コンテンツを **公開** すると本番の再ビルドで反映されます。

## 対応コード
- 取得: `src/lib/microcms.ts`（`getStats` / `getPositions` / `getWorks`）
- 表示: `stats`→`src/app/page.tsx` の StatsBand、`positions`→`src/app/recruit/page.tsx`、
  `works`→`src/app/works/page.tsx`
- いずれも未投入時は現行のサンプル値にフォールバックします。
