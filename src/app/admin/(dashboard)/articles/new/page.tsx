import { ArticleForm } from '@/components/admin/ArticleForm';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NewArticlePage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <Link href="/admin/articles" className="inline-flex items-center text-sm text-muted-foreground hover:text-navy mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Articles
        </Link>
        <h1 className="font-display text-4xl text-navy">New Article</h1>
      </div>
      <ArticleForm />
    </div>
  );
}
