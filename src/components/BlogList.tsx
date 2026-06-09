"use client";

import { useState } from "react";
import Link from "next/link";
import { PlaceholderImage } from "@/components/PlaceholderImage";

export type BlogCard = {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  category: string | null;
  eyecatch: string | null;
};

type Props = {
  posts: BlogCard[];
  categories: [string, number][];
};

/** ブログ一覧。カテゴリ（上部ボタン／サイドバー）で絞り込めるクライアント側フィルタ。 */
export function BlogList({ posts, categories }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const filtered = selected
    ? posts.filter((p) => p.category === selected)
    : posts;

  const chip = (label: string, value: string | null, active: boolean) => (
    <button
      key={label}
      type="button"
      onClick={() => setSelected(value)}
      aria-pressed={active}
      className={`px-5 py-2 text-sm font-bold border transition-colors ${
        active
          ? "bg-brand-700 text-white border-brand-600"
          : "border-[color:var(--border)] text-foreground/70 hover:border-brand-500 hover:text-brand-700"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="grid lg:grid-cols-[1fr_280px] gap-12 lg:gap-16">
      <div>
        <div className="flex flex-wrap gap-2 mb-10">
          {chip("すべて", null, selected === null)}
          {categories.map(([c]) => chip(c, c, selected === c))}
        </div>

        {filtered.length === 0 ? (
          <div className="py-20 text-center text-foreground/60 border border-dashed border-[color:var(--border)]">
            <p className="text-sm">
              {posts.length === 0
                ? "まだ記事がありません。microCMS から記事を公開すると、ここに表示されます。"
                : "このカテゴリの記事はまだありません。"}
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
            {filtered.map((p, i) => (
              <Link
                key={p.id}
                href={`/blog/${p.id}`}
                className="group bg-white border border-[color:var(--border)] hover:border-brand-500 transition-colors"
              >
                {p.eyecatch ? (
                  <img
                    src={p.eyecatch}
                    alt={p.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full aspect-video object-cover"
                  />
                ) : (
                  <PlaceholderImage
                    variant={i % 3 === 0 ? "blue" : i % 3 === 1 ? "orange" : "dark"}
                    label={p.category ?? "BLOG"}
                  />
                )}
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs mb-3">
                    <time className="text-foreground/60 font-mono">{p.date}</time>
                    {p.category && (
                      <span className="text-brand-600 font-bold">{p.category}</span>
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
            <li>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className={`w-full text-sm flex items-center justify-between py-2 border-b border-[color:var(--border)] transition-colors ${
                  selected === null
                    ? "text-brand-700 font-bold"
                    : "hover:text-brand-700"
                }`}
              >
                <span>すべて</span>
                <span className="text-xs text-foreground/50">({posts.length})</span>
              </button>
            </li>
            {categories.length === 0 ? (
              <li className="text-xs text-foreground/50 py-2">
                （カテゴリはまだありません）
              </li>
            ) : (
              categories.map(([c, count]) => (
                <li key={c}>
                  <button
                    type="button"
                    onClick={() => setSelected(c)}
                    className={`w-full text-sm flex items-center justify-between py-2 border-b border-[color:var(--border)] transition-colors ${
                      selected === c
                        ? "text-brand-700 font-bold"
                        : "hover:text-brand-700"
                    }`}
                  >
                    <span>{c}</span>
                    <span className="text-xs text-foreground/50">({count})</span>
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      </aside>
    </div>
  );
}
