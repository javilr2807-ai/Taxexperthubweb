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

  return {
    title: `${article.title} — Tax Experts Hub`,
    description: article.excerpt || undefined,
    openGraph: {
      title: `${article.title} — Tax Experts Hub`,
      description: article.excerpt || undefined,
      images: article.imageUrl ? [{ url: article.imageUrl }] : undefined,
    },
  };
}

function formatCategory(slug: string): string {
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function estimateReadTime(html: string): number {
  const text = html.replace(/<[^>]*>/g, '');
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  return Math.max(1, Math.round(words / 200));
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

  const readTime = estimateReadTime(article.content);
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
              <span className="author">By TaxExpertsHub Team</span>
              <span className="dot">·</span>
              <span className="date">
                Updated {new Date(article.publishDate).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
              <span className="dot">·</span>
              <span className="read-time">{readTime} min read</span>
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
