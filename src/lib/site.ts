export const site = {
  name: "有限会社たかはし電器",
  shortName: "TAKAHASHI",
  tagline: "電気・空調・給排水で、暮らしと現場を支える。",
  description:
    "東京都大田区を拠点に、電気工事から冷暖房・空調、給排水まで、住宅・店舗・施設の設備工事を一貫して手がけています。地域に根ざした確かな施工でお応えします。",
  address: {
    zip: "146-0085",
    line1: "東京都大田区久が原2-14-1",
    line2: "",
  },
  phone: "03-3752-3570",
  email: "info@example.jp",
  established: "2008年4月",
  capital: "1,000万円",
  employees: "32名（2025年4月現在）",
  copyright: "© 有限会社たかはし電器",
};

export const businessPillars = [
  {
    en: "ELECTRICAL",
    title: "電気工事",
    image: "/works/5379.png",
    body: "住宅・店舗・施設の屋内外配線から照明・コンセントまで、電気に関わる工事全般に対応します。",
    items: [
      "コンセント工事",
      "照明設備工事",
      "ネオン設備工事",
      "引込線工事",
      "交通信号設備工事",
      "避雷針工事",
      "電気防食工事",
    ],
  },
  {
    en: "AIR CONDITIONING",
    title: "空調工事",
    image: "/works/5426.png",
    body: "業務用・家庭用エアコンの設置から冷暖房・冷凍冷蔵・ダクトまで、快適な空調環境を整えます。",
    items: [
      "冷暖房設備工事",
      "冷凍冷蔵設備工事",
      "空調設備工事",
      "ダクト工事",
    ],
  },
  {
    en: "PLUMBING",
    title: "給排水・水道工事",
    image: "/works/5427.png",
    body: "給水・給湯・排水設備の新設や改修から、ガス配管・浄化槽まで、水まわりの設備を幅広く手がけます。",
    items: [
      "給水給湯設備工事",
      "ガス管配管工事",
      "浄化槽工事",
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
