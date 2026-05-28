import { PageHeader } from "@/components/PageHeader";
import { SectionLabel } from "@/components/SectionLabel";
import { site } from "@/lib/site";

export const metadata = {
  title: `お問い合わせ | ${site.name}`,
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        en="CONTACT"
        jp="お問い合わせ"
        description="施工のご依頼・お見積り、採用に関するご質問、協力会社のご相談など、お気軽にどうぞ。"
        breadcrumbs={[{ label: "お問い合わせ" }]}
      />

      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1fr_1.6fr] gap-12 lg:gap-20">
          <div>
            <SectionLabel en="CONTACT INFO" jp="連絡先" />
            <div className="mt-10 space-y-8">
              <div>
                <p className="text-xs font-bold tracking-widest text-brand-700 mb-2">
                  TEL
                </p>
                <a
                  href={`tel:${site.phone.replace(/-/g, "")}`}
                  className="text-3xl font-black"
                >
                  {site.phone}
                </a>
                <p className="text-xs text-foreground/60 mt-1">
                  受付時間: 平日 9:00〜18:00
                </p>
              </div>
              <div>
                <p className="text-xs font-bold tracking-widest text-brand-700 mb-2">
                  EMAIL
                </p>
                <a
                  href={`mailto:${site.email}`}
                  className="text-base font-bold hover:text-brand-700"
                >
                  {site.email}
                </a>
              </div>
              <div>
                <p className="text-xs font-bold tracking-widest text-brand-700 mb-2">
                  ADDRESS
                </p>
                <p className="text-sm leading-relaxed">
                  〒{site.address.zip}
                  <br />
                  {site.address.line1}
                  <br />
                  {site.address.line2}
                </p>
              </div>
              <div>
                <p className="text-xs font-bold tracking-widest text-brand-700 mb-2">
                  ACCESS
                </p>
                <p className="text-sm leading-relaxed text-foreground/80">
                  東武スカイツリーライン「春日部駅」西口より徒歩約12分／お車の場合は近隣コインパーキングをご利用ください。
                </p>
              </div>
            </div>
          </div>

          <form className="bg-muted p-8 lg:p-12 space-y-6">
            <div>
              <h2 className="text-2xl font-black mb-2">
                お問い合わせフォーム
              </h2>
              <p className="text-sm text-foreground/70">
                必須項目をご記入の上、ご送信ください。担当者より2営業日以内にご返信いたします。
              </p>
            </div>

            <Field label="お問い合わせ種別" required>
              <select className="w-full p-3 border border-[color:var(--border)] bg-white text-sm">
                <option>施工のご依頼・お見積り</option>
                <option>採用について</option>
                <option>協力会社のご相談</option>
                <option>取材・メディア</option>
                <option>その他</option>
              </select>
            </Field>

            <div className="grid sm:grid-cols-2 gap-6">
              <Field label="お名前" required>
                <input
                  type="text"
                  placeholder="山田 太郎"
                  className="w-full p-3 border border-[color:var(--border)] bg-white text-sm"
                />
              </Field>
              <Field label="フリガナ" required>
                <input
                  type="text"
                  placeholder="ヤマダ タロウ"
                  className="w-full p-3 border border-[color:var(--border)] bg-white text-sm"
                />
              </Field>
            </div>

            <Field label="会社名・所属">
              <input
                type="text"
                placeholder="株式会社サンプル"
                className="w-full p-3 border border-[color:var(--border)] bg-white text-sm"
              />
            </Field>

            <div className="grid sm:grid-cols-2 gap-6">
              <Field label="メールアドレス" required>
                <input
                  type="email"
                  placeholder="sample@example.com"
                  className="w-full p-3 border border-[color:var(--border)] bg-white text-sm"
                />
              </Field>
              <Field label="電話番号" required>
                <input
                  type="tel"
                  placeholder="03-0000-0000"
                  className="w-full p-3 border border-[color:var(--border)] bg-white text-sm"
                />
              </Field>
            </div>

            <Field label="お問い合わせ内容" required>
              <textarea
                rows={8}
                placeholder="ご相談内容をご記入ください。"
                className="w-full p-3 border border-[color:var(--border)] bg-white text-sm"
              />
            </Field>

            <label className="flex items-start gap-3 text-sm">
              <input type="checkbox" className="mt-1" />
              <span>
                <a href="/privacy" className="text-brand-700 underline">
                  プライバシーポリシー
                </a>
                に同意して送信します。
              </span>
            </label>

            <button
              type="submit"
              className="w-full bg-brand-600 text-white py-4 font-black text-base hover:bg-brand-700 transition-colors"
            >
              送信する
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-bold mb-2">
        {label}
        {required && (
          <span className="ml-2 text-[10px] bg-brand-600 text-white px-2 py-0.5 align-middle">
            必須
          </span>
        )}
      </span>
      {children}
    </label>
  );
}
