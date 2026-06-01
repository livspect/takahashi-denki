import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { pageMetadata } from "@/lib/seo";
import { navigation } from "@/lib/site";

export const metadata = pageMetadata({
  title: "サイトマップ",
  description:
    "有限会社たかはし電器のサイトマップ。事業内容・施工事例・会社概要・採用情報・ブログ・お問い合わせなど、全ページの一覧です。",
  path: "/sitemap",
});

const extraLinks: { label: string; href: string }[] = [
  { label: "お問い合わせ", href: "/contact" },
  { label: "プライバシーポリシー", href: "/privacy" },
];

export default function SiteMapPage() {
  return (
    <>
      <PageHeader
        en="SITEMAP"
        jp="サイトマップ"
        description="サイト内の全ページ一覧です。"
        breadcrumbs={[{ label: "サイトマップ" }]}
      />

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="space-y-6">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-lg font-bold text-foreground hover:text-brand-600 transition-colors inline-flex items-center gap-2"
                >
                  <span className="text-brand-500">▸</span>
                  {item.label}
                </Link>
                {item.children && item.children.length > 0 && (
                  <ul className="mt-3 ml-7 space-y-2">
                    {item.children.map((child) => (
                      <li key={`${item.href}-${child.href}`}>
                        <Link
                          href={child.href}
                          className="text-sm text-foreground/75 hover:text-brand-600 transition-colors inline-flex items-center gap-2"
                        >
                          <span className="text-brand-300 text-[10px]">●</span>
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
            {extraLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-lg font-bold text-foreground hover:text-brand-600 transition-colors inline-flex items-center gap-2"
                >
                  <span className="text-brand-500">▸</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
