import type { Metadata } from "next";
import { CategoryPage } from "@/components/site/CategoryPage";
import { getCategory } from "@/lib/categories";
import { prisma } from "@/lib/prisma";

const cat = getCategory("crypto-investment")!;

export const metadata: Metadata = {
  title: `${cat.title} — Tax Experts Hub`,
  description: cat.description,
  keywords: ["crypto taxes", "bitcoin tax", "cryptocurrency capital gains", "how to report crypto taxes", "IRS crypto rules", "NFT taxes"],
  alternates: {
    canonical: `https://taxexpertshub.com/crypto-investment`,
  },
  openGraph: {
    title: `${cat.title} — Tax Experts Hub`,
    description: cat.description,
    url: `https://taxexpertshub.com/crypto-investment`,
    type: "article",
  },
};

export default async function Page() {
  const articles = await prisma.article.findMany({
    where: { category: "crypto-investment", published: true },
    orderBy: { publishDate: "desc" },
    select: { slug: true, title: true, excerpt: true, imageUrl: true, publishDate: true },
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${cat.title} — Tax Experts Hub`,
    description: cat.description,
    url: "https://taxexpertshub.com/crypto-investment",
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
