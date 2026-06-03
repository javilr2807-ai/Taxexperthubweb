import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact — Tax Experts Hub",
  description: "Get in touch with Tax Experts Hub. Send us a question, suggestion, or feedback about our tax coverage.",
  keywords: ["contact tax experts hub", "tax questions", "tax advice contact", "tax feedback", "reach tax experts"],
  alternates: { canonical: "https://taxexpertshub.com/contact" },
  openGraph: {
    title: "Contact — Tax Experts Hub",
    description: "Get in touch with Tax Experts Hub. Send us a question, suggestion, or feedback.",
    url: "https://taxexpertshub.com/contact",
  },
};

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact — Tax Experts Hub",
    description: "Get in touch with Tax Experts Hub. Send us a question, suggestion, or feedback about our tax coverage.",
    url: "https://taxexpertshub.com/contact",
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
          <p className="eyebrow text-paper/60">Contact</p>
          <h1 className="mt-4 max-w-4xl text-5xl md:text-7xl">
            Get in <span className="text-accent">touch</span>.
          </h1>
        </div>
      </section>

      {/* Form */}
      <section className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        <h2 className="font-display text-3xl text-navy md:text-4xl">Send us a message</h2>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          Have a question, suggestion, or feedback about our tax coverage?
          Fill out the form below and we&apos;ll get back to you.
        </p>

        <form className="mt-12 space-y-8">
          <div>
            <label htmlFor="name" className="text-sm font-medium text-navy">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Your name"
              className="mt-2 block w-full rounded-lg border border-border bg-card px-4 py-3 text-sm text-navy placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          <div>
            <label htmlFor="email" className="text-sm font-medium text-navy">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="your@email.com"
              className="mt-2 block w-full rounded-lg border border-border bg-card px-4 py-3 text-sm text-navy placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          <div>
            <label htmlFor="subject" className="text-sm font-medium text-navy">
              Subject
            </label>
            <select
              id="subject"
              name="subject"
              className="mt-2 block w-full rounded-lg border border-border bg-card px-4 py-3 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="">Select a topic</option>
              <option value="general">General inquiry</option>
              <option value="suggestion">Suggestion</option>
              <option value="correction">Correction</option>
              <option value="press">Press</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="text-sm font-medium text-navy">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              placeholder="Write your message here..."
              className="mt-2 block w-full rounded-lg border border-border bg-card px-4 py-3 text-sm text-navy placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-y"
            />
          </div>

          <button
            type="submit"
            className="rounded-full border border-navy bg-navy px-8 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-paper transition-colors hover:bg-navy-soft"
          >
            Send message
          </button>
        </form>

        <div className="mt-16 border-t border-border pt-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Or write us directly
          </p>
          <p className="mt-4 font-display text-2xl text-navy">
            contact@taxexpertshub.com
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            For legal inquiries, please visit our{" "}
            <Link href="/legal-notice" className="text-accent hover:underline">
              Legal Notice
            </Link>{" "}
            page.
          </p>
        </div>
      </section>
    </>
  );
}
