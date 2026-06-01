import type { MetadataRoute } from "next";
import { url } from "@/lib/config";
import { getBlogPosts } from "@/lib/microcms";

// 静的エクスポート (output: "export") でビルド時に sitemap.xml を生成する。
export const dynamic = "force-static";

type Entry = MetadataRoute.Sitemap[number];

const STATIC_PATHS: {
  path: string;
  priority: number;
  changeFrequency: Entry["changeFrequency"];
}[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/business", priority: 0.8, changeFrequency: "monthly" },
  { path: "/works", priority: 0.8, changeFrequency: "monthly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/recruit", priority: 0.7, changeFrequency: "monthly" },
  { path: "/recruit/partner", priority: 0.6, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
  { path: "/contact", priority: 0.6, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((p) => ({
    url: url(p.path),
    lastModified: now,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));

  // microCMS の env が無い環境（ローカル等）では [] が返るため安全。
  let blogEntries: MetadataRoute.Sitemap = [];
  try {
    const posts = await getBlogPosts();
    blogEntries = posts.map((post) => ({
      url: url(`/blog/${post.id}`),
      lastModified: new Date(post.revisedAt || post.publishedAt),
      changeFrequency: "monthly",
      priority: 0.5,
    }));
  } catch {
    blogEntries = [];
  }

  return [...staticEntries, ...blogEntries];
}
