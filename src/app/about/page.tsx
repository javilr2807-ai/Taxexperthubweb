import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About — Tax Experts Hub",
  description: "Learn about Tax Experts Hub, our mission to make U.S. taxes understandable, and the team behind the coverage.",
  alternates: { canonical: "https://taxexpertshub.com/about" },
  openGraph: {
    title: "About — Tax Experts Hub",
    description: "Learn about Tax Experts Hub, our mission to make U.S. taxes understandable, and the team behind the coverage.",
    url: "https://taxexpertshub.com/about",
  },
};

export default function AboutPage() {
  return (
    <>
      {/* Masthead */}
      <section className="border-b border-border bg-navy text-paper">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <p className="eyebrow text-paper/60">About</p>
          <h1 className="mt-4 max-w-4xl text-5xl md:text-7xl">
            Making U.S. taxes <span className="text-accent">understandable</span>.
          </h1>
        </div>
      </section>

      {/* Mission */}
      <section className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        <h2 className="font-display text-3xl text-navy md:text-4xl">Our Mission</h2>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground">
          Tax Experts Hub was founded with a single goal: to make U.S. tax rules
          accessible to the people who actually have to follow them. Every article
          is written in plain English, grounded in IRS publications and tax law,
          and free of affiliate links, lead-gen funnels, and financial-product
          placement.
        </p>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          We cover four editorial desks — Personal Income Tax, Freelancer &amp;
          Small Business, Crypto &amp; Investment Taxes, and Tax Relief &amp;
          Audits — each one staffed by journalists who specialize in making
          complex regulations readable. No jargon. No fear. No upsell.
        </p>

        <div className="mt-16 grid gap-12 sm:grid-cols-2">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Founded
            </p>
            <p className="mt-2 font-display text-2xl text-navy">2026</p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Coverage
            </p>
            <p className="mt-2 font-display text-2xl text-navy">U.S. Tax Law &amp; IRS</p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Readers
            </p>
            <p className="mt-2 font-display text-2xl text-navy">Taxpayers, Freelancers, Investors</p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Language
            </p>
            <p className="mt-2 font-display text-2xl text-navy">Plain English</p>
          </div>
        </div>
      </section>

      {/* Editor */}
      <section className="border-y border-border bg-secondary/60">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg border border-border">
                <Image
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80"
                  alt="James Carrington, Editor-in-Chief of Tax Experts Hub"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="md:col-span-7">
              <p className="eyebrow">Editor-in-Chief</p>
              <h2 className="mt-3 font-display text-4xl text-navy md:text-5xl">
                James Carrington
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Editor-in-Chief &amp; Founder
              </p>
              <div className="mt-8 space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  James Carrington is a tax journalist and former CPA with over
                  twelve years of experience in tax preparation and financial
                  journalism. He founded Tax Experts Hub after years of watching
                  taxpayers struggle with confusing IRS forms and misleading
                  online advice.
                </p>
                <p>
                  A graduate of the University of Virginia with a degree in
                  Accounting, James spent eight years at a mid-sized CPA firm
                  in Richmond, Virginia, where he specialized in individual and
                  small-business tax preparation. He has been quoted in financial
                  publications on matters of IRS compliance, tax reform, and
                  digital-asset reporting.
                </p>
                <p>
                  James lives in Richmond, Virginia, with his family. He believes
                  that understanding your taxes should not require a law degree
                  — and that clear, honest journalism is the best tool for the job.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial principles */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <p className="eyebrow">Our Principles</p>
        <h2 className="mt-3 text-4xl text-navy md:text-5xl">
          How we cover taxes.
        </h2>
        <div className="mt-12 grid gap-10 sm:grid-cols-3">
          <div>
            <p className="font-display text-3xl text-accent">01</p>
            <p className="mt-4 font-display text-xl text-navy">Independent</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              No sponsored content, no affiliate links, no advertising influence.
              Our only obligation is to the reader.
            </p>
          </div>
          <div>
            <p className="font-display text-3xl text-accent">02</p>
            <p className="mt-4 font-display text-xl text-navy">Accurate</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Every piece is grounded in primary sources — IRS publications,
              tax code sections, court rulings, and official guidance.
            </p>
          </div>
          <div>
            <p className="font-display text-3xl text-accent">03</p>
            <p className="mt-4 font-display text-xl text-navy">Readable</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              We translate tax rules into clear, conversational English.
              If a sentence needs a footnote, it needs a rewrite.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
