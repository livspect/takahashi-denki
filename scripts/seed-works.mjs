// microCMS の "works"(施工事例) エンドポイントにダミーの施工事例を投入する一回限りのスクリプト。
//
// 事前準備（microCMS 管理画面）:
//   1. API を新規作成: エンドポイント = works / 型 = リスト形式
//   2. フィールドを作成（フィールドIDは下記のとおり）
//        - title    : テキストフィールド
//        - category : セレクトフィールド（電気 / 空調 / 給排水）またはテキスト
//        - area     : テキストフィールド
//        - year     : テキストフィールド
//        - scale    : テキストフィールド
//        - summary  : テキストエリア
//        - image    : テキストフィールド（暫定。/stock/... のパスや画像URLを入れる）
//        - thumbnail: 画像フィールド（任意。実写真をアップロードする場合に使用）
//   3. 「書き込み（POST）権限」を付けた APIキーを発行
//
// 実行:
//   MICROCMS_SERVICE_DOMAIN=xxxx MICROCMS_WRITE_API_KEY=yyyy node scripts/seed-works.mjs
//
//   ※ MICROCMS_SERVICE_DOMAIN は https://xxxx.microcms.io の "xxxx" 部分。

const domain = process.env.MICROCMS_SERVICE_DOMAIN;
const apiKey = process.env.MICROCMS_WRITE_API_KEY;

if (!domain || !apiKey) {
  console.error(
    "環境変数 MICROCMS_SERVICE_DOMAIN と MICROCMS_WRITE_API_KEY を指定してください。",
  );
  process.exit(1);
}

const works = [
  {
    title: "店舗 照明・配線設備工事",
    category: "電気",
    area: "東京都大田区",
    year: "2025",
    scale: "物販店舗",
    image: "/stock/lighting.webp",
    summary:
      "店舗リニューアルに合わせ、天井照明とコンセント配線を全面更新。営業を止めない夜間施工で対応しました。",
  },
  {
    title: "業務用エアコン入替工事",
    category: "空調",
    area: "東京都品川区",
    year: "2025",
    scale: "オフィス",
    image: "/stock/ac.webp",
    summary:
      "老朽化した天井カセット形エアコンを入替。配管・ドレンも合わせて点検し、空調効率を改善しました。",
  },
  {
    title: "給湯・給水設備の改修工事",
    category: "給排水",
    area: "東京都大田区",
    year: "2024",
    scale: "戸建て住宅",
    image: "/stock/plumbing.webp",
    summary:
      "屋外の給湯器と給水配管を更新。漏水リスクを抑えつつ、快適な水まわり環境を整えました。",
  },
  {
    title: "住宅 コンセント増設・電気工事",
    category: "電気",
    area: "東京都目黒区",
    year: "2024",
    scale: "戸建て住宅",
    image: "/stock/electrical.webp",
    summary:
      "家電の増加に合わせてコンセントを増設し、分電盤まわりも見直し。安全に使える配線へ整えました。",
  },
  {
    title: "厨房 ダクト・換気設備工事",
    category: "空調",
    area: "東京都大田区",
    year: "2024",
    scale: "飲食店",
    image: "/stock/ductwork.webp",
    summary:
      "飲食店の厨房ダクトと換気設備を施工。油汚れに配慮した清掃しやすい構成を採用しました。",
  },
  {
    title: "店舗 看板・ネオン電気工事",
    category: "電気",
    area: "東京都世田谷区",
    year: "2024",
    scale: "路面店",
    image: "/stock/lighting.webp",
    summary:
      "店舗の看板・ネオンサインの電気工事を担当。視認性と省エネを両立する配線計画でご提案しました。",
  },
  {
    title: "ガス管配管工事",
    category: "給排水",
    area: "東京都品川区",
    year: "2023",
    scale: "集合住宅",
    image: "/stock/plumbing.webp",
    summary:
      "集合住宅のガス管配管を更新。気密試験を徹底し、安全性を最優先に施工しました。",
  },
  {
    title: "冷凍冷蔵設備 設置工事",
    category: "空調",
    area: "東京都大田区",
    year: "2023",
    scale: "小売店",
    image: "/stock/ac.webp",
    summary:
      "小売店向けの冷凍冷蔵設備を設置。電源・冷媒配管まで一貫して対応しました。",
  },
];

const endpoint = `https://${domain}.microcms.io/api/v1/works`;
let ok = 0;
for (const w of works) {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "X-MICROCMS-API-KEY": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(w),
  });
  const body = await res.text();
  if (res.ok) {
    ok++;
    console.log(`OK  ${w.title}  -> ${body}`);
  } else {
    console.error(`NG  ${w.title}  [${res.status}] ${body}`);
  }
}
console.log(`\n投入完了: ${ok}/${works.length} 件`);
