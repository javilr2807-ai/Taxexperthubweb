"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { categories } from "@/lib/categories";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-paper/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-6 py-4">
        <Link href="/" className="group flex items-baseline gap-2">
          <span className="font-display text-2xl leading-none text-navy">
            Tax Experts <span className="italic text-navy-soft">Hub</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm text-navy md:flex">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/${c.slug}`}
              className={`group relative py-1 transition-colors hover:text-navy-soft ${
                pathname === `/${c.slug}` ? "text-navy brass-underline" : ""
              }`}
            >
              <span className="mr-1.5 text-[10px] font-semibold tracking-[0.2em] text-muted-foreground">
                {c.number}
              </span>
              {c.shortTitle}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
