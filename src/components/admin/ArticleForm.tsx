'use client';

import { useRef, useState, useCallback } from 'react';
import { useFormStatus } from 'react-dom';
import { saveArticle, deleteArticle } from '@/app/admin/article-actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Save, Trash, Upload, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="bg-navy text-paper hover:bg-navy-soft" disabled={pending}>
      <Save className="mr-2 h-4 w-4" /> {pending ? 'Saving...' : 'Save Article'}
    </Button>
  );
}

export function ArticleForm({ article }: { article?: any }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const slugRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const [uploading, setUploading] = useState(false);
  const [coverUploading, setCoverUploading] = useState(false);
  const categoryMap: Record<string, string> = {
    'personal-income-tax': 'personal-income-tax',
    'freelancer-small-business': 'freelancer-small-business',
    'crypto-investment': 'crypto-investment',
    'tax-relief-audits': 'tax-relief-audits',
    'Personal Income Tax': 'personal-income-tax',
    'Freelancer & Small Business': 'freelancer-small-business',
    'Crypto & Investments': 'crypto-investment',
    'Crypto & Investment Tax': 'crypto-investment',
    'Tax Relief & Audits': 'tax-relief-audits',
  };
  const [imageUrl, setImageUrl] = useState(article?.imageUrl || '');
  const [published, setPublished] = useState(article?.published || false);

  const generateSlug = useCallback(() => {
    const titleInput = document.getElementById('title') as HTMLInputElement;
    if (titleInput && slugRef.current) {
      slugRef.current.value = slugify(titleInput.value);
    }
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, isCover: boolean) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const setLoading = isCover ? setCoverUploading : setUploading;
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.url) {
        if (isCover) {
          setImageUrl(data.url);
        } else if (contentRef.current) {
          const ta = contentRef.current;
          const start = ta.selectionStart;
          const end = ta.selectionEnd;
          const before = ta.value.substring(0, start);
          const after = ta.value.substring(end);
          ta.value = `${before}![](${data.url})${after}`;
          ta.selectionStart = ta.selectionEnd = start + data.url.length + 4;
        }
        toast.success('Image uploaded');
      } else {
        toast.error(data.error || 'Upload failed');
      }
    } catch {
      toast.error('Upload failed');
    } finally {
      setLoading(false);
      if (isCover ? coverInputRef.current : fileInputRef.current) {
        (isCover ? coverInputRef : fileInputRef).current!.value = '';
      }
    }
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this article?')) {
      await deleteArticle(article.id);
    }
  };

  return (
    <form action={saveArticle} className="max-w-3xl mx-auto">
      {article?.id && <input type="hidden" name="id" value={article.id} />}
      <input type="hidden" name="published" value={published ? 'true' : 'false'} />

      <div className="rounded-xl border border-border bg-card p-8 space-y-6">

      <div className="space-y-2">
        <Label htmlFor="title">Article Title</Label>
        <Input id="title" name="title" defaultValue={article?.title} required placeholder="Enter article title" className="text-lg font-medium" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select name="category" defaultValue={categoryMap[article?.category] || 'personal-income-tax'}>
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="personal-income-tax">Personal Income Tax</SelectItem>
            <SelectItem value="freelancer-small-business">Freelancer & Small Business</SelectItem>
            <SelectItem value="crypto-investment">Crypto & Investments</SelectItem>
            <SelectItem value="tax-relief-audits">Tax Relief & Audits</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="slug">URL Slug</Label>
        <div className="flex gap-2">
          <Input id="slug" name="slug" ref={slugRef} defaultValue={article?.slug} required placeholder="my-awesome-article" className="flex-1" />
          <Button type="button" variant="outline" size="sm" onClick={generateSlug} className="shrink-0 text-xs">
            Generate from title
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="imageUrl">Cover Image URL</Label>
        <div className="flex gap-2">
          <Input
            id="imageUrl"
            name="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://..."
            className="flex-1"
          />
          <input
            ref={coverInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleImageUpload(e, true)}
          />
          <Button
            type="button"
            onClick={() => coverInputRef.current?.click()}
            disabled={coverUploading}
            className="bg-blue-600 text-white hover:bg-blue-700 shrink-0"
          >
            <Upload className="mr-2 h-4 w-4" />
            {coverUploading ? '...' : 'Upload'}
          </Button>
        </div>
        {imageUrl && (
          <div className="mt-2 rounded-md overflow-hidden border border-border max-h-48">
            <img src={imageUrl} alt="Cover preview" className="w-full object-cover" />
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">Excerpt (2-3 sentences for cards)</Label>
        <Textarea id="excerpt" name="excerpt" defaultValue={article?.excerpt} rows={3} placeholder="Brief summary for article cards..." />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="content">Full Article Content (Markdown Supported)</Label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleImageUpload(e, false)}
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
          >
            <ImageIcon className="mr-2 h-3 w-3" />
            {uploading ? '...' : 'Insert Image'}
          </Button>
        </div>
        <Textarea
          id="content"
          name="content"
          ref={contentRef}
          defaultValue={article?.content}
          required
          className="min-h-[400px] font-mono text-sm"
          placeholder="Write your article content in Markdown..."
        />
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-border pt-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Draft</span>
            <Switch checked={published} onCheckedChange={setPublished} />
            <span className="text-sm text-navy font-medium">Published (Live)</span>
          </div>
          <div>
            <Input
              id="publishDate"
              name="publishDate"
              type="datetime-local"
              defaultValue={article?.publishDate ? new Date(article.publishDate).toISOString().slice(0, 16) : new Date().toISOString().slice(0, 16)}
              className="w-48"
            />
          </div>
        </div>
        <div className="flex gap-2">
          {article?.id && (
            <Button type="button" variant="destructive" onClick={handleDelete}>
              <Trash className="h-4 w-4" />
            </Button>
          )}
          <SubmitButton />
        </div>
      </div>
      </div>
    </form>
  );
}
