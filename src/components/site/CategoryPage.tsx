import Link from "next/link";
import Image from "next/image";
import { categories, type Category } from "@/lib/categories";

type ArticleSummary = {
  slug: string;
  title: string;
  excerpt: string | null;
  imageUrl: string | null;
  publishDate: Date;
};

export function CategoryPage({ category, articles = [] }: { category: Category; articles?: ArticleSummary[] }) {
  const others = categories.filter((c) => c.slug !== category.slug);

  return (
    <article>
      {/* Masthead */}
      <section className="relative overflow-hidden border-b border-border bg-navy text-paper">
        <Image
          src={category.image}
          alt={category.imageAlt}
          fill
          priority
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/40"
        />
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, var(--paper) 1px, transparent 0)",
            backgroundSize: "22px 22px",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
            <p className="eyebrow text-paper/60">The {category.shortTitle} Desk</p>
            <h1 className="mt-4 max-w-4xl text-4xl leading-[1.08] sm:text-5xl md:text-7xl">
              {category.title}.
            </h1>
            <p className="mt-4 max-w-2xl font-display text-xl italic text-paper/80 md:text-2xl lg:text-3xl">
              {category.tagline}
            </p>
            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-paper/75 sm:text-base">
              {category.description}
            </p>
            <p className="mt-6 text-[11px] uppercase tracking-[0.22em] text-paper/50">
              Who this is for · {category.audience}
            </p>
        </div>
      </section>

      {/* Articles */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        {articles.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-lg text-muted-foreground">
              No articles found in this category.
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="eyebrow" style={{ fontSize: "14px", letterSpacing: "0.12em" }}>{category.shortTitle.toUpperCase()}</p>
                <h2 className="mt-3 font-bold text-3xl md:text-4xl lg:text-5xl">
                  {articles.length} {articles.length === 1 ? "Article" : "Articles"}
                </h2>
                <p className="mt-2 max-w-[700px] text-base text-muted-foreground">
                  {category.description}
                </p>
              </div>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((a) => (
                <Link
                  key={a.slug}
                  href={`/${category.slug}/${a.slug}`}
                  className="group rounded-lg border border-border bg-card overflow-hidden transition-shadow hover:shadow-lg"
                >
                  {a.imageUrl && (
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={a.imageUrl}
                        alt={a.title}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <p className="text-xs text-muted-foreground">
                      {new Date(a.publishDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                    <h3 className="mt-2 font-display text-xl text-navy group-hover:text-brass transition-colors">
                      {a.title}
                    </h3>
                    {a.excerpt && (
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                        {a.excerpt}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Other desks */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <p className="eyebrow">Continue at another desk</p>
        <div className="mt-8 grid gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-3">
          {others.map((c) => (
            <Link
              key={c.slug}
              href={`/${c.slug}`}
              className="group bg-card p-8 transition-colors hover:bg-navy hover:text-paper"
            >
              <p className="mt-4 font-display text-3xl">{c.shortTitle}</p>
              <p className="mt-3 text-sm text-muted-foreground group-hover:text-paper/70">
                {c.tagline}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
