"use client";

import Link from "next/link";
import { useState } from "react";
import { navigation, site } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-[color:var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 lg:h-20 flex items-center justify-between gap-6">
        <Link href="/" className="flex flex-col leading-tight group">
          <span className="text-[10px] tracking-[0.22em] text-brand-700 font-bold">
            TAKAHASHI DENKI
          </span>
          <span className="text-sm lg:text-base font-bold text-foreground tracking-wider">
            {site.name}
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-2 text-sm font-medium text-foreground hover:text-brand-600 transition-colors relative group"
            >
              <span className="block">{item.label}</span>
              <span className="absolute left-3 right-3 bottom-0 h-[2px] bg-brand-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </Link>
          ))}
          <Link
            href="/contact"
            className="ml-3 inline-flex items-center bg-brand-600 text-white px-6 py-2.5 text-sm font-bold tracking-wider hover:bg-brand-700 transition-colors"
          >
            お問い合わせ
          </Link>
        </nav>

        <button
          type="button"
          className="lg:hidden inline-flex flex-col gap-1.5 p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="メニューを開く"
          aria-expanded={open}
        >
          <span
            className={`w-6 h-0.5 bg-foreground transition-transform ${
              open ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-foreground transition-opacity ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-foreground transition-transform ${
              open ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-[color:var(--border)] bg-white">
          <nav className="px-4 py-4 flex flex-col">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-3 border-b border-[color:var(--border)] flex items-baseline justify-between"
              >
                <span className="font-bold">{item.label}</span>
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex justify-center items-center gap-2 bg-brand-600 text-white px-5 py-3 text-sm font-bold rounded-sm"
            >
              お問い合わせ
              <span aria-hidden>→</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

