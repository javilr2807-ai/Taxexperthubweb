import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About — Tax Experts Hub",
  description: "Tax Experts Hub is an independent educational publication covering U.S. tax topics, IRS procedures, and personal finance for everyday readers.",
  keywords: ["about tax experts hub", "tax publication", "tax education", "US tax topics", "independent tax guide"],
  alternates: { canonical: "https://taxexpertshub.com/about" },
  openGraph: {
    title: "About — Tax Experts Hub",
    description: "Tax Experts Hub is an independent educational publication covering U.S. tax topics, IRS procedures, and personal finance for everyday readers.",
    url: "https://taxexpertshub.com/about",
  },
};

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About — Tax Experts Hub",
    description: "Tax Experts Hub is an independent educational publication covering U.S. tax topics, IRS procedures, and personal finance for everyday readers.",
    url: "https://taxexpertshub.com/about",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Masthead */}
      <section className="border-b border-border bg-navy text-paper">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <p className="eyebrow text-paper/60">About</p>
          <h1 className="mt-4 max-w-4xl text-5xl md:text-7xl">
            Making U.S. taxes <span className="text-accent">understandable</span>.
          </h1>
        </div>
      </section>

      {/* Our Mission */}
      <section className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        <h2 className="font-display text-3xl text-navy md:text-4xl">Our Mission</h2>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground">
          Tax Experts Hub exists to make U.S. tax topics easier to understand.
        </p>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          We publish educational articles, guides, and explainers covering federal
          tax rules, IRS procedures, tax credits, deductions, filing requirements,
          and related financial topics. Our goal is to help readers better understand
          complex tax concepts through clear, accessible content written in plain English.
        </p>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          Tax Experts Hub is an independent educational publication. We do not provide
          tax preparation services, accounting services, legal representation, or
          personalized tax advice.
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
            <p className="mt-2 font-display text-2xl text-navy">U.S. Taxes, IRS Topics &amp; Personal Finance Education</p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Audience
            </p>
            <p className="mt-2 font-display text-2xl text-navy">Individuals, Freelancers, Small Business Owners &amp; Investors</p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Language
            </p>
            <p className="mt-2 font-display text-2xl text-navy">Plain English</p>
          </div>
        </div>
      </section>

      {/* Editorial Team */}
      <section className="border-y border-border bg-secondary/60">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg border border-border">
                <Image
                  src="/images/james-carrington.png"
                  alt="Tax Experts Hub editorial team"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="md:col-span-7">
              <p className="eyebrow">About the Editorial Team</p>
              <h2 className="mt-3 font-display text-3xl text-navy md:text-4xl">
                Editorial Team
              </h2>
              <div className="mt-8 space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  Tax Experts Hub is maintained by a small editorial team focused on
                  researching, organizing, and explaining tax-related topics for
                  everyday readers.
                </p>
                <p>
                  Our content is created using publicly available sources, including
                  IRS publications, official government guidance, court decisions, and
                  educational reference materials. Articles are reviewed and updated
                  periodically to improve clarity, accuracy, and relevance.
                </p>
                <p>
                  We believe tax information should be understandable without requiring
                  specialized knowledge or technical training.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Approach */}
      <section className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        <p className="eyebrow">Editorial Approach</p>
        <h2 className="mt-3 font-display text-3xl text-navy md:text-4xl">
          How We Create Content
        </h2>
        <div className="mt-10 grid gap-10 sm:grid-cols-3">
          <div>
            <p className="font-display text-xl text-accent">Research First</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Articles are developed using publicly available government resources,
              official IRS materials, and educational reference sources whenever
              applicable.
            </p>
          </div>
          <div>
            <p className="font-display text-xl text-accent">Clarity Matters</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Complex tax topics are rewritten into straightforward language
              designed for non-specialist readers.
            </p>
          </div>
          <div>
            <p className="font-display text-xl text-accent">Regular Updates</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Content may be revised periodically to reflect regulatory changes,
              updated guidance, or improvements in accuracy and readability.
            </p>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="border-y border-border bg-secondary/60">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <p className="eyebrow">Our Principles</p>
          <h2 className="mt-3 text-3xl text-navy md:text-4xl">
            How we approach tax education.
          </h2>
          <div className="mt-12 grid gap-10 sm:grid-cols-3">
            <div>
              <p className="font-display text-3xl text-accent">01</p>
              <p className="mt-4 font-display text-xl text-navy">Independent</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Our content is created for informational and educational purposes.
                We aim to provide clear explanations without unnecessary complexity.
              </p>
            </div>
            <div>
              <p className="font-display text-3xl text-accent">02</p>
              <p className="mt-4 font-display text-xl text-navy">Accessible</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Tax topics can be difficult to understand. We focus on making
                information easier to follow for everyday readers.
              </p>
            </div>
            <div>
              <p className="font-display text-3xl text-accent">03</p>
              <p className="mt-4 font-display text-xl text-navy">Educational</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Tax Experts Hub is an educational publication designed to help
                readers learn about tax-related topics and public guidance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        <div className="rounded-lg border border-border bg-card p-8">
          <p className="eyebrow">Important Notice</p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Tax Experts Hub is an informational website only.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            The content published on this website does not constitute tax, legal,
            accounting, or financial advice. Readers should consult qualified
            professionals regarding their specific circumstances before making tax
            or financial decisions.
          </p>
        </div>
      </section>
    </>
  );
}
