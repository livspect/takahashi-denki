// microCMS の "stats"(実績数値バンド) エンドポイントに現行の4件を投入する一回限りのスクリプト。
//
// 事前準備（microCMS 管理画面）:
//   API 新規作成: エンドポイント = stats / 型 = リスト形式
//   フィールド（フィールドIDを下記のとおりに）:
//     - label  : テキスト（項目名。例: 創業からの歩み）
//     - value  : テキスト（数値。例: 16, 480。"+"等も入れられるようテキスト）
//     - unit   : テキスト（単位。例: 年, 名, 件+, %）
//     - order  : 数値（表示順。小さい順に並ぶ）
//   ※ 書き込み(POST)権限のAPIキーを使うこと。
//   ※ 件数は自由（増減OK）。デザインはデスクトップ4列なので4件が最も収まりが良い。
//
// 実行:
//   MICROCMS_SERVICE_DOMAIN=takahashi-denki MICROCMS_WRITE_API_KEY=yyyy node scripts/seed-stats.mjs

const domain = process.env.MICROCMS_SERVICE_DOMAIN;
const apiKey = process.env.MICROCMS_WRITE_API_KEY;
if (!domain || !apiKey) {
  console.error("MICROCMS_SERVICE_DOMAIN と MICROCMS_WRITE_API_KEY を指定してください。");
  process.exit(1);
}

const stats = [
  { label: "創業からの歩み", value: "49", unit: "年", order: 1 },
  { label: "従業員数", value: "12", unit: "名", order: 2 },
  { label: "事業分野", value: "4", unit: "分野", order: 3 },
  { label: "地域密着", value: "大田区", unit: "", order: 4 },
];

const endpoint = `https://${domain}.microcms.io/api/v1/stats`;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let ok = 0;
for (const s of stats) {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "X-MICROCMS-API-KEY": apiKey, "Content-Type": "application/json" },
    body: JSON.stringify(s),
  });
  const t = await res.text();
  if (res.ok) {
    ok++;
    console.log(`OK  ${s.label}`);
  } else {
    console.error(`NG  ${s.label}  [${res.status}] ${t.slice(0, 100)}`);
  }
  await sleep(600);
}
console.log(`\n投入完了: ${ok}/${stats.length} 件`);
