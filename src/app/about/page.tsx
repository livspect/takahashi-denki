import { PageHeader } from "@/components/PageHeader";
import { SectionLabel } from "@/components/SectionLabel";
import { asset } from "@/lib/assets";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "会社概要",
  description:
    "有限会社たかはし電器の会社概要。ビジョン・社風・社会貢献活動、所在地（東京都大田区）や沿革についてご紹介します。",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHeader
        en="ABOUT US"
        jp="会社概要"
        description="東京都大田区を拠点に地域とともに歩む有限会社たかはし電器の、ビジョン・社風・社会貢献活動についてご紹介します。"
        image="/photos/storefront.webp"
        imagePosition="object-top"
        breadcrumbs={[{ label: "会社概要" }]}
      />

      <section id="vision" className="py-16 sm:py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1fr_1.6fr] gap-12 lg:gap-20">
          <SectionLabel en="VISION" jp={"私たちの\nビジョン"} />
          <div className="space-y-6 text-base lg:text-lg leading-loose text-foreground/85">
            <p>
              「電気・空調・給排水で、暮らしと現場を支える。」——
              私たちは、自分たちの仕事が誰かの暮らしや事業を支えていることを誇りに、一つひとつの現場と向き合っています。
            </p>
            <p>
              業界全体の高齢化、慢性的な人材不足。だからこそ、「働く人を大切にする会社」が次世代の設備工事業を担う、と私たちは信じています。
            </p>
            <p>
              有限会社たかはし電器は、技術と品質はもちろん、社員一人ひとりの成長と幸福を最も大切な経営資源と捉え、誠実な事業運営を続けます。
            </p>
          </div>
        </div>
      </section>

      <section id="culture" className="py-16 sm:py-24 lg:py-32 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <SectionLabel en="CULTURE" jp={"社風・雰囲気"} />
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                title: "対話を大切にするチーム",
                body: "週次のミーティング・現場朝礼・1on1を組み合わせて、立場に関わらず意見を言い合える環境を整えています。",
                image: "/stock/team-blueprint.webp",
              },
              {
                title: "若手とベテランの交流",
                body: "20代から60代まで幅広い世代が在籍。ベテランの知見と若手の発想が掛け合わさり、現場運営にも良い循環が生まれています。",
                image: "/stock/tools.webp",
              },
              {
                title: "学びを奨励する文化",
                body: "外部研修・資格取得支援・社内勉強会を通じて、誰もが自発的に成長できる仕組みを用意しています。",
                image: "/stock/workshop.webp",
              },
            ].map((c) => (
              <article key={c.title} className="bg-white overflow-hidden">
                <img
                  src={asset(c.image)}
                  alt={c.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full aspect-video object-cover"
                />
                <div className="p-8 lg:p-10">
                  <h3 className="text-xl font-black mb-4">{c.title}</h3>
                  <p className="text-sm leading-relaxed text-foreground/75">
                    {c.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <SectionLabel en="COMPANY PROFILE" jp="会社情報" />
          </div>
          <div className="mb-10 overflow-hidden border border-[color:var(--border)]">
            <img
              src={asset("/photos/storefront.webp")}
              alt="有限会社たかはし電器の店舗外観（東京都大田区久が原・パナソニックの店）"
              loading="lazy"
              decoding="async"
              className="w-full max-h-[480px] object-cover object-top"
            />
          </div>
          <dl className="grid gap-px bg-[color:var(--border)] border border-[color:var(--border)]">
            {[
              ["社名", site.name],
              ["代表者", "高橋 文雄・高橋 雄三"],
              [
                "所在地",
                `〒${site.address.zip} ${site.address.line1}`,
              ],
              ["電話番号", site.phone],
              [
                "事業内容",
                "住宅設備工事（電気・空調・給排水）／家電販売・オール電化（パナソニックの店）",
              ],
              [
                "建設業許可",
                "東京都知事許可（電気工事業・管工事業）第155319号",
              ],
              [
                "登録電気工事業者",
                "東京都知事登録 第242146号",
              ],
              [
                "指定給水装置工事事業者",
                "東京都知事登録 第8578号",
              ],
            ].map(([label, value]) => (
              <div
                key={label}
                className="bg-white p-5 lg:p-7 grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-2 sm:gap-6"
              >
                <dt className="text-xs lg:text-sm font-bold text-brand-700 tracking-widest">
                  {label}
                </dt>
                <dd className="text-sm lg:text-base text-foreground/85">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="csr" className="py-16 sm:py-24 lg:py-32 bg-brand-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <SectionLabel en="CSR" jp="社会貢献活動" invert />
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "地域清掃活動",
                body: "本社のある大田区内で、月1回の地域清掃ボランティアに参加。「地域に根ざす会社でありたい」という思いから続けています。",
              },
              {
                title: "工業高校への出張授業",
                body: "都内の工業高校に出向き、電気・設備工事の仕事と現場のリアルを伝える出張授業を実施。次世代の担い手育成に貢献しています。",
              },
              {
                title: "災害時の電力復旧協力",
                body: "自治体・電力会社と災害協定を締結。停電復旧や仮設電源の供給で、地域の早期復興に貢献します。",
              },
              {
                title: "障がい者就労支援",
                body: "近隣の就労支援施設と連携し、定期的に作業委託を行っています。多様な人がともに働く社会を目指して。",
              },
            ].map((c) => (
              <article key={c.title} className="border border-white/25 p-8 lg:p-10 bg-white/15 backdrop-blur-sm shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
                <h3 className="text-xl font-black mb-4 text-white">
                  {c.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/95">
                  {c.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
