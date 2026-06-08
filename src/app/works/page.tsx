import { PageHeader } from "@/components/PageHeader";
import { WorksFilter } from "@/components/WorksFilter";
import { getWorks } from "@/lib/microcms";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "施工事例",
  description:
    "住宅・店舗・施設まで、電気・空調・給排水の各分野で手がけた代表的な施工事例をご紹介します。",
  path: "/works",
});

// microCMS の works が未投入/取得不可のときに表示するサンプル（デグレ防止）。
const FALLBACK_WORKS = [
  {
    title: "店舗 照明・配線設備工事",
    cat: "電気",
    area: "東京都大田区",
    year: "2025",
    scale: "物販店舗",
    image: "/stock/lighting.webp",
    summary: "店舗リニューアルに合わせ、天井照明とコンセント配線を全面更新。営業を止めない夜間施工で対応しました。",
  },
  {
    title: "業務用エアコン入替工事",
    cat: "空調",
    area: "東京都品川区",
    year: "2025",
    scale: "オフィス",
    image: "/stock/ac.webp",
    summary: "老朽化した天井カセット形エアコンを入替。配管・ドレンも合わせて点検し、空調効率を改善しました。",
  },
  {
    title: "給湯・給水設備の改修工事",
    cat: "給排水",
    area: "東京都大田区",
    year: "2024",
    scale: "戸建て住宅",
    image: "/stock/plumbing.webp",
    summary: "屋外の給湯器と給水配管を更新。漏水リスクを抑えつつ、快適な水まわり環境を整えました。",
  },
  {
    title: "住宅 コンセント増設・電気工事",
    cat: "電気",
    area: "東京都目黒区",
    year: "2024",
    scale: "戸建て住宅",
    image: "/stock/electrical.webp",
    summary: "家電の増加に合わせてコンセントを増設し、分電盤まわりも見直し。安全に使える配線へ整えました。",
  },
  {
    title: "厨房 ダクト・換気設備工事",
    cat: "空調",
    area: "東京都大田区",
    year: "2024",
    scale: "飲食店",
    image: "/stock/ductwork.webp",
    summary: "飲食店の厨房ダクトと換気設備を施工。油汚れに配慮した清掃しやすい構成を採用しました。",
  },
  {
    title: "店舗 看板・ネオン電気工事",
    cat: "電気",
    area: "東京都世田谷区",
    year: "2024",
    scale: "路面店",
    image: "/stock/lighting.webp",
    summary: "店舗の看板・ネオンサインの電気工事を担当。視認性と省エネを両立する配線計画でご提案しました。",
  },
  {
    title: "ガス管配管工事",
    cat: "給排水",
    area: "東京都品川区",
    year: "2023",
    scale: "集合住宅",
    image: "/stock/plumbing.webp",
    summary: "集合住宅のガス管配管を更新。気密試験を徹底し、安全性を最優先に施工しました。",
  },
  {
    title: "冷凍冷蔵設備 設置工事",
    cat: "空調",
    area: "東京都大田区",
    year: "2023",
    scale: "小売店",
    image: "/stock/ac.webp",
    summary: "小売店向けの冷凍冷蔵設備を設置。電源・冷媒配管まで一貫して対応しました。",
  },
];

export default async function WorksPage() {
  const cms = await getWorks();
  const works = cms.length
    ? cms.map((w) => ({
        title: w.title,
        cat: w.category ?? "その他",
        area: w.area ?? "",
        year: w.year ?? "",
        scale: w.scale ?? "",
        image: w.thumbnail?.url ?? w.image ?? "/stock/electrical.webp",
        summary: w.summary ?? "",
      }))
    : FALLBACK_WORKS;

  return (
    <>
      <PageHeader
        en="WORKS"
        jp="施工事例"
        description="住宅・店舗・施設まで、電気・空調・給排水の各分野で手がけた代表的な施工事例をご紹介します。"
        breadcrumbs={[{ label: "施工事例" }]}
      />

      <section className="py-12 sm:py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <WorksFilter
            works={works}
            categories={["すべて", "電気", "空調", "給排水"]}
          />
        </div>
      </section>
    </>
  );
}

