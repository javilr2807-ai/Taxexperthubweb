import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { categories } from "@/lib/categories";
import { prisma } from "@/lib/prisma";
import heroHome from "@/assets/hero-home.jpg";


export const metadata: Metadata = {
  title: "Tax Experts Hub | U.S. Tax Guides for Individuals & Small Businesses",
  description:
    "Practical U.S. tax guides for individuals, freelancers, self-employed workers, and small businesses. Learn about IRS forms, tax deductions, credits, audits, and filing rules in plain English.",
  alternates: {
    canonical: "https://taxexpertshub.com",
  },
  openGraph: {
    title: "Tax Experts Hub | U.S. Tax Guides for Individuals & Small Businesses",
    description:
      "Practical U.S. tax guides for individuals, freelancers, self-employed workers, and small businesses. Learn about IRS forms, tax deductions, credits, audits, and filing rules in plain English.",
    url: "https://taxexpertshub.com",
  },
};

export default async function HomePage() {
  const [featured, ...rest] = categories;

  const publishedArticles = await prisma.article.findMany({
    where: { published: true },
    orderBy: { publishDate: "desc" },
    select: {
      slug: true,
      title: true,
      excerpt: true,
      imageUrl: true,
      category: true,
      publishDate: true,
    },
  });
  const [latestArticle, ...otherArticles] = publishedArticles;
  const sideArticles = otherArticles.slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Tax Experts Hub",
    "url": "https://taxexpertshub.com",
    "inLanguage": "en-US",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-navy text-paper">
        <Image
          src={heroHome}
          alt="Editorial still life: fountain pen, tax document and brass desk lamp on a navy desk."
          priority
          fill
          className="absolute inset-0 h-full w-full object-cover opacity-50"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-tr from-navy via-navy/85 to-navy/30"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(var(--paper) 1px, transparent 1px), linear-gradient(90deg, var(--paper) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-6 pt-16 pb-20 md:pt-28 md:pb-32">
          <h1 className="max-w-5xl text-4xl leading-[1.08] sm:text-5xl md:text-7xl lg:text-8xl">
            Tax Guides{" "}
            <span className="text-accent">That Actually Make Sense</span>
          </h1>

          <h2 className="mt-6 max-w-2xl text-xl font-display tracking-tight text-accent sm:text-2xl md:text-3xl">
            For Individuals, Freelancers &amp; Small Businesses
          </h2>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-paper/70 sm:text-lg">
            Learn how to file taxes, maximize deductions, avoid IRS penalties,
            and understand U.S. tax rules without the confusing jargon.
          </p>

          <Link
            href={`/${featured.slug}`}
            className="group mt-10 inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.22em] text-accent transition-colors hover:text-accent/80"
          >
            Browse Tax Guides
            <span aria-hidden className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </section>

      {/* Featured + grid */}
      <section className="mx-auto w-full max-w-7xl overflow-hidden px-6 py-16 sm:py-24">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          <div className="w-full sm:w-auto">
            <p className="eyebrow">The Four Desks</p>
            <h2 className="mt-3 text-3xl leading-[1.1] sm:text-4xl md:text-5xl lg:text-6xl">
              Where every American tax question lives.
            </h2>
          </div>
          <p className="hidden max-w-xs text-sm text-muted-foreground md:block">
            Pick the desk that fits your situation. Each one is editorially
            independent and reads like a magazine, not a manual.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-6 sm:mt-14 sm:grid sm:grid-cols-12 sm:gap-12">
          {/* Featured */}
          <Link
            href={`/${featured.slug}`}
            className="relative w-full overflow-hidden rounded-lg border border-border bg-navy p-6 text-paper transition-shadow hover:shadow-2xl sm:col-span-7 sm:p-14"
          >
            <Image
              src={featured.image}
              alt={featured.imageAlt}
              fill
              className="absolute inset-0 object-cover opacity-35 transition-opacity duration-500 group-hover:opacity-50"
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-tr from-navy via-navy/80 to-navy/30" />
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, var(--paper) 1px, transparent 0)",
                backgroundSize: "20px 20px",
              }}
            />
            <div className="relative flex flex-col">
              <span className="pill w-fit border-paper/30 bg-transparent text-paper/70">
                Featured Desk
              </span>
              <h3 className="mt-6 font-display text-2xl leading-[1.08] sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
                {featured.title}.
              </h3>
              <p className="mt-2 max-w-xl font-display text-base italic text-paper/80 sm:mt-3 sm:text-lg md:text-xl lg:text-2xl">
                {featured.tagline}
              </p>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-paper/70 sm:mt-6">
                {featured.description}
              </p>
              <p className="mt-8 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-accent sm:mt-12">
                Enter the desk
                <span aria-hidden className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </p>
            </div>
          </Link>

          {/* Side stack */}
          <div className="col-span-12 flex flex-col gap-px overflow-hidden rounded-lg border border-border bg-border sm:col-span-5">
            {rest.map((c) => (
              <Link
                key={c.slug}
                href={`/${c.slug}`}
                className="group flex flex-col bg-card transition-colors hover:bg-secondary sm:flex-row sm:items-stretch"
              >
                <div className="relative aspect-video w-full overflow-hidden sm:aspect-auto sm:h-auto sm:w-32 sm:shrink-0 lg:w-40">
                  <Image
                    src={c.image}
                    alt={c.imageAlt}
                    fill
                    className="absolute inset-0 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div aria-hidden className="absolute inset-0 bg-navy/30" />
                </div>
                <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-6">
                  <h3 className="font-display text-lg text-navy sm:text-xl lg:text-2xl">
                    {c.shortTitle}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground sm:mt-2 sm:text-sm">
                    {c.tagline}
                  </p>
                  <p className="mt-2 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-navy sm:mt-4">
                    Read the desk
                    <span aria-hidden className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {latestArticle ? (
        <section className="border-y border-border bg-secondary/60">
          <div className="mx-auto max-w-7xl px-6 py-24">
            <p className="eyebrow">Latest Guides</p>
            <h2 className="mt-3 text-4xl leading-[1.08] sm:text-5xl md:text-6xl">
              Recent tax guides and articles.
            </h2>

            <div className="mt-14 grid gap-6 md:grid-cols-12">
              {/* Featured latest article */}
              <Link
                href={`/${latestArticle.category}/${latestArticle.slug}`}
                className="group relative col-span-12 overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-2xl md:col-span-7"
              >
                {latestArticle.imageUrl ? (
                  <div className="relative h-56 md:h-72">
                    <Image
                      src={latestArticle.imageUrl}
                      alt={latestArticle.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="flex h-56 items-center justify-center bg-navy md:h-72">
                    <span className="font-display text-6xl text-accent">
                      ★
                    </span>
                  </div>
                )}
                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="pill">{categories.find((c) => c.slug === latestArticle.category)?.shortTitle ?? latestArticle.category}</span>
                    <span>
                      {new Date(latestArticle.publishDate).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-2xl leading-tight text-navy md:text-3xl">
                    {latestArticle.title}
                  </h3>
                  {latestArticle.excerpt && (
                    <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                      {latestArticle.excerpt}
                    </p>
                  )}
                  <p className="mt-6 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                    Read the guide
                    <span aria-hidden className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </p>
                </div>
              </Link>

              {/* Side articles */}
              <div className="col-span-12 flex flex-col gap-px overflow-hidden rounded-lg border border-border bg-border sm:col-span-5 sm:grid">
                {sideArticles.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/${article.category}/${article.slug}`}
                    className="group flex flex-col bg-card transition-colors hover:bg-secondary sm:flex-row sm:items-stretch"
                  >
                    <div className="relative aspect-video w-full overflow-hidden sm:aspect-auto sm:h-auto sm:w-32 sm:shrink-0 lg:w-40">
                      {article.imageUrl ? (
                        <Image
                          src={article.imageUrl}
                          alt={article.title}
                          fill
                          className="absolute inset-0 object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-navy">
                          <span className="font-display text-3xl text-accent">
                            ★
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col p-5">
                      <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                        <span>{categories.find((c) => c.slug === article.category)?.shortTitle ?? article.category}</span>
                        <span aria-hidden>·</span>
                        <span>
                          {new Date(article.publishDate).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <h3 className="mt-2 font-display text-lg leading-snug text-navy">
                        {article.title}
                      </h3>
                      {article.excerpt && (
                        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                          {article.excerpt}
                        </p>
                      )}
                      <p className="mt-3 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-navy">
                        Read the guide
                        <span aria-hidden className="transition-transform group-hover:translate-x-1">
                          →
                        </span>
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
