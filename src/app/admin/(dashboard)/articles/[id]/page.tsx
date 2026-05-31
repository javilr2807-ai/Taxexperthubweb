import { ArticleForm } from '@/components/admin/ArticleForm';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const article = await prisma.article.findUnique({
    where: { id },
  });

  if (!article) {
    notFound();
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <Link href="/admin/articles" className="inline-flex items-center text-sm text-muted-foreground hover:text-navy mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Articles
        </Link>
        <h1 className="font-display text-4xl text-navy">Edit Article</h1>
      </div>
      <ArticleForm article={article} />
    </div>
  );
}
