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

  const relatedArticles = await prisma.article.findMany({
    where: { category, published: true, slug: { not: slug } },
    orderBy: { publishDate: 'desc' },
    take: 4,
    select: { slug: true, title: true },
  });

  const readTime = estimateReadTime(article.content);
  const fallbackSrc = fallbackImages[category];

  return (
    <article className="tax-article mx-auto max-w-7xl px-6 py-12 md:py-16">
      <nav className="breadcrumbs">
        <Link href="/">Home</Link>
        <span className="sep">›</span>
        <Link href={`/${category}`}>{formatCategory(category)}</Link>
        <span className="sep">›</span>
        <span>Overtime Pay &amp; Taxes</span>
      </nav>

      <header className="article-header">
        <h1>{article.title}</h1>

        {article.excerpt && (
          <p className="article-intro">{article.excerpt}</p>
        )}

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

      <div className="article-body">
        {article.imageUrl ? (
          <div className="article-image">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="article-image-el"
            />
          </div>
        ) : fallbackSrc ? (
          <div className="article-image">
            <Image
              src={fallbackSrc}
              alt={article.title}
              className="article-image-el"
              priority
            />
          </div>
        ) : null}

        <div className="article-layout">
          <main className="article-content">
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          </main>

          <aside className="article-sidebar">
            {relatedArticles.length > 0 && (
              <div className="sidebar-card">
                <h3>Related Articles</h3>
                <ul>
                  {relatedArticles.map((a) => (
                    <li key={a.slug}>
                      <Link href={`/${category}/${a.slug}`}>{a.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </div>
    </article>
  );
}
