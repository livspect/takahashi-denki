// 構造化データ (schema.org / JSON-LD) のビルダー群。
// すべて site.ts / config.ts の単一データから生成し、URL は config の url() で
// 正規絶対 URL に統一する。
import { SITE_URL, url } from "./config";
import { businessPillars, serviceAreas, site } from "./site";

type Json = Record<string, unknown>;

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

/**
 * 事業者情報。電気工事業のため LocalBusiness の具体サブタイプ Electrician を使用。
 * メール (プレースホルダ)・営業時間・geo 座標・SNS は未確定のため意図的に省略。
 */
export function organizationSchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Electrician",
    "@id": ORG_ID,
    name: site.name,
    alternateName: site.shortName,
    url: url("/"),
    telephone: site.phone,
    image: url("/stock/hands.jpg"),
    description: site.description,
    foundingDate: "2008-04",
    address: {
      "@type": "PostalAddress",
      postalCode: site.address.zip,
      addressRegion: "東京都",
      addressLocality: "大田区",
      streetAddress: "久が原2-14-1",
      addressCountry: "JP",
    },
    areaServed: serviceAreas.flatMap((a) =>
      a.items.map((city) => ({ "@type": "City", name: city })),
    ),
    knowsAbout: businessPillars.flatMap((p) => [p.title, ...p.items]),
    makesOffer: businessPillars.map((p) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: p.title,
        description: p.body,
        serviceType: p.title,
        areaServed: serviceAreas.map((a) => a.region),
      },
    })),
  };
}

export function websiteSchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: url("/"),
    name: site.name,
    description: site.description,
    inLanguage: "ja-JP",
    publisher: { "@id": ORG_ID },
  };
}

/** パンくず。先頭に「ホーム」を自動付与。current ページ（href 無し）は item を省略。 */
export function breadcrumbSchema(
  items: { label: string; href?: string }[],
): Json {
  const full = [{ label: "ホーム", href: "/" }, ...items];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: full.map((b, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: b.label,
      ...(b.href ? { item: url(b.href) } : {}),
    })),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function blogPostingSchema(post: {
  id: string;
  title: string;
  excerpt?: string;
  publishedAt: string;
  revisedAt?: string;
  thumbnail?: { url: string };
}): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": url(`/blog/${post.id}`),
    mainEntityOfPage: url(`/blog/${post.id}`),
    headline: post.title,
    ...(post.excerpt ? { description: post.excerpt } : {}),
    image: [post.thumbnail?.url ?? url("/stock/hands.jpg")],
    datePublished: post.publishedAt,
    dateModified: post.revisedAt || post.publishedAt,
    inLanguage: "ja-JP",
    author: { "@id": ORG_ID, name: site.name },
    publisher: { "@id": ORG_ID, name: site.name },
  };
}
