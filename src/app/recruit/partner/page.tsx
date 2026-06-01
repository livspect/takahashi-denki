import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { SectionLabel } from "@/components/SectionLabel";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "協力会社募集",
  description:
    "関東一円で、共に長期的に成長していける電気・空調・給排水工事の協力会社様を募集しています。継続案件・公正な単価・スピーディーな支払いをお約束します。",
  path: "/recruit/partner",
});

export default function PartnerRecruitPage() {
  return (
    <>
      <PageHeader
        en="PARTNER RECRUIT"
        jp="協力会社募集"
        description="関東一円で、共に長期的に成長していける電気工事業の協力会社様を募集しています。"
        breadcrumbs={[
          { label: "採用情報", href: "/recruit" },
          { label: "協力会社募集" },
        ]}
      />

      <section className="py-16 sm:py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-20 mb-20">
            <SectionLabel en="MESSAGE" jp={"良い現場は、\n良い協業から。"} />
            <div className="space-y-5 text-base lg:text-lg leading-loose text-foreground/85">
              <p>
                設備工事は、関わる会社・職人すべての腕と意識が現場品質に直結する仕事です。
              </p>
              <p>
                有限会社たかはし電器は、協力会社の皆様を「下請け」ではなく「対等なパートナー」と位置づけ、継続的な発注・公正な単価・スピーディーな支払いをお約束します。
              </p>
              <p>
                長期的に共に成長し、地域の電気・設備工事業を盛り上げていける企業様との出会いを心からお待ちしています。
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {[
              {
                title: "継続的な案件供給",
                body: "年間480件以上の継続案件をベースに、繁忙・閑散の差を抑えた安定した発注を行います。",
              },
              {
                title: "公正な単価設定",
                body: "「叩き合い」ではなく、技術と品質に見合った適正単価。透明性のある見積プロセスを徹底。",
              },
              {
                title: "月末締め翌月末払い",
                body: "業界平均より早い支払いサイクル。手形ではなく現金振込で対応します。",
              },
              {
                title: "事務作業の負担軽減",
                body: "発注書・施工要領書・安全関連書類をデジタルで共有。FAX・紙の往復は最小限に。",
              },
              {
                title: "技術研修への参加",
                body: "自社研修やメーカー講習会に協力会社様もご参加いただけます。共に技術を磨きます。",
              },
              {
                title: "災害時の相互サポート",
                body: "繁忙期・トラブル発生時の応援体制を双方向で構築。困った時に支え合える関係を。",
              },
            ].map((p) => (
              <article
                key={p.title}
                className="bg-white p-8 border border-[color:var(--border)]"
              >
                <h3 className="text-xl font-black mb-4">{p.title}</h3>
                <p className="text-sm leading-relaxed text-foreground/75">
                  {p.body}
                </p>
              </article>
            ))}
          </div>

          <div className="bg-brand-50/60 border border-brand-100 p-8 lg:p-12">
            <h3 className="text-2xl font-black mb-8">募集要件</h3>
            <dl className="grid gap-px bg-[color:var(--border)] border border-[color:var(--border)]">
              {[
                ["対象業種", "電気工事業・電気通信工事業・消防施設工事業"],
                ["対応エリア", "東京都・埼玉県・千葉県・神奈川県・茨城県"],
                ["必要許可", "建設業許可（電気工事業）／一人親方の方もご相談可"],
                ["保険加入", "労災保険・健康保険・年金加入必須（社会保険完備）"],
                ["契約形態", "個別契約／継続契約のいずれも対応可"],
                ["お支払い", "月末締め／翌月末払い／銀行振込"],
              ].map(([label, value]) => (
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
            <div className="mt-10 flex justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-brand-600 text-white px-8 py-4 font-bold text-sm hover:bg-brand-700 transition-colors"
              >
                協力会社の登録をご相談する <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
