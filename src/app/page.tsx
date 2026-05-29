import Link from "next/link";
import { SectionLabel } from "@/components/SectionLabel";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { Reveal } from "@/components/Reveal";
import { formatBlogDate, getBlogPosts } from "@/lib/microcms";
import { businessPillars, serviceAreas, site } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBand />
      <BusinessIntro />
      <BlogPreview />
      <WorksPreview />
      <WorkplaceSection />
      <RecruitHighlight />
      <AreaSection />
      <ContactCTA />
    </>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-500 via-brand-700 to-brand-950" />
        <div className="absolute -top-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[700px] bg-brand-300/20 rounded-full blur-3xl" />
      </div>
      <div className="relative z-10 px-6 text-center max-w-4xl animate-fade-up">
        <p className="section-label-en text-[10px] sm:text-sm tracking-[0.2em] sm:tracking-[0.32em] text-white/85 mb-8 sm:mb-10">
          ELECTRICAL &middot; AIR-CONDITIONING &middot; PLUMBING
        </p>
        <h1 className="text-[2rem] sm:text-6xl lg:text-7xl font-black leading-[1.4] sm:leading-[1.45] tracking-[0.04em] sm:tracking-[0.08em] lg:tracking-[0.1em] mb-8 sm:mb-10 [word-break:keep-all] [overflow-wrap:break-word]">
          電気・空調・給排水で
          <br />
          暮らしと現場を支える
        </h1>
        <p className="text-sm sm:text-base leading-relaxed sm:leading-loose text-white/90 max-w-2xl mx-auto mb-10 sm:mb-12">
          住宅・店舗・施設の電気工事から、冷暖房・空調、給排水まで。
          東京都大田区を拠点に、現場の「困った」に分野を横断してお応えしてきました。
          人と品質を大事にする、地域の設備工事会社です。
        </p>
        <div className="flex flex-wrap gap-5 justify-center">
          <Link
            href="/business"
            className="inline-flex items-center gap-3 border border-white/70 hover:bg-white hover:text-brand-700 transition-colors px-9 py-4 text-sm tracking-[0.15em] font-medium"
          >
            事業内容を見る
            <span aria-hidden>→</span>
          </Link>
          <Link
            href="/recruit"
            className="inline-flex items-center gap-3 border border-white/70 hover:bg-white hover:text-brand-700 transition-colors px-9 py-4 text-sm tracking-[0.15em] font-medium"
          >
            採用情報を見る
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 text-white/80">
        <p className="section-label-en text-[10px] tracking-[0.35em]">SCROLL</p>
        <span className="relative block w-px h-12 bg-white/30 overflow-hidden">
          <span className="scroll-dot absolute top-0 left-0 block w-px h-4 bg-white" />
        </span>
      </div>
    </section>
  );
}

function StatsBand() {
  const stats = [
    { num: "16", unit: "年", label: "創業からの歩み" },
    { num: "32", unit: "名", label: "在籍スタッフ数" },
    { num: "480", unit: "件+", label: "年間施工実績" },
    { num: "98", unit: "%", label: "リピート受注率" },
  ];
  return (
    <section className="bg-brand-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10">
        {stats.map((m) => (
          <div key={m.label} className="py-8 lg:py-10 px-4 lg:px-6 text-center">
            <p className="text-[11px] text-brand-300 tracking-[0.2em] mb-3">
              {m.label}
            </p>
            <p className="font-black">
              <span className="text-4xl lg:text-5xl">{m.num}</span>
              <span className="text-xl ml-1">{m.unit}</span>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function BusinessIntro() {
  return (
    <section className="py-16 sm:py-28 lg:py-40 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-3xl mx-auto text-center mb-16 lg:mb-24">
          <div className="flex justify-center">
            <SectionLabel en="BUSINESS" jp={"事業内容"} align="center" />
          </div>
          <p className="mt-8 text-base leading-loose text-foreground/75">
            有限会社たかはし電器は、東京都大田区を拠点に、電気工事・空調工事・給排水工事の3分野を手がける設備工事会社です。
            暮らしと現場の「困った」に、分野を横断してワンストップでお応えします。
          </p>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {businessPillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 120}>
              <Link
                href="/business#scope"
                className="group relative bg-white border border-[color:var(--border)] overflow-hidden flex flex-col hover:border-brand-500 transition-colors h-full"
              >
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full aspect-video object-cover"
                />
                <div className="p-8 lg:p-10 flex flex-col flex-1">
                  <p className="section-label-en text-xs text-brand-500 tracking-[0.2em] mb-4">
                    {`0${i + 1} / ${p.en}`}
                  </p>
                  <h3 className="text-2xl font-black tracking-wider mb-4">
                    {p.title}
                  </h3>
                  <p className="text-sm leading-loose text-foreground/70 mb-8">
                    {p.body}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-brand-600 tracking-wider group-hover:gap-3 transition-all">
                    詳細を見る <span aria-hidden>→</span>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

async function BlogPreview() {
  const posts = (await getBlogPosts(3));
  return (
    <section className="py-16 sm:py-28 lg:py-40 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="flex justify-center mb-16 lg:mb-20">
          <SectionLabel en="BLOG" jp="現場ブログ" align="center" />
        </Reveal>
        {posts.length === 0 ? (
          <Reveal className="max-w-2xl mx-auto text-center py-12 border border-dashed border-[color:var(--border)]">
            <p className="text-sm text-foreground/60">
              まだ記事がありません。microCMS から記事を公開すると、ここに表示されます。
            </p>
          </Reveal>
        ) : (
          <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
            {posts.map((p, i) => (
              <Reveal key={p.id} delay={i * 120}>
                <Link
                  href={`/blog/${p.id}`}
                  className="group bg-white border border-[color:var(--border)] hover:border-brand-500 transition-colors h-full block"
                >
                  {p.thumbnail ? (
                    <img
                      src={p.thumbnail.url}
                      alt={p.title}
                      className="w-full aspect-video object-cover"
                    />
                  ) : (
                    <PlaceholderImage
                      variant={i === 1 ? "orange" : "blue"}
                      label={p.category?.name ?? "BLOG"}
                    />
                  )}
                  <div className="p-7 lg:p-8">
                    <div className="flex items-center gap-3 text-xs mb-4">
                      <time className="text-foreground/60 font-mono">
                        {formatBlogDate(p.publishedAt)}
                      </time>
                      {p.category?.name && (
                        <span className="text-brand-600 font-bold tracking-wider">
                          {p.category.name}
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold leading-relaxed tracking-wide mb-3 group-hover:text-brand-600 transition-colors">
                      {p.title}
                    </h3>
                    {p.excerpt && (
                      <p className="text-sm text-foreground/70 leading-loose line-clamp-3">
                        {p.excerpt}
                      </p>
                    )}
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
        <Reveal className="flex justify-center mt-16">
          <Link
            href="/blog"
            className="inline-flex items-center gap-3 border border-brand-600 text-brand-600 hover:bg-brand-600 hover:text-white transition-colors px-10 py-4 text-sm tracking-[0.15em] font-medium"
          >
            ブログ記事一覧へ <span aria-hidden>→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function WorksPreview() {
  const works = [
    { title: "店舗 照明・配線設備工事", area: "東京都大田区", year: "2025", image: "/stock/lighting.jpg" },
    { title: "業務用エアコン入替工事", area: "東京都品川区", year: "2025", image: "/stock/ac.jpg" },
    { title: "給湯・給水設備の改修工事", area: "東京都大田区", year: "2024", image: "/stock/plumbing.jpg" },
    { title: "住宅 コンセント増設・電気工事", area: "東京都目黒区", year: "2024", image: "/stock/electrical.jpg" },
  ];
  return (
    <section className="py-16 sm:py-28 lg:py-40 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="flex justify-center mb-16 lg:mb-20">
          <SectionLabel en="WORKS" jp={"施工事例"} align="center" />
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {works.map((w, i) => (
            <Reveal key={w.title} delay={i * 100}>
              <article className="group">
                <div className="overflow-hidden">
                  <img
                    src={w.image}
                    alt={w.title}
                    className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="pt-5">
                  <p className="text-xs text-brand-600 font-bold tracking-wider mb-2">
                    {w.area} ／ {w.year}
                  </p>
                  <h3 className="font-bold leading-relaxed tracking-wide group-hover:text-brand-600 transition-colors">
                    {w.title}
                  </h3>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal className="flex justify-center mt-16">
          <Link
            href="/works"
            className="inline-flex items-center gap-3 border border-brand-600 text-brand-600 hover:bg-brand-600 hover:text-white transition-colors px-10 py-4 text-sm tracking-[0.15em] font-medium"
          >
            施工事例一覧へ <span aria-hidden>→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function WorkplaceSection() {
  const points = [
    {
      n: "01",
      title: "人を育てる、を一番に。",
      body: "未経験で入社しても、段階別のカリキュラムと先輩マンツーマン制度で着実にステップアップ。年間100時間以上の研修時間を確保しています。",
    },
    {
      n: "02",
      title: "週休2日、残業を減らす仕組み。",
      body: "現場ごとの工程管理を徹底し、月平均残業時間は18時間以内。プライベートも大切にできる職場づくりを進めています。",
    },
    {
      n: "03",
      title: "資格取得を会社が後押し。",
      body: "電気工事士・施工管理技士・低圧電気取扱業務など、業務に関わる資格は受講料・受験料を全額会社負担。合格お祝い金も支給。",
    },
    {
      n: "04",
      title: "風通しのよい現場文化。",
      body: "20代から60代まで幅広い世代が在籍。年次や立場に関係なく意見を出し合える雰囲気を大切にしています。",
    },
  ];
  return (
    <section className="py-16 sm:py-28 lg:py-40 bg-brand-950 text-white relative overflow-hidden">
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-brand-600/20 rounded-full blur-3xl" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-3xl mx-auto text-center mb-16 lg:mb-24">
          <div className="flex justify-center">
            <SectionLabel
              en="WORKPLACE"
              jp={"働きやすさは、仕組みでつくる。"}
              align="center"
              invert
            />
          </div>
          <p className="mt-8 text-base leading-loose text-brand-100/80">
            設備工事の仕事は「きつい・忙しい」と言われがち。
            たかはし電器は、そのイメージを変えるために、現場運営の仕組みからアップデートしています。
            人が長く働けるからこそ、技術が積み上がり、お客様への提供価値も高まる。私たちはそう考えています。
          </p>
        </Reveal>
        <div className="grid sm:grid-cols-2 gap-px bg-white/10 border border-white/10">
          {points.map((p, i) => (
            <Reveal key={p.n} delay={i * 100} className="bg-brand-950">
              <div className="p-8 lg:p-12 h-full">
                <p className="text-5xl font-black text-brand-300/90 mb-5">
                  {p.n}
                </p>
                <h3 className="text-xl lg:text-2xl font-black tracking-wider mb-4">
                  {p.title}
                </h3>
                <p className="text-sm leading-loose text-brand-100/75">
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function RecruitHighlight() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
          <div className="bg-brand-600 text-white p-10 lg:p-14 flex flex-col relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-brand-400/30 rounded-full blur-3xl" />
            <p className="section-label-en text-xs text-brand-100 mb-4 relative">
              FOR JOB SEEKERS
            </p>
            <h3 className="text-3xl lg:text-4xl font-black mb-6 relative leading-tight">
              社員募集
              <br />
              <span className="text-brand-100 text-xl lg:text-2xl">
                経験者・未経験者ともに歓迎
              </span>
            </h3>
            <p className="text-sm leading-relaxed text-brand-50/90 mb-10 relative">
              新卒・中途、ブランクがある方も大歓迎。「電気で人の役に立ちたい」その想いがあれば、技術はあとから必ず身につきます。
            </p>
            <Link
              href="/recruit"
              className="mt-auto inline-flex items-center gap-3 self-start bg-white text-brand-800 px-7 py-4 font-bold text-sm hover:bg-brand-50 transition-colors relative"
            >
              社員募集を見る <span aria-hidden>→</span>
            </Link>
          </div>
          <div className="bg-brand-950 text-white p-10 lg:p-14 flex flex-col relative overflow-hidden">
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-brand-600/25 rounded-full blur-3xl" />
            <p className="section-label-en text-xs text-brand-300 mb-4 relative tracking-[0.2em]">
              FOR PARTNERS
            </p>
            <h3 className="text-3xl lg:text-4xl font-black mb-6 relative leading-tight">
              協力会社募集
              <br />
              <span className="text-brand-300 text-xl lg:text-2xl">
                共に成長できるパートナーへ
              </span>
            </h3>
            <p className="text-sm leading-relaxed text-brand-100/85 mb-10 relative">
              大田区周辺で、長期的に協業いただける電気・空調・給排水工事の協力会社様を募集しています。継続案件・公正な単価・スピーディーな支払いをお約束します。
            </p>
            <Link
              href="/recruit/partner"
              className="mt-auto inline-flex items-center gap-3 self-start border border-white px-7 py-4 font-bold text-sm hover:bg-white hover:text-brand-900 transition-colors relative"
            >
              協力会社募集を見る <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function AreaSection() {
  return (
    <section className="py-16 sm:py-28 lg:py-40 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-3xl mx-auto text-center mb-16 lg:mb-20">
          <div className="flex justify-center">
            <SectionLabel en="SERVICE AREA" jp={"対応エリア"} align="center" />
          </div>
          <p className="mt-8 text-base leading-loose text-foreground/75">
            東京都・埼玉県・千葉県を中心に、関東全域で施工を承っております。エリア外であっても、規模・内容によって対応可能な場合がありますので、まずはお気軽にご相談ください。
          </p>
        </Reveal>
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {serviceAreas.map((area) => (
            <div key={area.region} className="bg-white p-8 border border-[color:var(--border)]">
              <h3 className="text-xl font-black mb-5 flex items-center gap-3">
                <span className="text-brand-600">●</span>
                {area.region}
              </h3>
              <ul className="grid grid-cols-2 gap-y-1.5 gap-x-3 text-sm text-foreground/80">
                {area.items.map((city) => (
                  <li key={city} className="flex items-center gap-1.5">
                    <span className="text-brand-400 text-[10px]">▸</span>
                    {city}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactCTA() {
  return (
    <section className="relative py-16 sm:py-24 lg:py-32 bg-gradient-to-br from-brand-500 via-brand-700 to-brand-950 text-white overflow-hidden">
      <div className="absolute -top-32 right-0 w-[700px] h-[500px] bg-brand-400/20 rounded-full blur-3xl" />
      <Reveal className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="section-label-en text-xs text-white/80 tracking-[0.3em] mb-6">
          CONTACT
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-[0.08em] leading-relaxed mb-8">
          まずはお気軽に、
          <br className="sm:hidden" />
          お問い合わせください。
        </h2>
        <p className="text-base text-white/85 max-w-2xl mx-auto mb-10">
          施工のご相談、見積りのご依頼、採用に関するご質問など、どのようなことでも構いません。担当者より2営業日以内にご返信いたします。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href={`tel:${site.phone.replace(/-/g, "")}`}
            className="inline-flex items-center gap-3 bg-white text-brand-900 px-8 py-4 font-black text-lg hover:bg-brand-50 transition-colors"
          >
            <span aria-hidden>☎</span>
            {site.phone}
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 border border-white px-8 py-4 font-bold text-sm hover:bg-white hover:text-brand-900 transition-colors"
          >
            お問い合わせフォーム <span aria-hidden>→</span>
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
