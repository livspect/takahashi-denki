"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "@/lib/blog-toc";

type Props = {
  items: TocItem[];
  variant?: "desktop" | "mobile";
};

/**
 * 記事の目次。IntersectionObserver で現在地の見出しをハイライトし、
 * クリックで該当位置へスムーズスクロールする。
 * desktop: 右カラムに sticky 表示 / mobile: 折りたたみ表示。
 */
export function BlogToc({ items, variant = "desktop" }: Props) {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    const headings = items
      .map((t) => document.getElementById(t.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!headings.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          );
        if (visible[0]) setActive(visible[0].target.id);
      },
      // ヘッダー(約6rem)分を除き、画面上部寄りの見出しを active に
      { rootMargin: "-96px 0px -65% 0px", threshold: 0 },
    );
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [items]);

  function handleClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActive(id);
    history.replaceState(null, "", `#${id}`);
  }

  const list = (
    <ul className="space-y-1.5 border-l border-[color:var(--border)]">
      {items.map((t) => (
        <li key={t.id} className={t.level === 3 ? "pl-3" : ""}>
          <a
            href={`#${t.id}`}
            onClick={(e) => handleClick(e, t.id)}
            className={`block -ml-px border-l-2 pl-4 py-0.5 text-sm leading-snug transition-colors ${
              active === t.id
                ? "border-brand-600 text-brand-700 font-bold"
                : "border-transparent text-foreground/55 hover:text-foreground"
            }`}
          >
            {t.text}
          </a>
        </li>
      ))}
    </ul>
  );

  if (variant === "mobile") {
    return (
      <details className="lg:hidden mb-10 border border-[color:var(--border)] bg-muted">
        <summary className="cursor-pointer select-none px-5 py-3.5 font-bold text-sm flex items-center gap-2">
          <span className="text-brand-600">≡</span> 目次
        </summary>
        <div className="px-5 pb-5 pt-1">{list}</div>
      </details>
    );
  }

  return (
    <nav aria-label="目次" className="sticky top-28">
      <p className="text-sm font-black text-foreground mb-4 flex items-center gap-2">
        <span className="w-5 h-px bg-brand-600" />
        目次
      </p>
      {list}
    </nav>
  );
}
