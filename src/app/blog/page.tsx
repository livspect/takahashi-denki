import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { formatBlogDate, getBlogPosts } from "@/lib/microcms";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "ブログ",
  description:
    "有限会社たかはし電器のブログ。設備工事や施工に関するお知らせ・お役立ち情報を発信します。",
  path: "/blog",
});

export default async function BlogPage() {
  const posts = await getBlogPosts();

  const counts = new Map<string, number>();
  for (const p of posts) {
    const name = p.category?.name;
    if (name) counts.set(name, (counts.get(name) ?? 0) + 1);
  }
  const categoryList = [...counts.entries()];

  return (
    <>
      <PageHeader
        en="BLOG"
        jp="現場ブログ"
        description="現場の様子・お知らせ・採用情報・技術ノートなど、有限会社たかはし電器の今をお届けします。"
        breadcrumbs={[{ label: "ブログ" }]}
      />

      <section className="py-12 sm:py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1fr_280px] gap-12 lg:gap-16">
          <div>
            <div className="flex flex-wrap gap-2 mb-10">
              <span className="px-5 py-2 text-sm font-bold border bg-brand-600 text-white border-brand-600">
                すべて
              </span>
              {categoryList.map(([c]) => (
                <span
                  key={c}
                  className="px-5 py-2 text-sm font-bold border border-[color:var(--border)] text-foreground/70"
                >
                  {c}
                </span>
              ))}
            </div>

            {posts.length === 0 ? (
              <div className="py-20 text-center text-foreground/60 border border-dashed border-[color:var(--border)]">
                <p className="text-sm">
                  まだ記事がありません。microCMS から記事を公開すると、ここに表示されます。
                </p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
                {posts.map((p, i) => (
                  <Link
                    key={p.id}
                    href={`/blog/${p.id}`}
                    className="group bg-white border border-[color:var(--border)] hover:border-brand-500 transition-colors"
                  >
                    {p.thumbnail ? (
                      <img
                        src={p.thumbnail.url}
                        alt={p.title}
                        className="w-full aspect-video object-cover"
                      />
                    ) : (
                      <PlaceholderImage
                        variant={
                          i % 3 === 0 ? "blue" : i % 3 === 1 ? "orange" : "dark"
                        }
                        label={p.category?.name ?? "BLOG"}
                      />
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-3 text-xs mb-3">
                        <time className="text-foreground/60 font-mono">
                          {formatBlogDate(p.publishedAt)}
                        </time>
                        {p.category?.name && (
                          <span className="text-brand-600 font-bold">
                            {p.category.name}
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold leading-snug mb-3 group-hover:text-brand-600 transition-colors">
                        {p.title}
                      </h3>
                      {p.excerpt && (
                        <p className="text-sm text-foreground/70 leading-relaxed line-clamp-3">
                          {p.excerpt}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <aside className="space-y-10">
            <div>
              <h3 className="text-sm font-black tracking-widest text-brand-700 mb-4">
                CATEGORIES
              </h3>
              <ul className="space-y-2">
                {categoryList.length === 0 ? (
                  <li className="text-xs text-foreground/50 py-2">
                    （カテゴリはまだありません）
                  </li>
                ) : (
                  categoryList.map(([c, count]) => (
                    <li
                      key={c}
                      className="text-sm flex items-center justify-between py-2 border-b border-[color:var(--border)]"
                    >
                      <span>{c}</span>
                      <span className="text-xs text-foreground/50">
                        ({count})
                      </span>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
