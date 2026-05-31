import Link from "next/link";
import Image from "next/image";
import { categories, type Category } from "@/lib/categories";

export function CategoryPage({ category }: { category: Category }) {
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
        <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-20 md:grid-cols-12 md:py-28">
          <div className="md:col-span-2">
            <p className="font-display text-7xl text-accent">{category.number}</p>
          </div>
          <div className="md:col-span-10">
            <p className="eyebrow text-paper/60">The {category.shortTitle} Desk</p>
            <h1 className="mt-4 max-w-4xl text-5xl md:text-7xl">
              {category.title}.
            </h1>
            <p className="mt-6 max-w-2xl font-display text-2xl italic text-paper/80 md:text-3xl">
              {category.tagline}
            </p>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-paper/75">
              {category.description}
            </p>
            <p className="mt-8 text-[11px] uppercase tracking-[0.22em] text-paper/50">
              Who this is for · {category.audience}
            </p>
          </div>
        </div>
      </section>

      {/* Topics grid */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow">What we cover</p>
            <h2 className="mt-3 text-4xl md:text-5xl">The essentials.</h2>
          </div>
          <p className="hidden max-w-xs text-sm text-muted-foreground md:block">
            Six pillars. Every article on this desk maps to one.
          </p>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-3">
          {category.topics.map((t, i) => (
            <div
              key={t.title}
              className="group relative bg-card p-8 transition-colors hover:bg-secondary"
            >
              <p className="text-[11px] font-semibold tracking-[0.22em] text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-4 font-display text-2xl text-navy">{t.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {t.blurb}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Forms + Questions split */}
      <section className="border-y border-border bg-secondary/60">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 py-24 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="eyebrow">Forms you'll meet</p>
            <h2 className="mt-3 text-4xl">The paperwork.</h2>
            <ul className="mt-8 divide-y divide-border border-y border-border">
              {category.forms.map((f) => (
                <li
                  key={f}
                  className="flex items-baseline justify-between py-4 font-display text-2xl text-navy"
                >
                  <span>{f}</span>
                  <span className="text-[11px] tracking-[0.22em] text-muted-foreground">
                    IRS
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-7">
            <p className="eyebrow">Questions we hear most</p>
            <h2 className="mt-3 text-4xl">Asked. Answered.</h2>
            <ol className="mt-8 space-y-6">
              {category.questions.map((q, i) => (
                <li key={q} className="flex gap-6 border-b border-border pb-6">
                  <span className="font-display text-3xl italic text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="font-display text-2xl leading-snug text-navy">
                    {q}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
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
              <p className="text-[11px] tracking-[0.22em] text-muted-foreground group-hover:text-paper/60">
                {c.number}
              </p>
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
