'use server';

import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { assertAdmin } from '@/lib/auth';
import { sanitizeHtml } from '@/lib/sanitize';
import { z } from 'zod';

const ArticleSchema = z.object({
  title: z.string().min(1).max(200),
  slug: z.string().min(1).max(200),
  category: z.enum([
    'personal-income-tax',
    'freelancer-small-business',
    'crypto-investment',
    'tax-relief-audits',
  ]),
  excerpt: z.string().max(500).optional().default(''),
  imageUrl: z.string().optional().default(''),
  content: z.string().min(1),
  published: z.boolean(),
  publishDate: z.coerce.date(),
});

export async function saveArticle(formData: FormData) {
  await assertAdmin();

  const raw = {
    title: formData.get('title') as string,
    slug: formData.get('slug') as string,
    category: formData.get('category') as string,
    excerpt: (formData.get('excerpt') as string) || '',
    imageUrl: (formData.get('imageUrl') as string) || '',
    content: formData.get('content') as string,
    published: formData.get('published') === 'true',
    publishDate: formData.get('publishDate') as string || new Date().toISOString(),
  };

  const parsed = ArticleSchema.parse(raw);
  parsed.content = sanitizeHtml(parsed.content);

  const id = formData.get('id') as string | null;

  if (id) {
    await prisma.article.update({
      where: { id },
      data: parsed,
    });
  } else {
    await prisma.article.create({
      data: parsed,
    });
  }

  revalidatePath('/admin/articles');
  revalidatePath('/');
  revalidatePath(`/${parsed.category}`);
  revalidatePath(`/${parsed.category}/${parsed.slug}`);
  redirect('/admin/articles');
}

export async function toggleArticle(formData: FormData) {
  await assertAdmin();

  const id = formData.get('id') as string;
  if (!id) throw new Error('Missing article id');

  const article = await prisma.article.findUnique({ where: { id } });
  if (!article) throw new Error('Article not found');

  await prisma.article.update({
    where: { id },
    data: { published: !article.published },
  });

  revalidatePath('/admin/articles');
  revalidatePath('/');
  revalidatePath(`/${article.category}`);
  revalidatePath(`/${article.category}/${article.slug}`);
}

export async function deleteArticleInline(formData: FormData) {
  await assertAdmin();

  const id = formData.get('id') as string;
  if (!id) return;

  const article = await prisma.article.findUnique({ where: { id } });
  if (!article) return;

  await prisma.article.delete({ where: { id } });

  revalidatePath('/admin/articles');
  if (article.published) {
    revalidatePath('/');
    revalidatePath(`/${article.category}`);
  }
  revalidatePath(`/${article.category}/${article.slug}`);
}

export async function deleteArticle(id: string) {
  await assertAdmin();

  await prisma.article.delete({
    where: { id },
  });
  revalidatePath('/admin/articles');
  redirect('/admin/articles');
}
