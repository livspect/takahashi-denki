import { PageHeader } from "@/components/PageHeader";
import { BlogList, type BlogCard } from "@/components/BlogList";
import { blogExcerpt, formatBlogDate, getBlogPosts } from "@/lib/microcms";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "ブログ",
  description:
    "有限会社たかはし電器のブログ。設備工事や施工に関するお知らせ・お役立ち情報を発信します。",
  path: "/blog",
});

export default async function BlogPage() {
  const posts = await getBlogPosts();

  const cards: BlogCard[] = posts.map((p) => ({
    id: p.id,
    title: p.title,
    date: formatBlogDate(p.publishedAt),
    excerpt: blogExcerpt(p.content),
    category: p.category?.name ?? null,
    eyecatch: p.eyecatch?.url ?? null,
  }));

  const counts = new Map<string, number>();
  for (const c of cards) {
    if (c.category) counts.set(c.category, (counts.get(c.category) ?? 0) + 1);
  }
  const categories = [...counts.entries()];

  return (
    <>
      <PageHeader
        en="BLOG"
        jp="現場ブログ"
        description="現場の様子・お知らせ・採用情報・技術ノートなど、有限会社たかはし電器の今をお届けします。"
        image="/stock/ductwork.webp"
        breadcrumbs={[{ label: "ブログ" }]}
      />

      <section className="py-12 sm:py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlogList posts={cards} categories={categories} />
        </div>
      </section>
    </>
  );
}
