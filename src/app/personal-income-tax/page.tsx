import type { Metadata } from "next";
import { CategoryPage } from "@/components/site/CategoryPage";
import { getCategory } from "@/lib/categories";
import { prisma } from "@/lib/prisma";

const cat = getCategory("personal-income-tax")!;

export const metadata: Metadata = {
  title: `${cat.title} — Tax Experts Hub`,
  description: cat.description,
  keywords: ["personal income tax", "tax filing", "W-2 taxes", "individual tax brackets", "tax credits for individuals", "child tax credit"],
  alternates: {
    canonical: `https://taxexpertshub.com/${cat.slug}`,
  },
  openGraph: {
    title: `${cat.title} — Tax Experts Hub`,
    description: cat.description,
    url: `https://taxexpertshub.com/${cat.slug}`,
    type: "article",
  },
};

export const revalidate = 3600;

export default async function PersonalIncomeTaxPage() {
  const articles = await prisma.article.findMany({
    where: { category: "personal-income-tax", published: true },
    orderBy: { publishDate: "desc" },
    select: {
      slug: true,
      title: true,
      excerpt: true,
      imageUrl: true,
      publishDate: true,
    },
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${cat.title} — Tax Experts Hub`,
    description: cat.description,
    url: `https://taxexpertshub.com/${cat.slug}`,
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
