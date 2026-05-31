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
import { PlusCircle, Edit } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default async function AdminArticlesPage() {
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: 'desc' },
  });

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

      <div className="rounded-md border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {articles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                  No articles found. Create your first one.
                </TableCell>
              </TableRow>
            ) : (
              articles.map((article) => (
                <TableRow key={article.id}>
                  <TableCell className="font-medium text-navy">
                    {article.title}
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground capitalize">
                      {article.category.replace('-', ' ')}
                    </span>
                  </TableCell>
                  <TableCell>
                    {article.published ? (
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">Published</Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-secondary text-muted-foreground">Draft</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Link href={`/admin/articles/${article.id}`}>
                      <Button variant="ghost" size="sm" className="text-navy hover:text-brass">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
