import { PageHeader } from "@/components/PageHeader";
import { SectionLabel } from "@/components/SectionLabel";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "お問い合わせ",
  description:
    "施工のご依頼・お見積り、採用に関するご質問、協力会社のご相談など、お気軽にどうぞ。お電話（03-3752-3570）またはフォームから、2営業日以内にご返信いたします。",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHeader
        en="CONTACT"
        jp="お問い合わせ"
        description="施工のご依頼・お見積り、採用に関するご質問、協力会社のご相談など、お気軽にどうぞ。"
        breadcrumbs={[{ label: "お問い合わせ" }]}
      />

      <section className="py-16 sm:py-24 lg:py-32 bg-white">
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
                  東急池上線「久が原駅」周辺。お車の場合は近隣のコインパーキングをご利用ください。
                </p>
              </div>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>
    </>
  );
}
