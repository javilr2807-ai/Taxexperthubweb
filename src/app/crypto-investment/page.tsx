import type { Metadata } from "next";
import { CategoryPage } from "@/components/site/CategoryPage";
import { getCategory } from "@/lib/categories";

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

export default function Page() {
  return <CategoryPage category={cat} />;
}
