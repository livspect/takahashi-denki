import type { Metadata } from "next";
import { url } from "./config";
import { site } from "./site";

/**
 * 各ページの metadata を統一生成するヘルパー。
 * title はレイアウトの title.template により「<title> | 有限会社たかはし電器」になる。
 * canonical / OpenGraph / Twitter を path から正規絶対 URL で自動設定する。
 */
export function pageMetadata(opts: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const fullTitle = `${opts.title} | ${site.name}`;
  const canonical = url(opts.path);
  // Next は子セグメントの openGraph / twitter を親とマージせず置換するため、
  // 各ページでも OG 画像を明示的に指定する。
  const ogImage = url("/stock/hands.webp");
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: site.name,
      title: fullTitle,
      description: opts.description,
      images: [{ url: ogImage, alt: site.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: opts.description,
      images: [ogImage],
    },
  };
}
