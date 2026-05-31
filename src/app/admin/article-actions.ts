'use server';

import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function saveArticle(formData: FormData) {
  const id = formData.get('id') as string | null;
  const title = formData.get('title') as string;
  const slug = formData.get('slug') as string;
  const category = formData.get('category') as string;
  const excerpt = formData.get('excerpt') as string;
  const imageUrl = formData.get('imageUrl') as string;
  const content = formData.get('content') as string;
  const published = formData.get('published') === 'true';
  const publishDate = new Date(formData.get('publishDate') as string || new Date());

  const data = {
    title,
    slug,
    category,
    excerpt,
    imageUrl,
    content,
    published,
    publishDate,
  };

  if (id) {
    await prisma.article.update({
      where: { id },
      data,
    });
  } else {
    await prisma.article.create({
      data,
    });
  }

  revalidatePath('/admin/articles');
  revalidatePath('/');
  revalidatePath(`/${category}`);
  redirect('/admin/articles');
}

export async function toggleArticle(formData: FormData) {
  const id = formData.get('id') as string;
  const article = await prisma.article.findUnique({ where: { id } });
  if (!article) throw new Error('Article not found');

  await prisma.article.update({
    where: { id },
    data: { published: !article.published },
  });

  revalidatePath('/admin/articles');
  revalidatePath('/');
  revalidatePath(`/${article.category}`);
}

export async function deleteArticleInline(formData: FormData) {
  const id = formData.get('id') as string;
  const article = await prisma.article.findUnique({ where: { id } });

  if (!article) return;

  await prisma.article.delete({ where: { id } });

  revalidatePath('/admin/articles');
  if (article.published) {
    revalidatePath('/');
    revalidatePath(`/${article.category}`);
  }
}

export async function deleteArticle(id: string) {
  await prisma.article.delete({
    where: { id },
  });
  revalidatePath('/admin/articles');
  redirect('/admin/articles');
}
