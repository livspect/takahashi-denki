import { PageHeader } from "@/components/PageHeader";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { site } from "@/lib/site";

export const metadata = {
  title: `施工事例 | ${site.name}`,
};

const works = [
  {
    title: "店舗 照明・配線設備工事",
    cat: "電気",
    area: "東京都大田区",
    year: "2025",
    scale: "物販店舗",
    image: "/stock/lighting.jpg",
    summary: "店舗リニューアルに合わせ、天井照明とコンセント配線を全面更新。営業を止めない夜間施工で対応しました。",
  },
  {
    title: "業務用エアコン入替工事",
    cat: "空調",
    area: "東京都品川区",
    year: "2025",
    scale: "オフィス",
    image: "/stock/ac.jpg",
    summary: "老朽化した天井カセット形エアコンを入替。配管・ドレンも合わせて点検し、空調効率を改善しました。",
  },
  {
    title: "給湯・給水設備の改修工事",
    cat: "給排水",
    area: "東京都大田区",
    year: "2024",
    scale: "戸建て住宅",
    image: "/stock/plumbing.jpg",
    summary: "屋外の給湯器と給水配管を更新。漏水リスクを抑えつつ、快適な水まわり環境を整えました。",
  },
  {
    title: "住宅 コンセント増設・電気工事",
    cat: "電気",
    area: "東京都目黒区",
    year: "2024",
    scale: "戸建て住宅",
    image: "/stock/electrical.jpg",
    summary: "家電の増加に合わせてコンセントを増設し、分電盤まわりも見直し。安全に使える配線へ整えました。",
  },
  {
    title: "厨房 ダクト・換気設備工事",
    cat: "空調",
    area: "東京都大田区",
    year: "2024",
    scale: "飲食店",
    image: "/stock/ductwork.jpg",
    summary: "飲食店の厨房ダクトと換気設備を施工。油汚れに配慮した清掃しやすい構成を採用しました。",
  },
  {
    title: "店舗 看板・ネオン電気工事",
    cat: "電気",
    area: "東京都世田谷区",
    year: "2024",
    scale: "路面店",
    image: "/stock/lighting.jpg",
    summary: "店舗の看板・ネオンサインの電気工事を担当。視認性と省エネを両立する配線計画でご提案しました。",
  },
  {
    title: "ガス管配管工事",
    cat: "給排水",
    area: "東京都品川区",
    year: "2023",
    scale: "集合住宅",
    image: "/stock/plumbing.jpg",
    summary: "集合住宅のガス管配管を更新。気密試験を徹底し、安全性を最優先に施工しました。",
  },
  {
    title: "冷凍冷蔵設備 設置工事",
    cat: "空調",
    area: "東京都大田区",
    year: "2023",
    scale: "小売店",
    image: "/stock/ac.jpg",
    summary: "小売店向けの冷凍冷蔵設備を設置。電源・冷媒配管まで一貫して対応しました。",
  },
];

export default function WorksPage() {
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
          <div className="flex flex-wrap gap-2 mb-10">
            {["すべて", "電気", "空調", "給排水"].map(
              (tag, i) => (
                <button
                  key={tag}
                  type="button"
                  className={`px-5 py-2 text-sm font-bold border transition-colors ${
                    i === 0
                      ? "bg-brand-600 text-white border-brand-600"
                      : "border-[color:var(--border)] hover:border-brand-600 hover:text-brand-700"
                  }`}
                >
                  {tag}
                </button>
              )
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {works.map((w, i) => (
              <article
                key={w.title}
                className="group bg-white border border-[color:var(--border)] hover:border-brand-500 transition-colors"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={w.image}
                    alt={w.title}
                    className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 bg-white text-brand-800 text-xs font-bold px-3 py-1">
                    {w.cat}
                  </span>
                </div>
                <div className="p-6">
                  <p className="text-xs text-brand-700 font-bold mb-3">
                    {w.area} ／ {w.year} ／ {w.scale}
                  </p>
                  <h3 className="text-lg font-black leading-snug mb-3 group-hover:text-brand-700 transition-colors">
                    {w.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-foreground/70">
                    {w.summary}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-16 flex justify-center">
            <nav className="flex items-center gap-2">
              {["‹", "1", "2", "3", "›"].map((p, i) => (
                <button
                  key={i}
                  type="button"
                  className={`w-10 h-10 text-sm font-bold border transition-colors ${
                    p === "1"
                      ? "bg-brand-600 text-white border-brand-600"
                      : "border-[color:var(--border)] hover:border-brand-600 hover:text-brand-700"
                  }`}
                >
                  {p}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </section>
    </>
  );
}
