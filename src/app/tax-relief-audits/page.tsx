import type { Metadata } from "next";
import { CategoryPage } from "@/components/site/CategoryPage";
import { getCategory } from "@/lib/categories";

const cat = getCategory("tax-relief-audits")!;

export const metadata: Metadata = {
  title: `${cat.title} — Tax Experts Hub`,
  description: cat.description,
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

export default function Page() {
  return <CategoryPage category={cat} />;
}
