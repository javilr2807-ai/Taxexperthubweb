import type { Metadata } from "next";
import { CategoryPage } from "@/components/site/CategoryPage";
import { getCategory } from "@/lib/categories";
import { prisma } from "@/lib/prisma";

const cat = getCategory("crypto-investment")!;

export const metadata: Metadata = {
  title: `${cat.title} — Tax Experts Hub`,
  description: cat.description,
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

  return <CategoryPage category={cat} articles={articles} />;
}
