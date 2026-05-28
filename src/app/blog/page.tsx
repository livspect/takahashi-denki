import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { site } from "@/lib/site";

export const metadata = {
  title: `ブログ | ${site.name}`,
};

const categories = ["すべて", "現場レポート", "お知らせ", "社内イベント", "技術ノート", "採用"];

const posts = [
  {
    date: "2025.05.18",
    cat: "現場レポート",
    title: "物流センター新築工事の進行状況",
    excerpt:
      "春日部市内で進行中の物流センター新築工事。受変電設備の搬入が完了し、配線フェーズに入りました。",
  },
  {
    date: "2025.05.10",
    cat: "お知らせ",
    title: "2026年度新卒採用エントリー受付開始",
    excerpt:
      "電気工事士を目指す学生の皆さんへ。会社説明会・現場見学会を随時開催しています。",
  },
  {
    date: "2025.04.27",
    cat: "社内イベント",
    title: "春の安全大会を開催しました",
    excerpt:
      "協力会社の皆様と合同で実施。今年度のKY活動方針と新工具の取り扱い研修を行いました。",
  },
  {
    date: "2025.04.15",
    cat: "技術ノート",
    title: "高圧キュービクル更新時の停電計画の立て方",
    excerpt:
      "稼働中のテナントビルで受変電設備を更新する際の、停電計画と段階施工のポイントをまとめました。",
  },
  {
    date: "2025.04.02",
    cat: "採用",
    title: "未経験で入社した社員インタビュー（入社2年目／中島）",
    excerpt:
      "「最初は工具の名前も分からなかった」入社2年目の中島が、現場で学んだことを率直に語ります。",
  },
  {
    date: "2025.03.20",
    cat: "お知らせ",
    title: "本社オフィスを増床リニューアルしました",
    excerpt:
      "事業拡大に伴い、本社4Fに加え3Fを増床。打ち合わせスペースと研修ルームを新設しました。",
  },
  {
    date: "2025.03.07",
    cat: "現場レポート",
    title: "商業施設のテナント区画リニューアル工事",
    excerpt:
      "深夜・早朝の限られた時間帯のみで進行する商業施設リニューアル工事の現場をご紹介します。",
  },
  {
    date: "2025.02.18",
    cat: "技術ノート",
    title: "LED 化更新の費用対効果を試算するコツ",
    excerpt:
      "オフィスビル LED 化案件の試算プロセス。電力会社の契約見直しと合わせた提案ポイント。",
  },
  {
    date: "2025.02.04",
    cat: "社内イベント",
    title: "技能五輪選手の社内激励会を開催",
    excerpt:
      "若手職人が技能五輪電気工事部門に挑戦。社内でも盛り上げていきます。",
  },
];

export default function BlogPage() {
  return (
    <>
      <PageHeader
        en="BLOG"
        jp="現場ブログ"
        description="現場の様子・お知らせ・採用情報・技術ノートなど、有限会社たかはし電器の今をお届けします。"
        breadcrumbs={[{ label: "ブログ" }]}
      />

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1fr_280px] gap-12 lg:gap-16">
          <div>
            <div className="flex flex-wrap gap-2 mb-10">
              {categories.map((c, i) => (
                <button
                  key={c}
                  type="button"
                  className={`px-5 py-2 text-sm font-bold border transition-colors ${
                    i === 0
                      ? "bg-brand-600 text-white border-brand-600"
                      : "border-[color:var(--border)] hover:border-brand-600 hover:text-brand-700"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
              {posts.map((p, i) => (
                <article
                  key={p.title}
                  className="group bg-white border border-[color:var(--border)] hover:border-brand-500 transition-colors"
                >
                  <PlaceholderImage
                    variant={
                      i % 3 === 0 ? "blue" : i % 3 === 1 ? "orange" : "dark"
                    }
                    label={p.cat}
                  />
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs mb-3">
                      <time className="text-foreground/60 font-mono">{p.date}</time>
                      <span className="text-brand-700 font-bold">{p.cat}</span>
                    </div>
                    <h3 className="font-bold leading-snug mb-3 group-hover:text-brand-700 transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-sm text-foreground/70 leading-relaxed">
                      {p.excerpt}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-16 flex justify-center">
              <nav className="flex items-center gap-2">
                {["‹", "1", "2", "3", "4", "›"].map((p, i) => (
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

          <aside className="space-y-10">
            <div>
              <h3 className="text-sm font-black tracking-widest text-brand-700 mb-4">
                CATEGORIES
              </h3>
              <ul className="space-y-2">
                {categories.slice(1).map((c) => (
                  <li key={c}>
                    <Link
                      href="#"
                      className="text-sm flex items-center justify-between py-2 border-b border-[color:var(--border)] hover:text-brand-700"
                    >
                      <span>{c}</span>
                      <span className="text-xs text-foreground/50">
                        ({Math.floor(Math.random() * 12) + 3})
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-black tracking-widest text-brand-700 mb-4">
                ARCHIVE
              </h3>
              <ul className="space-y-2 text-sm">
                {["2025年5月", "2025年4月", "2025年3月", "2025年2月", "2025年1月"].map(
                  (m) => (
                    <li key={m}>
                      <Link
                        href="#"
                        className="flex items-center gap-2 py-1 hover:text-brand-700"
                      >
                        <span className="text-brand-400 text-[10px]">▸</span>
                        {m}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
