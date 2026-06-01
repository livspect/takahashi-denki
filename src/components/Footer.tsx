import Link from "next/link";
import { navigation, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-brand-500 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-grid pointer-events-none opacity-40" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid lg:grid-cols-[1.2fr_1fr_1fr] gap-12">
          <div>
            <div className="mb-6">
              <p className="text-[10px] tracking-[0.22em] font-bold text-brand-200 mb-1">
                TAKAHASHI DENKI
              </p>
              <p className="text-lg font-bold tracking-wider">{site.name}</p>
            </div>
            <p className="text-sm text-brand-100/80 leading-relaxed mb-6">
              {site.description}
            </p>
            <dl className="text-sm space-y-2 text-brand-50/90">
              <div className="flex gap-3">
                <dt className="text-brand-300 w-16 shrink-0">本社</dt>
                <dd>
                  〒{site.address.zip}
                  <br />
                  {site.address.line1}
                  {site.address.line2 && (
                    <>
                      <br />
                      {site.address.line2}
                    </>
                  )}
                </dd>
              </div>
              <div className="flex gap-3">
                <dt className="text-brand-300 w-16 shrink-0">TEL</dt>
                <dd>{site.phone}</dd>
              </div>
            </dl>
          </div>

          <div>
            <p className="section-label-en text-xs text-brand-300 mb-4">SITEMAP</p>
            <ul className="space-y-3">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm hover:text-brand-300 transition-colors inline-flex items-center gap-2"
                  >
                    <span className="text-brand-400">▸</span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="section-label-en text-xs text-brand-300 mb-4">CONTACT</p>
            <p className="text-sm text-brand-100/80 mb-4">
              採用・施工のご相談はお電話、またはお問い合わせフォームよりお気軽にどうぞ。
            </p>
            <a
              href={`tel:${site.phone.replace(/-/g, "")}`}
              className="block text-3xl font-black tracking-wide mb-4"
            >
              {site.phone}
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 w-full bg-white text-brand-900 px-5 py-3 text-sm font-bold hover:bg-brand-50 transition-colors"
            >
              お問い合わせフォーム
            </Link>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs text-brand-200/70">
          <p>{site.copyright}</p>
          <ul className="flex gap-6">
            <li>
              <Link href="/privacy" className="hover:text-white">
                プライバシーポリシー
              </Link>
            </li>
            <li>
              <Link href="/sitemap" className="hover:text-white">
                サイトマップ
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
