import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { sanitizeHtml } from '@/lib/sanitize';
import AdSense from '@/components/AdSense';
import { AdInjector } from '@/components/AdInjector';
import catPersonal from "@/assets/cat-personal.jpg";
import catFreelancer from "@/assets/cat-freelancer.jpg";
import catCrypto from "@/assets/cat-crypto.jpg";
import catRelief from "@/assets/cat-relief.jpg";

function injectAdsIntoContent(html: string): string {
  const adHtml = `
<div class="ad-wrapper my-8 overflow-hidden flex justify-center w-full" aria-hidden="true">
  <ins class="adsbygoogle"
       style="display:block; text-align:center;"
       data-ad-layout="in-article"
       data-ad-format="fluid"
       data-ad-client="ca-pub-6585145551277304"
       data-ad-slot="2899862202"></ins>
</div>`;
  const parts = html.split('</p>');
  let result = '';
  // Distribute about 5 ads evenly through the content
  const interval = Math.max(2, Math.floor(parts.length / 6)); 
  
  for (let i = 0; i < parts.length; i++) {
    result += parts[i] + (i !== parts.length - 1 ? '</p>' : '');
    // Ensure we don't put an ad at the very end if there's no more content
    if ((i + 1) % interval === 0 && i < parts.length - 2) {
      result += adHtml;
    }
  }
  return result;
}

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

  const keywordList = article.title.split(" ").filter((w: string) => w.length > 3).map((w: string) => w.toLowerCase());
  keywordList.push(article.category.replace(/-/g, " "));
  keywordList.push("tax guide", "tax experts hub");

  return {
    title: `${article.title} — Tax Experts Hub`,
    description: article.excerpt || undefined,
    keywords: keywordList,
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

export const revalidate = 3600; // revalidate at most every hour

export async function generateStaticParams() {
  const articles = await prisma.article.findMany({
    where: { published: true },
    select: { category: true, slug: true },
  });

  return articles.map((article) => ({
    category: article.category,
    slug: article.slug,
  }));
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
  const contentWithAds = injectAdsIntoContent(article.content);
  const fallbackSrc = fallbackImages[category];

  const siteUrl = "https://taxexpertshub.com";
  const ogImage = article.imageUrl
    ? `${siteUrl}${article.imageUrl.startsWith("/") ? "" : "/"}${article.imageUrl}`
    : `${siteUrl}/images/james-carrington.png`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt || undefined,
    image: ogImage,
    datePublished: article.publishDate.toISOString(),
    dateModified: article.updatedAt.toISOString(),
    author: {
      "@type": "Organization",
      name: "TaxExperts Team",
      url: siteUrl
    },
    publisher: {
      "@type": "Organization",
      name: "Tax Experts Hub",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/favicon.png`
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AdInjector />
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

          <AdSense slot="2564975812" format="horizontal" className="adsbygoogle my-6" />

          <div className="article-featured-image" style={{ position: 'relative', width: '100%', height: 'auto', aspectRatio: '16/9' }}>
            {article.imageUrl ? (
              <Image
                src={article.imageUrl}
                alt={article.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 800px"
                style={{ objectFit: 'cover', borderRadius: '8px' }}
              />
            ) : fallbackSrc ? (
              <Image
                src={fallbackSrc}
                alt={article.title}
                priority
              />
            ) : null}
          </div>

          <AdSense slot="9030842049" format="auto" className="adsbygoogle my-6" />

          <div className="article-content">
            <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(contentWithAds) }} />
          </div>

          <AdSense slot="2564975812" format="horizontal" className="adsbygoogle my-8" />

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
                      <div className="related-card-img" style={{ position: 'relative' }}>
                        <Image src={a.imageUrl} alt={a.title} fill sizes="(max-width: 768px) 100vw, 300px" style={{ objectFit: 'cover' }} />
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

          <AdSense slot="7310566260" format="vertical" className="adsbygoogle my-8" />
        </main>
      </div>
    </article>
    </>
  );
}
