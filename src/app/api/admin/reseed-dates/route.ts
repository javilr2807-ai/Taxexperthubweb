import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

const API_SECRET = process.env.UPDATE_API_SECRET;

export async function POST(request: NextRequest) {
  const auth = request.headers.get('authorization');
  if (!API_SECRET || auth !== `Bearer ${API_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const categories = [
      'personal-income-tax',
      'freelancer-small-business',
      'crypto-investment',
      'tax-relief-audits',
    ] as const;

    const groups: { slug: string; title: string }[][] = [];
    for (const cat of categories) {
      const arts = await prisma.article.findMany({
        where: { category: cat },
        orderBy: { publishDate: 'asc' },
        select: { slug: true, title: true },
      });
      groups.push(arts);
    }

    const maxLen = Math.max(...groups.map(g => g.length));
    const interleaved: { slug: string }[] = [];
    for (let i = 0; i < maxLen; i++) {
      for (let g = 0; g < groups.length; g++) {
        if (i < groups[g].length) {
          interleaved.push(groups[g][i]);
        }
      }
    }

    const total = interleaved.length;
    const startDate = new Date('2026-01-01T12:00:00Z').getTime();
    const endDate = new Date('2026-10-01T12:00:00Z').getTime();
    const interval = (endDate - startDate) / (total - 1);

    const updated: { slug: string; date: string }[] = [];
    for (let i = 0; i < interleaved.length; i++) {
      const date = new Date(startDate + interval * i);
      await prisma.article.update({
        where: { slug: interleaved[i].slug },
        data: { publishDate: date },
      });
      updated.push({ slug: interleaved[i].slug, date: date.toISOString().split('T')[0] });
    }

    return NextResponse.json({ ok: true, total: updated.length, articles: updated });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
