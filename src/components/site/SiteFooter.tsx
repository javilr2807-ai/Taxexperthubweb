import Link from "next/link";
import { categories } from "@/lib/categories";

const legalLinks = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-of-service", label: "Terms of Service" },
  { href: "/cookie-policy", label: "Cookie Policy" },
  { href: "/legal-notice", label: "Legal Notice" },
] as const;

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-border bg-navy text-paper">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-display text-4xl leading-tight">
              Tax Experts <span className="italic">Hub</span>
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-paper/70">
              Plain-English U.S. tax journalism for taxpayers, freelancers,
              investors, and anyone holding an IRS notice they don't understand.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-paper/50">
              Editorial guidance only. Nothing here is legal or tax advice.
              For your specific situation, consult a licensed CPA, EA, or tax
              attorney.
            </p>
            <p className="mt-8 text-[11px] uppercase tracking-[0.2em] text-paper/50">
              taxexpertshub.com · United States
            </p>
          </div>

          <div className="md:col-span-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-paper/50">
              The Desks
            </p>
            <ul className="mt-4 space-y-3">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/${c.slug}`}
                    className="group flex items-baseline gap-3 text-paper/90 hover:text-accent"
                  >
                    <span className="text-[11px] tracking-[0.2em] text-paper/40">
                      {c.number}
                    </span>
                    <span className="font-display text-lg">{c.shortTitle}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-paper/50">
              Legal
            </p>
            <ul className="mt-4 space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-paper/90 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-paper/15 pt-6 text-xs text-paper/50 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Tax Experts Hub. All rights reserved.</p>
          <p className="tracking-[0.18em] uppercase">IRS-aware. Audience-first.</p>
        </div>
      </div>
    </footer>
  );
}
