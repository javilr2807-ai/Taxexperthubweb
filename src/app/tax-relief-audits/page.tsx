import type { Metadata } from "next";
import { CategoryPage } from "@/components/site/CategoryPage";
import { getCategory } from "@/lib/categories";
import { prisma } from "@/lib/prisma";

const cat = getCategory("tax-relief-audits")!;

export const metadata: Metadata = {
  title: `${cat.title} — Tax Experts Hub`,
  description: cat.description,
  keywords: ["tax relief", "IRS audit help", "back taxes", "tax debt resolution", "IRS payment plan", "offer in compromise", "tax penalties"],
  alternates: {
    canonical: `https://taxexpertshub.com/tax-relief-audits`,
  },
  openGraph: {
    title: `${cat.title} — Tax Experts Hub`,
    description: cat.description,
    url: `https://taxexpertshub.com/tax-relief-audits`,
    type: "article",
  },
};

export default async function Page() {
  const articles = await prisma.article.findMany({
    where: { category: "tax-relief-audits", published: true },
    orderBy: { publishDate: "desc" },
    select: { slug: true, title: true, excerpt: true, imageUrl: true, publishDate: true },
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${cat.title} — Tax Experts Hub`,
    description: cat.description,
    url: "https://taxexpertshub.com/tax-relief-audits",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CategoryPage category={cat} articles={articles} />
    </>
  );
}
