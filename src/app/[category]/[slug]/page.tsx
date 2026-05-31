import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ category: string; slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await prisma.article.findFirst({
    where: { slug, published: true },
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

export default async function ArticlePage({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { category, slug } = await params;

  const article = await prisma.article.findFirst({
    where: { slug, published: true },
  });

  if (!article || article.category !== category) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <Link
        href={`/${category}`}
        className="text-sm text-muted-foreground hover:text-navy"
      >
        &larr; Back to {category.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
      </Link>

      <h1 className="mt-8 font-display text-4xl md:text-5xl text-navy">{article.title}</h1>

      <p className="mt-4 text-sm text-muted-foreground">
        {new Date(article.publishDate).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </p>

      {article.imageUrl && (
        <div className="mt-8 aspect-video relative overflow-hidden rounded-lg border border-border">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      )}

      {article.excerpt && (
        <p className="mt-8 text-lg text-muted-foreground italic leading-relaxed">
          {article.excerpt}
        </p>
      )}

      <div
        className="mt-10 prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </article>
  );
}
