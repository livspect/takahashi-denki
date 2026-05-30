import { PageHeader } from "@/components/PageHeader";
import { SectionLabel } from "@/components/SectionLabel";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { asset } from "@/lib/assets";
import { businessPillars, serviceAreas, site } from "@/lib/site";

export const metadata = {
  title: `事業内容 | ${site.name}`,
};

export default function BusinessPage() {
  return (
    <>
      <PageHeader
        en="BUSINESS"
        jp="事業内容"
        description="電気工事・空調工事・給排水工事の3分野を軸に、住宅・店舗・施設の設備工事を一貫してお引き受けします。"
        breadcrumbs={[{ label: "事業内容" }]}
      />

      <section id="scope" className="py-16 sm:py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20 mb-16">
            <SectionLabel en="SCOPE" jp={"対応分野"} />
            <p className="text-base lg:text-lg leading-loose text-foreground/80">
              電気・空調・給排水の3分野をワンストップでお引き受け。
              小規模な改修から新築まで、規模・用途を問わず対応します。
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {businessPillars.map((p, i) => (
              <article
                key={p.title}
                className="bg-white border border-[color:var(--border)] overflow-hidden flex flex-col"
              >
                <img
                  src={asset(p.image)}
                  alt={p.title}
                  className="w-full aspect-video object-cover"
                />
                <div className="p-8 flex flex-col flex-1">
                  <p className="section-label-en text-xs text-brand-600 mb-2">
                    {p.en}
                  </p>
                  <h3 className="text-xl font-black mb-4">{p.title}</h3>
                  <p className="text-sm leading-relaxed text-foreground/75 mb-6">
                    {p.body}
                  </p>
                  <ul className="mt-auto grid grid-cols-1 gap-1.5 text-sm text-foreground/80">
                    {p.items.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span className="text-brand-500 text-[10px]">▸</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="strength" className="py-16 sm:py-24 lg:py-32 bg-brand-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <SectionLabel en="OUR STRENGTH" jp="施工の強み" invert />
          </div>
          <div className="grid lg:grid-cols-2 gap-10">
            {[
              {
                n: "01",
                title: "電気・空調・給排水をまとめて相談できる",
                body: "電気から空調、給排水まで分野をまたいで自社で対応。複数の業者に分けて依頼する手間がなく、窓口ひとつでスピーディーに解決できます。",
              },
              {
                n: "02",
                title: "地域密着で、小回りの利く対応",
                body: "大田区を中心に地域に根ざして営業しています。急なトラブルや小規模な工事にも、フットワークよくお応えします。",
              },
              {
                n: "03",
                title: "一つひとつ丁寧な施工と確認",
                body: "担当者が現場をしっかり確認しながら施工します。引き継ぎの抜け漏れがなく、最後まで責任を持って対応するのが私たちの基本です。",
              },
              {
                n: "04",
                title: "新設から修理・メンテナンスまで",
                body: "新しい設備の取り付けだけでなく、既存設備の修理・点検・入替にも対応。長くお付き合いいただけるよう、アフターフォローも大切にしています。",
              },
            ].map((s) => (
              <article key={s.n} className="bg-white/5 border border-white/15 p-8 lg:p-10">
                <p className="text-5xl font-black text-brand-300 mb-4">{s.n}</p>
                <h3 className="text-2xl font-black mb-4">{s.title}</h3>
                <p className="text-sm leading-relaxed text-brand-100/85">
                  {s.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="flow" className="py-16 sm:py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <SectionLabel en="FLOW" jp="ご相談から施工までの流れ" />
          </div>
          <ol className="relative">
            {[
              {
                n: "STEP 01",
                title: "お問い合わせ・ヒアリング",
                body: "お電話またはフォームよりご相談ください。ご要望・予算感・スケジュールをお伺いします。",
              },
              {
                n: "STEP 02",
                title: "現地調査・お見積り",
                body: "経験豊富な担当者が現地を確認し、最適な施工内容とお見積りをご提示します。",
              },
              {
                n: "STEP 03",
                title: "ご契約・施工計画",
                body: "内容をご確認の上、ご契約。安全計画書・施工要領書を作成し、関係者と共有します。",
              },
              {
                n: "STEP 04",
                title: "施工・品質チェック",
                body: "現場監督と担当職人によるダブルチェック体制で安全に施工。中間検査も適宜実施します。",
              },
              {
                n: "STEP 05",
                title: "竣工・引き渡し",
                body: "完了検査の後、書類一式と共にお引き渡し。竣工後の保守点検も承ります。",
              },
            ].map((s, i, arr) => (
              <li key={s.n} className="flex gap-6 lg:gap-10 pb-10 last:pb-0">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-brand-600 text-white flex items-center justify-center font-black text-sm">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  {i < arr.length - 1 && (
                    <div className="flex-1 w-px bg-brand-200 mt-2" />
                  )}
                </div>
                <div className="flex-1 pb-6">
                  <p className="section-label-en text-xs text-brand-600 mb-2">
                    {s.n}
                  </p>
                  <h3 className="text-xl font-black mb-3">{s.title}</h3>
                  <p className="text-sm leading-relaxed text-foreground/75">
                    {s.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="area" className="py-16 sm:py-24 lg:py-32 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <SectionLabel en="SERVICE AREA" jp="対応エリア" />
          </div>
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {serviceAreas.map((area) => (
              <div
                key={area.region}
                className="bg-white p-8 border border-[color:var(--border)]"
              >
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
    </>
  );
}
