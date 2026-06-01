import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import catPersonal from "@/assets/cat-personal.jpg";
import catFreelancer from "@/assets/cat-freelancer.jpg";
import catCrypto from "@/assets/cat-crypto.jpg";
import catRelief from "@/assets/cat-relief.jpg";

const fallbackImages: Record<string, typeof catPersonal> = {
  "personal-income-tax": catPersonal,
  "freelancer-small-business": catFreelancer,
  "crypto-investment": catCrypto,
  "tax-relief-audits": catRelief,
};

export async function generateMetadata({ params }: { params: Promise<{ category: string; slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await prisma.article.findFirst({
    where: { slug },
    select: { title: true, excerpt: true, imageUrl: true, category: true },
  });

  if (!article) return {};

  const siteUrl = "https://taxexpertshub.com";
  const ogImage = article.imageUrl
    ? `${siteUrl}${article.imageUrl.startsWith("/") ? "" : "/"}${article.imageUrl}`
    : `${siteUrl}/images/james-carrington.png`;

  return {
    title: `${article.title} — Tax Experts Hub`,
    description: article.excerpt || undefined,
    openGraph: {
      title: `${article.title} — Tax Experts Hub`,
      description: article.excerpt || undefined,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      images: [ogImage],
    },
  };
}

function formatCategory(slug: string): string {
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function wordCount(html: string): number {
  const text = html.replace(/<[^>]*>/g, '');
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}

export default async function ArticlePage({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { category, slug } = await params;

  const article = await prisma.article.findFirst({
    where: { slug },
  });

  if (!article || article.category !== category) {
    notFound();
  }

  const allRelated = await prisma.article.findMany({
    where: { published: true, slug: { not: slug } },
    orderBy: { publishDate: 'desc' },
    take: 4,
    select: { slug: true, title: true, excerpt: true, imageUrl: true, category: true },
  });

  const youMayAlsoLike = allRelated.slice(0, 4);

  const wc = wordCount(article.content);
  const fallbackSrc = fallbackImages[category];

  return (
    <article className="tax-article">
      <div className="article-layout">
        <main className="article-main">
          <nav className="breadcrumbs">
            <Link href="/">Home</Link>
            <span className="sep">›</span>
            <Link href={`/${category}`}>{formatCategory(category)}</Link>
            <span className="sep">›</span>
            <span>Overtime Pay &amp; Taxes</span>
          </nav>

          <header className="article-header">
            <h1>{article.title}</h1>

            <div className="article-meta">
              <span>TaxExperts Team</span>
              <span className="dot">·</span>
              <span>{new Date(article.publishDate).toLocaleDateString('en-GB')}</span>
              <span className="dot">·</span>
              <span>{wc.toLocaleString()} words</span>
            </div>
          </header>

          <div className="article-featured-image">
            {article.imageUrl ? (
              <img
                src={article.imageUrl}
                alt={article.title}
              />
            ) : fallbackSrc ? (
              <Image
                src={fallbackSrc}
                alt={article.title}
                priority
              />
            ) : null}
          </div>

          <div className="article-content">
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          </div>

          {youMayAlsoLike.length > 0 && (
            <section className="article-related">
              <h2>You May Also Like</h2>
              <div className="related-grid">
                {youMayAlsoLike.map((a) => (
                  <Link
                    key={a.slug}
                    href={`/${a.category}/${a.slug}`}
                    className="related-card"
                  >
                    {a.imageUrl ? (
                      <div className="related-card-img">
                        <img src={a.imageUrl} alt={a.title} />
                      </div>
                    ) : (
                      <div className="related-card-img related-card-img-fallback">
                        <span>★</span>
                      </div>
                    )}
                    <div className="related-card-body">
                      <h3>{a.title}</h3>
                      {a.excerpt && <p>{a.excerpt}</p>}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </article>
  );
}
