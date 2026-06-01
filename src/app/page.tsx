import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { categories } from "@/lib/categories";
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

export default function HomePage() {
  const [featured, ...rest] = categories;

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
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow">The Four Desks</p>
            <h2 className="mt-3 text-5xl md:text-6xl">
              Where every American tax question lives.
            </h2>
          </div>
          <p className="hidden max-w-xs text-sm text-muted-foreground md:block">
            Pick the desk that fits your situation. Each one is editorially
            independent and reads like a magazine, not a manual.
          </p>
        </div>

        <div className="mt-14 grid gap-12 md:grid-cols-12">
          {/* Featured */}
          <Link
            href={`/${featured.slug}`}
            className="group relative col-span-12 overflow-hidden rounded-lg border border-border bg-navy p-10 text-paper transition-shadow hover:shadow-2xl md:col-span-7 md:p-14"
          >
            <Image
              src={featured.image}
              alt={featured.imageAlt}
              fill
              className="absolute inset-0 h-full w-full object-cover opacity-35 transition-opacity duration-500 group-hover:opacity-50"
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
            <div className="relative flex h-full flex-col">
              <div className="flex items-center justify-between">
                <span className="pill border-paper/30 bg-transparent text-paper/70">
                  Featured Desk
                </span>
                <span className="font-display text-6xl text-accent">
                  {featured.number}
                </span>
              </div>
              <h3 className="mt-12 font-display text-5xl md:text-6xl">
                {featured.title}.
              </h3>
              <p className="mt-4 max-w-xl font-display text-2xl italic text-paper/80">
                {featured.tagline}
              </p>
              <p className="mt-8 max-w-xl text-sm leading-relaxed text-paper/70">
                {featured.description}
              </p>
              <p className="mt-12 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                Enter the desk
                <span aria-hidden className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </p>
            </div>
          </Link>

          {/* Side stack */}
          <div className="col-span-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:col-span-5 md:grid-cols-1">
            {rest.map((c) => (
              <Link
                key={c.slug}
                href={`/${c.slug}`}
                className="group flex items-stretch gap-0 bg-card transition-colors hover:bg-secondary"
              >
                <div className="relative w-32 shrink-0 overflow-hidden sm:w-40">
                  <Image
                    src={c.image}
                    alt={c.imageAlt}
                    fill
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div aria-hidden className="absolute inset-0 bg-navy/30" />
                  <span className="absolute left-3 top-3 font-display text-3xl text-accent">
                    {c.number}
                  </span>
                </div>
                <div className="flex-1 p-6">
                  <h3 className="font-display text-2xl text-navy">
                    {c.shortTitle}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {c.tagline}
                  </p>
                  <p className="mt-4 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-navy">
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

      {/* Editorial promise */}
      <section className="border-y border-border bg-secondary/60">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 py-24 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="eyebrow">The Editorial Promise</p>
            <h2 className="mt-4 text-5xl">
              No jargon.<br />
              <span className="italic">No fear.</span><br />
              No upsell.
            </h2>
          </div>
          <div className="md:col-span-7">
            <div className="grid gap-10 sm:grid-cols-2">
              {[
                {
                  k: "Plain English",
                  v: "Every IRS rule explained at the level of a thoughtful neighbor — not a tax-software ad.",
                },
                {
                  k: "Cited & current",
                  v: "Coverage is grounded in actual IRS publications, court cases, and the most recent tax-law updates.",
                },
                {
                  k: "Audience first",
                  v: "We don't sell your taxes. No lead-gen funnels, no affiliate disclaimers buried in footnotes.",
                },
                {
                  k: "Built for the U.S.",
                  v: "Federal + state interplay, real American filing situations — written by people who file here too.",
                },
              ].map((b) => (
                <div key={b.k}>
                  <p className="font-display text-2xl text-navy">{b.k}.</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {b.v}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
