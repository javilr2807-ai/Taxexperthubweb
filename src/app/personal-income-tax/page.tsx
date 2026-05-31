import type { Metadata } from "next";
import { CategoryPage } from "@/components/site/CategoryPage";
import { getCategory } from "@/lib/categories";

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

export default function Page() {
  return <CategoryPage category={cat} />;
}
