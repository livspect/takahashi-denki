// microCMS の "positions"(募集要項) エンドポイントに現行の3件を投入する一回限りのスクリプト。
//
// 事前準備（microCMS 管理画面）:
//   API 新規作成: エンドポイント = positions / 型 = リスト形式
//   フィールド（フィールドIDを下記のとおりに）:
//     - role            : テキスト（職種）
//     - type            : テキスト（雇用区分バッジ。例: 正社員）
//     - salary          : テキスト（給与）
//     - employmentType  : テキスト（雇用形態）
//     - location        : テキスト（勤務地）
//     - hours           : テキスト（勤務時間）
//     - holidays        : テキストエリア（休日休暇）
//     - benefits        : テキストエリア（待遇・福利厚生）
//     - qualifications  : テキストエリア（応募資格）
//   ※ 書き込み(POST)権限のAPIキーを使うこと。
//
// 実行:
//   MICROCMS_SERVICE_DOMAIN=takahashi-denki MICROCMS_WRITE_API_KEY=yyyy node scripts/seed-positions.mjs

const domain = process.env.MICROCMS_SERVICE_DOMAIN;
const apiKey = process.env.MICROCMS_WRITE_API_KEY;
if (!domain || !apiKey) {
  console.error("MICROCMS_SERVICE_DOMAIN と MICROCMS_WRITE_API_KEY を指定してください。");
  process.exit(1);
}

const positions = [
  {
    role: "電気工事士（経験者）",
    type: "正社員",
    salary: "月給 28〜45万円",
    employmentType: "正社員（試用期間3ヶ月）",
    location: "関東一円の各現場（直行直帰も可）",
    hours: "8:00〜17:00（休憩1時間、現場により変動）",
    holidays: "週休2日制／年間休日120日／有給／夏季・冬季休暇",
    benefits: "各種保険完備／資格手当／退職金／交通費支給",
    qualifications: "第二種電気工事士以上、施工経験3年以上",
  },
  {
    role: "電気工事士（未経験・新卒）",
    type: "正社員",
    salary: "月給 22〜26万円",
    employmentType: "正社員（試用期間3ヶ月）",
    location: "関東一円の各現場",
    hours: "8:00〜17:00（休憩1時間）",
    holidays: "週休2日制／年間休日120日／有給／夏季・冬季休暇",
    benefits: "各種保険完備／資格取得支援／退職金／交通費支給",
    qualifications: "学歴・経験不問。普通自動車免許（AT 限定可）",
  },
  {
    role: "施工管理（現場監督）",
    type: "正社員",
    salary: "月給 32〜55万円",
    employmentType: "正社員（試用期間3ヶ月）",
    location: "本社／関東一円の各現場",
    hours: "8:00〜17:00（休憩1時間）",
    holidays: "週休2日制／年間休日120日／有給／夏季・冬季休暇",
    benefits: "各種保険完備／役職手当／資格手当／退職金",
    qualifications: "電気工事施工管理技士または同等の実務経験",
  },
];

const endpoint = `https://${domain}.microcms.io/api/v1/positions`;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let ok = 0;
for (const p of positions) {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "X-MICROCMS-API-KEY": apiKey, "Content-Type": "application/json" },
    body: JSON.stringify(p),
  });
  const t = await res.text();
  if (res.ok) {
    ok++;
    console.log(`OK  ${p.role}`);
  } else {
    console.error(`NG  ${p.role}  [${res.status}] ${t.slice(0, 100)}`);
  }
  await sleep(600);
}
console.log(`\n投入完了: ${ok}/${positions.length} 件`);
