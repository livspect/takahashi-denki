import type { Metadata } from "next";
import { Zen_Kaku_Gothic_Antique } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL, url } from "@/lib/config";
import { site } from "@/lib/site";
import { organizationSchema, websiteSchema } from "@/lib/schema";

const zenKaku = Zen_Kaku_Gothic_Antique({
  variable: "--font-zen-kaku",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
  // CJK フォントは全サブセット(数百ファイル)を <head> で preload してしまい
  // 回線を占有し LCP を著しく悪化させる。preload を無効化し、
  // 必要なサブセットのみ font-display:swap で遅延読込にする。
  preload: false,
});

const DEFAULT_TITLE =
  "有限会社たかはし電器 | 東京都大田区の電気・空調・給排水設備工事";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${site.name}`,
  },
  description:
    "東京都大田区の有限会社たかはし電器。電気工事・冷暖房・空調・給排水まで、住宅・店舗・施設の設備工事を一貫して手がけています。東京都・埼玉県・千葉県を中心に関東全域で対応。",
  applicationName: site.name,
  keywords: [
    "たかはし電器",
    "電気工事",
    "空調工事",
    "エアコン工事",
    "給排水工事",
    "設備工事",
    "大田区",
    "東京",
    "電気工事会社",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  formatDetection: { telephone: true, address: true, email: false },
  alternates: { canonical: url("/") },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: site.name,
    title: DEFAULT_TITLE,
    description:
      "東京都大田区を拠点に、電気・空調・給排水の設備工事を一貫対応。関東全域で施工しています。",
    url: url("/"),
    images: [
      { url: url("/og.jpg"), width: 1200, height: 630, type: "image/jpeg", alt: site.name },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description:
      "東京都大田区を拠点に、電気・空調・給排水の設備工事を一貫対応。関東全域で施工しています。",
    images: [url("/og.jpg")],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${zenKaku.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
