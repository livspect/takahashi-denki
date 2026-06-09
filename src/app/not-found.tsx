import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";

export default function NotFound() {
  return (
    <>
      <PageHeader
        en="404 NOT FOUND"
        jp="ページが見つかりません"
        description="お探しのページは移動または削除された可能性があります。"
        image="/stock/hands.webp"
        breadcrumbs={[{ label: "404" }]}
      />

      <section className="py-16 sm:py-24 lg:py-32 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-7xl lg:text-8xl font-black text-brand-100 mb-6">
            404
          </p>
          <h2 className="text-xl lg:text-2xl font-black mb-4">
            お探しのページは見つかりませんでした
          </h2>
          <p className="text-sm leading-loose text-foreground/70 mb-10">
            URLが変更・削除されたか、入力に誤りがある可能性があります。
            <br className="hidden sm:block" />
            お手数ですが、下記のリンクから目的のページをお探しください。
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 w-72 h-14 bg-brand-700 text-white font-bold text-sm hover:bg-brand-800 transition-colors"
            >
              トップページへ戻る
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 w-72 h-14 border border-brand-700 text-brand-700 font-bold text-sm hover:bg-brand-50 transition-colors"
            >
              お問い合わせ
            </Link>
          </div>

          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm">
            {[
              { href: "/business", label: "事業内容" },
              { href: "/works", label: "施工事例" },
              { href: "/about", label: "会社概要" },
              { href: "/recruit", label: "採用情報" },
              { href: "/blog", label: "ブログ" },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-brand-600 font-bold hover:text-brand-700 hover:underline"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
