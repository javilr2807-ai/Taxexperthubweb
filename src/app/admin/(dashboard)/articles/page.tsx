import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { PlusCircle } from 'lucide-react';
import { ArticleActions } from '@/components/admin/ArticleActions';

function wordCount(html: string): number {
  const text = html.replace(/<[^>]*>/g, '');
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}

function formatCategory(slug: string): string {
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

export default async function AdminArticlesPage() {
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const drafts = articles.filter(a => !a.published);
  const published = articles.filter(a => a.published);

  function renderArticle(article: typeof articles[0]) {
    return (
      <div key={article.id} className="rounded-md border border-border bg-card p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <p className="text-xs text-muted-foreground">
              {formatCategory(article.category)}
              <span className="mx-1.5">·</span>
              {new Date(article.publishDate).toLocaleDateString('en-GB')}
              <span className="mx-1.5">·</span>
              {wordCount(article.content)} words
            </p>
            <h3 className="mt-1 font-display text-xl text-navy">
              <Link href={`/admin/articles/${article.id}`} className="hover:text-brass transition-colors">
                {article.title}
              </Link>
            </h3>
            {article.excerpt && (
              <p className="mt-1 text-sm text-muted-foreground line-clamp-2 max-w-prose">
                {article.excerpt}
              </p>
            )}
          </div>
          <div className="shrink-0 flex items-start gap-1 pt-1">
            <ArticleActions article={article} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-4xl text-navy">Articles</h1>
          <p className="mt-2 text-muted-foreground">Manage your editorial content.</p>
        </div>
        <Link href="/admin/articles/new">
          <Button className="bg-navy text-paper hover:bg-navy-soft gap-2">
            <PlusCircle className="h-4 w-4" />
            New Article
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="rounded-md border border-border bg-card p-5 text-center">
          <p className="text-3xl font-display text-navy">{articles.length}</p>
          <p className="text-xs text-muted-foreground mt-1">Total</p>
        </div>
        <div className="rounded-md border border-border bg-card p-5 text-center">
          <p className="text-3xl font-display text-navy">{drafts.length}</p>
          <p className="text-xs text-muted-foreground mt-1">Borradores</p>
        </div>
        <div className="rounded-md border border-border bg-card p-5 text-center">
          <p className="text-3xl font-display text-navy">{published.length}</p>
          <p className="text-xs text-muted-foreground mt-1">Publicados</p>
        </div>
      </div>

      {articles.length === 0 ? (
        <div className="rounded-md border border-border bg-card p-12 text-center text-muted-foreground">
          No articles found. Create your first one.
        </div>
      ) : (
        <div className="space-y-8">
          {drafts.length > 0 && (
            <div>
              <h2 className="font-display text-2xl text-navy mb-4">Borradores</h2>
              <div className="space-y-4">
                {drafts.map(renderArticle)}
              </div>
            </div>
          )}
          {published.length > 0 && (
            <div>
              <h2 className="font-display text-2xl text-navy mb-4">Artículos Publicados</h2>
              <div className="space-y-4">
                {published.map(renderArticle)}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
