import { PageHeader } from "@/components/PageHeader";
import { site } from "@/lib/site";

export const metadata = {
  title: `プライバシーポリシー | ${site.name}`,
};

const sections = [
  {
    title: "1. 個人情報の取り扱いについて",
    body: [
      `${site.name}（以下「当社」といいます）は、お客様の個人情報の保護を重要な責務と認識し、個人情報の保護に関する法律（個人情報保護法）その他関係法令を遵守し、適切に取り扱います。`,
    ],
  },
  {
    title: "2. 取得する個人情報",
    body: [
      "当社は、お問い合わせフォーム・お電話・採用応募・施工に関するご相談などを通じて、以下の個人情報を取得することがあります。",
    ],
    list: [
      "氏名、会社名、所属",
      "住所、電話番号、メールアドレス",
      "施工に関するご要望、現場情報",
      "応募職種、職務経歴等の採用に関する情報",
      "その他お客様からご提供いただいた情報",
    ],
  },
  {
    title: "3. 利用目的",
    body: ["取得した個人情報は、以下の目的の範囲内で利用します。"],
    list: [
      "お問い合わせ・ご相談への対応",
      "お見積り・ご提案、契約締結、施工管理",
      "施工後のアフターフォロー・メンテナンス連絡",
      "採用選考に関するご連絡",
      "業務遂行上必要な範囲での連絡・案内",
      "法令に基づく対応",
    ],
  },
  {
    title: "4. 第三者提供",
    body: [
      "当社は、ご本人の同意を得た場合または法令に基づく場合を除き、取得した個人情報を第三者に提供することはありません。ただし、施工の遂行に必要な範囲で、協力会社・取引先に対して必要最小限の情報を共有する場合があります。",
    ],
  },
  {
    title: "5. 業務委託",
    body: [
      "当社は、利用目的の達成に必要な範囲で、個人情報の取り扱いの全部または一部を外部に委託する場合があります。委託先に対しては、適切な管理が行われるよう監督します。",
    ],
  },
  {
    title: "6. 安全管理措置",
    body: [
      "当社は、取得した個人情報の漏えい・滅失・毀損を防止するため、必要かつ適切な安全管理措置を講じ、従業員に対しても適切な教育を行います。",
    ],
  },
  {
    title: "7. 開示・訂正・利用停止等",
    body: [
      "お客様ご本人からのご請求により、当社が保有する個人情報の開示・訂正・追加・削除・利用停止のご対応を行います。ご請求は下記お問い合わせ窓口までご連絡ください。所定の本人確認手続きの後、合理的な期間内に対応いたします。",
    ],
  },
  {
    title: "8. クッキー（Cookie）等の利用",
    body: [
      "当社のウェブサイトでは、サービス向上およびアクセス解析のため、Cookie 等の技術を利用することがあります。Cookie によって個人を直接特定できる情報を取得することはありません。ブラウザの設定により Cookie の受け取りを拒否することができますが、サイトの一部機能をご利用いただけない場合があります。",
    ],
  },
  {
    title: "9. プライバシーポリシーの改定",
    body: [
      "当社は、法令の改正や事業内容の変更等に伴い、本プライバシーポリシーを変更することがあります。変更後の内容は、本ページに掲載した時点から効力を生じます。",
    ],
  },
  {
    title: "10. お問い合わせ窓口",
    body: [
      "個人情報の取り扱いに関するお問い合わせ・ご請求は、下記までご連絡ください。",
    ],
    contact: true,
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        en="PRIVACY POLICY"
        jp="プライバシーポリシー"
        description="個人情報の取り扱いに関する当社の方針です。"
        breadcrumbs={[{ label: "プライバシーポリシー" }]}
      />

      <section className="py-12 sm:py-16 lg:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-foreground/70 leading-loose mb-12">
            {site.name}（以下「当社」）は、お客様の個人情報を適切に保護することが事業者の責務であると考え、本プライバシーポリシーを定めて遵守します。
          </p>

          <div className="space-y-12">
            {sections.map((s) => (
              <section key={s.title}>
                <h2 className="text-lg sm:text-xl font-black mb-4 text-brand-700 leading-snug">
                  {s.title}
                </h2>
                {s.body.map((p, i) => (
                  <p
                    key={i}
                    className="text-sm leading-loose text-foreground/85 mb-4"
                  >
                    {p}
                  </p>
                ))}
                {s.list && (
                  <ul className="text-sm leading-loose text-foreground/85 mb-4 space-y-1.5 pl-5 list-disc">
                    {s.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
                {s.contact && (
                  <dl className="text-sm leading-loose text-foreground/85 bg-muted p-5 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
                    <dt className="font-bold">社名</dt>
                    <dd>{site.name}</dd>
                    <dt className="font-bold">所在地</dt>
                    <dd>
                      〒{site.address.zip} {site.address.line1}
                    </dd>
                    <dt className="font-bold">電話</dt>
                    <dd>{site.phone}</dd>
                  </dl>
                )}
              </section>
            ))}
          </div>

          <p className="text-xs text-foreground/60 mt-16">
            制定日：2024年4月1日
          </p>
        </div>
      </section>
    </>
  );
}
