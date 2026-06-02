import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

const API_SECRET = process.env.UPDATE_API_SECRET;

export async function POST(request: NextRequest) {
  const auth = request.headers.get('authorization');
  if (!API_SECRET || auth !== `Bearer ${API_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { articles: updates } = await request.json();

    if (!Array.isArray(updates)) {
      return NextResponse.json({ error: 'Expected { articles: [...] }' }, { status: 400 });
    }

    const results: { slug: string; status: string; error?: string }[] = [];

    for (const update of updates) {
      const { slug, content } = update;
      if (!slug || typeof content !== 'string') {
        results.push({ slug: slug || '?', status: 'skipped', error: 'Missing slug or content' });
        continue;
      }

      try {
        const article = await prisma.article.findUnique({ where: { slug } });
        if (!article) {
          results.push({ slug, status: 'not_found' });
          continue;
        }

        await prisma.article.update({
          where: { slug },
          data: { content },
        });

        results.push({ slug, status: 'ok' });
      } catch (e) {
        results.push({ slug, status: 'error', error: String(e) });
      }
    }

    return NextResponse.json({ ok: true, results });
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }
}
