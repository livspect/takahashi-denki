export const site = {
  name: "有限会社たかはし電器",
  shortName: "TAKAHASHI",
  tagline: "電気・空調・給排水で、暮らしと現場を支える。",
  description:
    "東京都大田区を拠点に、電気・空調・給排水・ガスの設備工事から家電の販売・設置・修理まで、住宅・店舗・施設をまるごとサポート。パナソニックの地域店として、地域に根ざした確かな施工でお応えします。",
  address: {
    zip: "146-0085",
    line1: "東京都大田区久が原2-14-1",
    line2: "",
  },
  phone: "03-3752-3570",
  fax: "03-3752-7979",
  email: "contact@taka-den.net",
  established: "昭和52年（1977年）3月",
  capital: "300万円",
  employees: "12名",
  businessHours: "9:00〜17:00",
  closedDays: "日曜・祝日",
  copyright: "© 有限会社たかはし電器",
};

export const businessPillars = [
  {
    en: "ELECTRICAL",
    title: "電気工事",
    image: "/stock/electrical.webp",
    body: "スイッチ・コンセントから照明、弱電、分電盤、EV充電、オフィス・マンションの設備まで、電気に関わる工事全般に対応します。",
    items: [
      "スイッチ・コンセント工事",
      "照明器具 交換・取付",
      "弱電設備（TV・LAN・電話・防犯カメラ）",
      "アンテナ工事",
      "インターホン工事",
      "分電盤・ブレーカー工事",
      "200V切替・IH設置工事",
      "EV充電用コンセント工事",
      "共用灯・制御盤工事",
      "オフィスのLED化・回路増設",
      "漏電調査",
      "住宅・マンション・店舗リフォーム",
    ],
  },
  {
    en: "AIR CONDITIONING",
    title: "空調設備工事",
    image: "/stock/ac.webp",
    body: "業務用・住宅用エアコンの設置・交換から、換気扇・ダクト・レンジフード・浴室暖房まで、快適な空気環境を整えます。",
    items: [
      "業務用エアコン 設置・交換",
      "住宅用エアコン 設置・交換",
      "エアコンクリーニング",
      "換気扇 設置・交換",
      "給排気ダクト工事",
      "レンジフード工事",
      "浴室暖房換気扇工事",
      "リフォーム工事",
    ],
  },
  {
    en: "PLUMBING & GAS",
    title: "給排水・ガス工事",
    image: "/stock/plumbing.webp",
    body: "ガス給湯器・コンロ、トイレ・浴室・キッチンの水まわりから、エコキュート、水漏れ・つまり修理まで幅広く対応します。",
    items: [
      "ガス給湯器 設置・交換",
      "ガスコンロ 設置・交換",
      "エコキュート 設置・交換",
      "トイレ 設置・交換",
      "ウォシュレット・温水洗浄便座",
      "浴室水栓・シャワー交換",
      "キッチン・洗面台交換",
      "食洗機工事",
      "水漏れ・つまり修理",
      "リフォーム工事",
    ],
  },
  {
    en: "HOME APPLIANCES",
    title: "家電販売・設置・修理",
    image: "/stock/appliances.webp",
    body: "パナソニックの地域店として、テレビ・洗濯機・冷蔵庫など家電の販売から設置・配線・修理まで一貫して対応します。",
    items: [
      "テレビ（壁掛け・配線・大型設置）",
      "洗濯機 設置・交換（ドラム式・縦型）",
      "洗濯パン交換",
      "冷蔵庫設置（クレーン車搬入対応）",
      "各種家電の設置・配線",
      "修理・アフター対応",
    ],
  },
];

export type NavItem = {
  label: string;
  href: string;
  en?: string;
  children?: NavItem[];
};

export const navigation: NavItem[] = [
  {
    label: "事業内容",
    en: "Business",
    href: "/business",
    children: [
      { label: "対応工事", href: "/business#scope" },
      { label: "施工の強み", href: "/business#strength" },
      { label: "対応エリア", href: "/business#area" },
    ],
  },
  {
    label: "施工事例",
    en: "Works",
    href: "/works",
  },
  {
    label: "会社概要",
    en: "Company",
    href: "/about",
    children: [
      { label: "ビジョン", href: "/about#vision" },
      { label: "社風・雰囲気", href: "/about#culture" },
      { label: "社会貢献活動", href: "/about#csr" },
    ],
  },
  {
    label: "採用情報",
    en: "Recruit",
    href: "/recruit",
    children: [
      { label: "社員募集", href: "/recruit" },
      { label: "協力会社募集", href: "/recruit/partner" },
      { label: "キャリアについて", href: "/recruit#career" },
    ],
  },
  {
    label: "ブログ",
    en: "Blog",
    href: "/blog",
  },
];

export const serviceAreas = [
  {
    region: "東京都",
    items: [
      "千代田区",
      "中央区",
      "港区",
      "新宿区",
      "文京区",
      "台東区",
      "墨田区",
      "江東区",
      "品川区",
      "目黒区",
      "大田区",
      "世田谷区",
      "渋谷区",
      "中野区",
      "杉並区",
      "豊島区",
      "北区",
      "荒川区",
      "板橋区",
      "練馬区",
      "足立区",
      "葛飾区",
      "江戸川区",
    ],
  },
  {
    region: "埼玉県",
    items: [
      "さいたま市",
      "川越市",
      "熊谷市",
      "川口市",
      "所沢市",
      "春日部市",
      "上尾市",
      "草加市",
      "越谷市",
      "蕨市",
      "戸田市",
      "朝霞市",
      "新座市",
      "久喜市",
      "三郷市",
    ],
  },
  {
    region: "千葉県",
    items: ["千葉市", "船橋市", "松戸市", "市川市", "柏市", "流山市"],
  },
];
