import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";
import { PageHeader } from "@/components/PageHeader";
import { BlogToc } from "@/components/BlogToc";
import {
  blogExcerpt,
  formatBlogDate,
  getBlogPost,
  getBlogPosts,
  type BlogPost,
} from "@/lib/microcms";
import { buildBlogContent } from "@/lib/blog-toc";
import { site } from "@/lib/site";
import { url } from "@/lib/config";
import { JsonLd } from "@/components/JsonLd";
import { blogPostingSchema } from "@/lib/schema";

const PLACEHOLDER_ID = "preview";

export const dynamicParams = false;

type Props = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  if (posts.length === 0) return [{ id: PLACEHOLDER_ID }];
  return posts.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const post = await getBlogPost(id);
  if (!post) return { title: "記事" };

  const canonical = url(`/blog/${post.id}`);
  const description =
    blogExcerpt(post.content) || `${site.name}のブログ記事「${post.title}」。`;
  const images = post.eyecatch?.url
    ? [post.eyecatch.url]
    : [url("/og.jpg")];

  return {
    title: post.title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "article",
      url: canonical,
      siteName: site.name,
      title: `${post.title} | ${site.name}`,
      description,
      publishedTime: post.publishedAt,
      modifiedTime: post.revisedAt || post.publishedAt,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | ${site.name}`,
      description,
      images,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { id } = await params;
  const post = await getBlogPost(id);

  if (!post) {
    return (
      <>
        <PageHeader
          en="BLOG"
          jp="記事を準備中です"
          image="/stock/hands.webp"
          breadcrumbs={[{ label: "ブログ", href: "/blog" }, { label: "記事準備中" }]}
        />
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm text-foreground/70 mb-10">
              まだ記事が公開されていません。microCMS から記事を公開すると、ここに表示されます。
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-bold text-brand-600 hover:text-brand-700"
            >
              <span aria-hidden>←</span> ブログ一覧へ戻る
            </Link>
          </div>
        </section>
      </>
    );
  }

  const safeBody = DOMPurify.sanitize(post.content);
  const { html, toc, readingMinutes } = buildBlogContent(safeBody);
  const hasToc = toc.length >= 2;

  // 関連記事: 同カテゴリを優先し、足りなければ新着で補完。自分自身は除外。
  const all = await getBlogPosts();
  const related = pickRelated(all, post, 3);

  return (
    <>
      <JsonLd
        data={blogPostingSchema({
          id: post.id,
          title: post.title,
          excerpt: blogExcerpt(post.content),
          publishedAt: post.publishedAt,
          revisedAt: post.revisedAt,
          thumbnail: post.eyecatch,
        })}
      />
      <PageHeader
        en="BLOG"
        jp={post.title}
        image={post.eyecatch?.url ?? "/stock/hands.webp"}
        breadcrumbs={[
          { label: "ブログ", href: "/blog" },
          { label: post.title },
        ]}
      />

      <article className="py-16 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={
              hasToc
                ? "lg:grid lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-14"
                : "max-w-3xl mx-auto"
            }
          >
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs mb-6">
                <time className="text-foreground/60 font-mono">
                  {formatBlogDate(post.publishedAt)}
                </time>
                {post.category?.name && (
                  <span className="text-brand-600 font-bold">
                    {post.category.name}
                  </span>
                )}
                <span className="text-foreground/50">
                  約{readingMinutes}分で読めます
                </span>
              </div>

              {post.eyecatch && (
                <img
                  src={post.eyecatch.url}
                  alt={post.title}
                  className="w-full aspect-video object-cover mb-10"
                />
              )}

              {hasToc && <BlogToc items={toc} variant="mobile" />}

              <div
                className="prose-blog text-foreground/85 leading-loose"
                dangerouslySetInnerHTML={{ __html: html }}
              />

              <div className="mt-16 pt-8 border-t border-[color:var(--border)]">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-sm font-bold text-brand-600 hover:text-brand-700"
                >
                  <span aria-hidden>←</span> ブログ一覧へ戻る
                </Link>
              </div>
            </div>

            {hasToc && (
              <aside className="hidden lg:block">
                <BlogToc items={toc} />
              </aside>
            )}
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="py-16 lg:py-24 bg-muted">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="section-label-en text-xs text-brand-600 mb-8 tracking-[0.2em]">
              RELATED POSTS
            </p>
            <div className="grid sm:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={`/blog/${r.id}`}
                  className="group bg-white border border-[color:var(--border)] hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-video overflow-hidden bg-muted">
                    {r.eyecatch?.url ? (
                      <img
                        src={r.eyecatch.url}
                        alt={r.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    ) : (
                      <div className="w-full h-full bg-brand-100" />
                    )}
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-3 text-[11px] mb-2">
                      <time className="text-foreground/50 font-mono">
                        {formatBlogDate(r.publishedAt)}
                      </time>
                      {r.category?.name && (
                        <span className="text-brand-600 font-bold">
                          {r.category.name}
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold leading-snug line-clamp-2 group-hover:text-brand-700 transition-colors">
                      {r.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-brand-700 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20 text-center">
          <h2 className="text-2xl lg:text-3xl font-black mb-4">
            電気・空調・給排水のご相談はお気軽に
          </h2>
          <p className="text-sm lg:text-base text-white/85 mb-8 max-w-2xl mx-auto leading-relaxed">
            施工のご依頼・お見積り、設備のお困りごとまで、有限会社たかはし電器が地域密着で対応します。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={`tel:${site.phone.replace(/-/g, "")}`}
              className="inline-flex items-center justify-center gap-3 w-72 h-14 bg-white text-brand-900 font-black hover:bg-brand-50 transition-colors"
            >
              <span aria-hidden>☎</span>
              {site.phone}
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 w-72 h-14 border border-white font-bold text-sm hover:bg-white hover:text-brand-900 transition-colors"
            >
              お問い合わせフォーム
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

/** 同カテゴリを優先し、新着で補完して related を作る（自分自身は除外）。 */
function pickRelated(all: BlogPost[], current: BlogPost, n: number): BlogPost[] {
  const others = all.filter((p) => p.id !== current.id);
  const sameCat = current.category?.id
    ? others.filter((p) => p.category?.id === current.category?.id)
    : [];
  const rest = others.filter((p) => !sameCat.includes(p));
  return [...sameCat, ...rest].slice(0, n);
}
