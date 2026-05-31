'use client';

import { useActionState } from 'react';
import { saveArticle, deleteArticle } from '@/app/admin/article-actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Save, Trash, Image as ImageIcon } from 'lucide-react';

export function ArticleForm({ article }: { article?: any }) {
  const [isPending, startTransition] = useActionState(async (state: any, formData: FormData) => {
    await saveArticle(formData);
  }, null);

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this article?')) {
      await deleteArticle(article.id);
    }
  };

  return (
    <form action={(formData) => startTransition(formData)}>
      {article?.id && <input type="hidden" name="id" value={article.id} />}
      
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="font-display text-2xl text-navy">Content</CardTitle>
              <CardDescription>Write your article content here.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" defaultValue={article?.title} required className="text-lg font-medium" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Body Content (HTML/Text)</Label>
                <Textarea 
                  id="content" 
                  name="content" 
                  defaultValue={article?.content} 
                  required 
                  className="min-h-[400px] font-mono text-sm"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="font-display text-2xl text-navy">Media</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="imageUrl">Featured Image URL</Label>
                <div className="flex gap-2">
                  <Input 
                    id="imageUrl" 
                    name="imageUrl" 
                    defaultValue={article?.imageUrl} 
                    placeholder="https://... or /uploads/image.jpg" 
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  To use the volume, upload files directly to the server and reference them as <code>/uploads/filename.ext</code>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="font-display text-xl text-navy">Publishing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="published">Status</Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Draft</span>
                  <Switch id="published" name="published" value="true" defaultChecked={article?.published} />
                  <span className="text-sm text-navy font-medium">Published</span>
                </div>
              </div>

              <div className="space-y-2 pt-4">
                <Label htmlFor="publishDate">Publish Date</Label>
                <Input 
                  id="publishDate" 
                  name="publishDate" 
                  type="datetime-local" 
                  defaultValue={article?.publishDate ? new Date(article.publishDate).toISOString().slice(0, 16) : new Date().toISOString().slice(0, 16)} 
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="font-display text-xl text-navy">Meta & SEO</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="slug">URL Slug</Label>
                <Input id="slug" name="slug" defaultValue={article?.slug} required placeholder="my-awesome-article" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select name="category" defaultValue={article?.category || 'personal-income-tax'}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="personal-income-tax">Personal Income Tax</SelectItem>
                    <SelectItem value="freelancer-small-business">Freelancer & Small Biz</SelectItem>
                    <SelectItem value="crypto-investment">Crypto & Investments</SelectItem>
                    <SelectItem value="tax-relief-audits">Tax Relief & Audits</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">SEO Excerpt</Label>
                <Textarea id="excerpt" name="excerpt" defaultValue={article?.excerpt} className="h-24" />
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button type="submit" className="flex-1 bg-navy text-paper hover:bg-navy-soft" disabled={isPending as unknown as boolean}>
              <Save className="mr-2 h-4 w-4" /> Save Article
            </Button>
            {article?.id && (
              <Button type="button" variant="destructive" onClick={handleDelete}>
                <Trash className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
