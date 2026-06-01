import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

type Props = {
  en: string;
  jp: string;
  description?: string;
  breadcrumbs?: { label: string; href?: string }[];
};

export function PageHeader({ en, jp, description, breadcrumbs = [] }: Props) {
  return (
    <section className="relative bg-brand-600 text-white overflow-hidden">
      {breadcrumbs.length > 0 && (
        <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      )}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-500 via-brand-600 to-brand-700" />
      <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-brand-300/20 rounded-full blur-3xl" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <nav className="text-xs text-brand-200/80 mb-8 flex items-center gap-2 flex-wrap">
          <Link href="/" className="hover:text-white">
            HOME
          </Link>
          {breadcrumbs.map((b, i) => (
            <span key={i} className="flex items-center gap-2">
              <span aria-hidden>/</span>
              {b.href ? (
                <Link href={b.href} className="hover:text-white">
                  {b.label}
                </Link>
              ) : (
                <span className="text-white">{b.label}</span>
              )}
            </span>
          ))}
        </nav>
        <p className="section-label-en text-xs text-brand-300 mb-4">{en}</p>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black mb-6 leading-snug">
          {jp}
        </h1>
        {description && (
          <p className="text-sm sm:text-base lg:text-lg text-brand-100/85 max-w-2xl leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
