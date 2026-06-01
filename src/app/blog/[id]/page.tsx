import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";
import { PageHeader } from "@/components/PageHeader";
import {
  formatBlogDate,
  getBlogPost,
  getBlogPosts,
} from "@/lib/microcms";
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
    post.excerpt || `${site.name}のブログ記事「${post.title}」。`;
  const images = post.thumbnail?.url
    ? [post.thumbnail.url]
    : [url("/stock/hands.jpg")];

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

  const safeBody = DOMPurify.sanitize(post.body);

  return (
    <>
      <JsonLd
        data={blogPostingSchema({
          id: post.id,
          title: post.title,
          excerpt: post.excerpt,
          publishedAt: post.publishedAt,
          revisedAt: post.revisedAt,
          thumbnail: post.thumbnail,
        })}
      />
      <PageHeader
        en="BLOG"
        jp={post.title}
        breadcrumbs={[
          { label: "ブログ", href: "/blog" },
          { label: post.title },
        ]}
      />

      <article className="py-16 lg:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 text-xs mb-6">
            <time className="text-foreground/60 font-mono">
              {formatBlogDate(post.publishedAt)}
            </time>
            {post.category?.name && (
              <span className="text-brand-600 font-bold">
                {post.category.name}
              </span>
            )}
          </div>

          {post.thumbnail && (
            <img
              src={post.thumbnail.url}
              alt={post.title}
              className="w-full aspect-video object-cover mb-10"
            />
          )}

          <div
            className="prose-blog text-foreground/85 leading-loose"
            dangerouslySetInnerHTML={{ __html: safeBody }}
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
      </article>
    </>
  );
}
