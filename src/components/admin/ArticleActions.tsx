'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { toggleArticle, deleteArticleInline } from '@/app/admin/article-actions';

type Article = {
  id: string;
  slug: string;
  category: string;
  published: boolean;
};

export function ArticleActions({ article }: { article: Article }) {
  const handleDelete = (formData: FormData) => {
    if (confirm('Are you sure you want to delete this article?')) {
      deleteArticleInline(formData);
    }
  };

  return (
    <div className="flex items-center justify-end gap-1">
      <Link
        href={`/${article.category}/${article.slug}`}
        target="_blank"
        title="View article"
      >
        <Button variant="ghost" size="icon" className="h-8 w-8 text-navy hover:text-brass">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
        </Button>
      </Link>
      <Link href={`/admin/articles/${article.id}`} title="Edit article">
        <Button variant="ghost" size="icon" className="h-8 w-8 text-navy hover:text-brass">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
        </Button>
      </Link>
      <form action={toggleArticle}>
        <input type="hidden" name="id" value={article.id} />
        <Button
          type="submit"
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-navy hover:text-brass"
          title={article.published ? 'Unpublish' : 'Publish'}
        >
          {article.published ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>
          )}
        </Button>
      </form>
      <form action={handleDelete}>
        <input type="hidden" name="id" value={article.id} />
        <Button
          type="submit"
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-red-500 hover:text-red-700"
          title="Delete article"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
        </Button>
      </form>
    </div>
  );
}
