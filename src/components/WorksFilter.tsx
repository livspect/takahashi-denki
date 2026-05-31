"use client";

import { useState } from "react";
import { asset } from "@/lib/assets";

type Work = {
  title: string;
  cat: string;
  area: string;
  year: string;
  scale: string;
  image: string;
  summary: string;
};

type Props = {
  works: Work[];
  categories: string[];
};

export function WorksFilter({ works, categories }: Props) {
  const [active, setActive] = useState(categories[0]);
  const filtered =
    active === categories[0]
      ? works
      : works.filter((w) => w.cat === active);

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map((tag) => {
          const isActive = tag === active;
          return (
            <button
              key={tag}
              type="button"
              onClick={() => setActive(tag)}
              className={`px-5 py-2 text-sm font-bold border transition-colors ${
                isActive
                  ? "bg-brand-600 text-white border-brand-600"
                  : "border-[color:var(--border)] hover:border-brand-600 hover:text-brand-700"
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-sm text-foreground/60">
          該当する施工事例はまだありません。
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filtered.map((w) => (
            <article
              key={w.title}
              className="group bg-white border border-[color:var(--border)] hover:border-brand-500 transition-colors"
            >
              <div className="relative overflow-hidden">
                <img
                  src={asset(w.image)}
                  alt={w.title}
                  className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 bg-white text-brand-800 text-xs font-bold px-3 py-1">
                  {w.cat}
                </span>
              </div>
              <div className="p-6">
                <p className="text-xs text-brand-700 font-bold mb-3">
                  {w.area} ／ {w.year} ／ {w.scale}
                </p>
                <h3 className="text-lg font-black leading-snug mb-3 group-hover:text-brand-700 transition-colors">
                  {w.title}
                </h3>
                <p className="text-sm leading-relaxed text-foreground/70">
                  {w.summary}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
