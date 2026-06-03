import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import fs from 'fs';
import path from 'path';
import { revalidatePath } from 'next/cache';

export async function GET() {
  try {
    const dataDir = path.join(process.cwd(), 'src', 'data', 'articles');
    
    // Fallback if directory doesn't exist
    if (!fs.existsSync(dataDir)) {
      return NextResponse.json({ error: 'Articles directory not found' }, { status: 404 });
    }

    const files = fs.readdirSync(dataDir);
    const results = [];

    for (const file of files) {
      if (file.endsWith('.html')) {
        const slug = file.replace('.html', '');
        const content = fs.readFileSync(path.join(dataDir, file), 'utf8');

        // Check if article exists
        const article = await prisma.article.findFirst({ where: { slug } });
        
        if (article) {
          await prisma.article.update({
            where: { id: article.id },
            data: { content },
          });
          
          // Revalidate the specific article path
          revalidatePath(`/${article.category}/${article.slug}`);
          results.push(`Updated ${slug}`);
        } else {
          results.push(`Not found in DB: ${slug}`);
        }
      }
    }

    revalidatePath('/');
    revalidatePath('/admin/articles');
    revalidatePath('/crypto-investment');
    revalidatePath('/personal-income-tax');

    return NextResponse.json({ message: 'Content update completed successfully', results });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
