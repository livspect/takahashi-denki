import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { SectionLabel } from "@/components/SectionLabel";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { site } from "@/lib/site";

export const metadata = {
  title: `採用情報 | ${site.name}`,
};

export default function RecruitPage() {
  return (
    <>
      <PageHeader
        en="RECRUIT"
        jp="採用情報"
        description="新卒・中途、経験者・未経験者問わず。一緒に電気で社会を支えてくださる仲間を募集しています。"
        breadcrumbs={[{ label: "採用情報" }]}
      />

      <section className="py-16 sm:py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24">
            <div>
              <SectionLabel en="MESSAGE" jp={"電気で、誰かの毎日を支える仕事"} />
              <div className="mt-8 space-y-5 text-base lg:text-lg leading-loose text-foreground/85">
                <p>
                  電気・空調・給排水の設備工事は、目には見えにくいけれど、毎日の暮らしや経済活動を根っこから支える仕事です。
                </p>
                <p>
                  店舗の灯り、室内の空調、暮らしの水まわり。当たり前に動いているそれらは、誰かが現場で配線や配管をつなぎ、安全に整えているからこそ成り立っています。
                </p>
                <p>
                  有限会社たかはし電器は、そんな仕事に誇りを持ち、長く続けられる環境づくりに本気で取り組んでいます。
                </p>
              </div>
            </div>
            <PlaceholderImage variant="blue" ratio="portrait" label="OUR FIELD" />
          </div>

          <div id="career" className="mb-24">
            <div className="mb-12">
              <SectionLabel en="CAREER PATH" jp="キャリアの歩み方" />
            </div>
            <div className="grid lg:grid-cols-4 gap-px bg-[color:var(--border)] border border-[color:var(--border)]">
              {[
                {
                  yr: "1〜2年目",
                  role: "アシスタント",
                  body: "先輩に同行し、配線・取付の基礎を習得。第二種電気工事士の取得を目指します。",
                },
                {
                  yr: "3〜5年目",
                  role: "現場担当",
                  body: "小〜中規模現場の担当として独り立ち。第一種電気工事士・施工管理の知識も習得。",
                },
                {
                  yr: "6〜10年目",
                  role: "現場監督",
                  body: "現場全体の工程・品質・安全を統括。1級電気工事施工管理技士の取得を支援します。",
                },
                {
                  yr: "11年目〜",
                  role: "マネジメント",
                  body: "複数現場の統括や後進指導、営業同行など、キャリアの方向性を広げていきます。",
                },
              ].map((step) => (
                <div key={step.yr} className="bg-white p-8">
                  <p className="text-xs text-brand-600 font-bold tracking-widest mb-3">
                    {step.yr}
                  </p>
                  <p className="text-xl font-black mb-4">{step.role}</p>
                  <p className="text-sm leading-relaxed text-foreground/75">
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-24">
            <div className="mb-12">
              <SectionLabel en="BENEFITS" jp="働きやすさのポイント" />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { t: "週休2日制（土日祝＋現場休）", d: "年間休日120日以上を目標に運用しています。" },
                { t: "残業月平均18時間以内", d: "工程管理を徹底し、長時間労働の削減を実現。" },
                { t: "資格取得支援制度", d: "受講料・受験料を会社全額負担。合格お祝い金もあり。" },
                { t: "退職金制度・確定拠出年金", d: "中退共＋企業型 DC で老後資金もしっかり準備。" },
                { t: "健康診断・人間ドック補助", d: "35歳以上は人間ドック費用を会社が負担。" },
                { t: "資格・経験に応じた手当", d: "電気工事士・施工管理技士など、保有資格に応じて支給。" },
              ].map((b) => (
                <article
                  key={b.t}
                  className="bg-muted p-6 border-t-4 border-brand-600"
                >
                  <h3 className="font-black mb-3">{b.t}</h3>
                  <p className="text-sm leading-relaxed text-foreground/75">
                    {b.d}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="mb-12">
            <SectionLabel en="POSITIONS" jp="募集要項" />
          </div>
          <div className="space-y-6">
            {[
              {
                role: "電気工事士（経験者）",
                type: "正社員",
                salary: "月給 28〜45万円",
                items: [
                  ["雇用形態", "正社員（試用期間3ヶ月）"],
                  ["勤務地", "関東一円の各現場（直行直帰も可）"],
                  ["勤務時間", "8:00〜17:00（休憩1時間、現場により変動）"],
                  ["休日休暇", "週休2日制／年間休日120日／有給／夏季・冬季休暇"],
                  ["待遇", "各種保険完備／資格手当／退職金／交通費支給"],
                  ["応募資格", "第二種電気工事士以上、施工経験3年以上"],
                ],
              },
              {
                role: "電気工事士（未経験・新卒）",
                type: "正社員",
                salary: "月給 22〜26万円",
                items: [
                  ["雇用形態", "正社員（試用期間3ヶ月）"],
                  ["勤務地", "関東一円の各現場"],
                  ["勤務時間", "8:00〜17:00（休憩1時間）"],
                  ["休日休暇", "週休2日制／年間休日120日／有給／夏季・冬季休暇"],
                  ["待遇", "各種保険完備／資格取得支援／退職金／交通費支給"],
                  ["応募資格", "学歴・経験不問。普通自動車免許（AT 限定可）"],
                ],
              },
              {
                role: "施工管理（現場監督）",
                type: "正社員",
                salary: "月給 32〜55万円",
                items: [
                  ["雇用形態", "正社員（試用期間3ヶ月）"],
                  ["勤務地", "本社／関東一円の各現場"],
                  ["勤務時間", "8:00〜17:00（休憩1時間）"],
                  ["休日休暇", "週休2日制／年間休日120日／有給／夏季・冬季休暇"],
                  ["待遇", "各種保険完備／役職手当／資格手当／退職金"],
                  ["応募資格", "電気工事施工管理技士または同等の実務経験"],
                ],
              },
            ].map((p) => (
              <article key={p.role} className="border border-[color:var(--border)]">
                <header className="bg-brand-950 text-white p-6 lg:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <p className="text-xs text-brand-300 font-bold tracking-widest mb-1">
                      {p.type}
                    </p>
                    <h3 className="text-2xl font-black">{p.role}</h3>
                  </div>
                  <p className="text-2xl font-black text-brand-300">{p.salary}</p>
                </header>
                <dl className="grid gap-px bg-[color:var(--border)]">
                  {p.items.map(([label, value]) => (
                    <div
                      key={label}
                      className="bg-white p-5 grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-2 sm:gap-6"
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
                <div className="bg-white p-6 lg:p-8 flex justify-end">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-brand-600 text-white px-6 py-3 font-bold text-sm hover:bg-brand-700 transition-colors"
                  >
                    この職種に応募する <span aria-hidden>→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 lg:py-32 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <SectionLabel en="PARTNER" jp={"協力会社の\n皆様へ"} />
            <p className="mt-8 text-base leading-loose text-foreground/85 mb-8">
              共に長期的に成長していけるパートナー企業を募集しています。継続的な案件供給と公正な単価設定で、安定した取引関係を築きます。
            </p>
            <Link
              href="/recruit/partner"
              className="inline-flex items-center gap-2 bg-brand-600 text-white px-6 py-3 font-bold text-sm hover:bg-brand-700 transition-colors"
            >
              協力会社募集を見る <span aria-hidden>→</span>
            </Link>
          </div>
          <PlaceholderImage variant="dark" label="PARTNER NETWORK" />
        </div>
      </section>
    </>
  );
}
