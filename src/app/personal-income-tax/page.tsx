import type { Metadata } from "next";
import { CategoryPage } from "@/components/site/CategoryPage";
import { getCategory } from "@/lib/categories";
import { prisma } from "@/lib/prisma";

const cat = getCategory("personal-income-tax")!;

export const metadata: Metadata = {
  title: `${cat.title} — Tax Experts Hub`,
  description: cat.description,
  alternates: {
    canonical: `https://taxexpertshub.com/personal-income-tax`,
  },
  openGraph: {
    title: `${cat.title} — Tax Experts Hub`,
    description: cat.description,
    url: `https://taxexpertshub.com/personal-income-tax`,
    type: "article",
  },
};

export default async function Page() {
  const articles = await prisma.article.findMany({
    where: { category: "personal-income-tax", published: true },
    orderBy: { publishDate: "desc" },
    select: { slug: true, title: true, excerpt: true, imageUrl: true, publishDate: true },
  });

  return <CategoryPage category={cat} articles={articles} />;
}
