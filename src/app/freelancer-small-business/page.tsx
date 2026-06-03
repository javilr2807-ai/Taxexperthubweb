import type { Metadata } from "next";
import { CategoryPage } from "@/components/site/CategoryPage";
import { getCategory } from "@/lib/categories";
import { prisma } from "@/lib/prisma";

const cat = getCategory("freelancer-small-business")!;

export const metadata: Metadata = {
  title: `${cat.title} — Tax Experts Hub`,
  description: cat.description,
  keywords: ["freelancer taxes", "small business tax guide", "self-employed tax deductions", "1099 taxes", "business expenses", "sole proprietorship tax", "LLC taxes"],
  alternates: {
    canonical: `https://taxexpertshub.com/freelancer-small-business`,
  },
  openGraph: {
    title: `${cat.title} — Tax Experts Hub`,
    description: cat.description,
    url: `https://taxexpertshub.com/freelancer-small-business`,
    type: "article",
  },
};

export default async function Page() {
  const articles = await prisma.article.findMany({
    where: { category: "freelancer-small-business", published: true },
    orderBy: { publishDate: "desc" },
    select: { slug: true, title: true, excerpt: true, imageUrl: true, publishDate: true },
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${cat.title} — Tax Experts Hub`,
    description: cat.description,
    url: "https://taxexpertshub.com/freelancer-small-business",
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
