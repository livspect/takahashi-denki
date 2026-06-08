import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { asset } from "@/lib/assets";

type Props = {
  en: string;
  jp: string;
  description?: string;
  breadcrumbs?: { label: string; href?: string }[];
  /** 背景に敷く画像（任意）。未指定なら従来のブランド青グラデーション。 */
  image?: string;
  /** 画像の表示位置（object-position）。例: "object-top"。 */
  imagePosition?: string;
};

export function PageHeader({
  en,
  jp,
  description,
  breadcrumbs = [],
  image,
  imagePosition = "object-center",
}: Props) {
  const shadow = image ? "[text-shadow:0_2px_12px_rgba(0,0,0,0.45)]" : "";
  return (
    <section className="relative bg-brand-700 text-white overflow-hidden">
      {breadcrumbs.length > 0 && (
        <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      )}
      {image ? (
        <>
          <img
            src={asset(image)}
            alt=""
            aria-hidden
            className={`absolute inset-0 w-full h-full object-cover ${imagePosition}`}
          />
          {/* 文字の可読性を確保するためのブランド青オーバーレイ */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-800/85 via-brand-700/75 to-brand-900/85" />
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-brand-500 via-brand-600 to-brand-700" />
          <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-brand-300/20 rounded-full blur-3xl" />
        </>
      )}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <nav
          className={`text-xs text-brand-200/90 mb-8 flex items-center gap-2 flex-wrap ${shadow}`}
        >
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
        <p
          className={`section-label-en text-xs ${image ? "text-brand-200" : "text-brand-300"} mb-4 ${shadow}`}
        >
          {en}
        </p>
        <h1
          className={`text-3xl sm:text-5xl lg:text-6xl font-black mb-6 leading-snug ${shadow}`}
        >
          {jp}
        </h1>
        {description && (
          <p
            className={`text-sm sm:text-base lg:text-lg ${image ? "text-white/90" : "text-brand-100/85"} max-w-2xl leading-relaxed ${shadow}`}
          >
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
