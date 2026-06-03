import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateArticleContent } from '@/lib/deepseek';
import { revalidatePath } from 'next/cache';

// This function can run for up to 5 minutes on Vercel Pro/Docker, allowing DeepSeek enough time to generate 2000 words.
export const maxDuration = 300; 

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    const secret = process.env.CRON_SECRET;
    
    if (!secret || authHeader !== `Bearer ${secret}`) {
      // Return 401 but generic message to prevent probing
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 1. Check if we already published an article today
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    const alreadyPublishedToday = await prisma.article.findFirst({
      where: {
        published: true,
        publishDate: {
          gte: startOfDay,
        }
      }
    });

    if (alreadyPublishedToday) {
      return NextResponse.json({ message: 'Skipped: An article was already published today.' });
    }

    // 2. Random Time Logic
    // We run this cron every hour. To make the publish time random, we use a probability formula.
    const currentHour = now.getHours(); // 0 to 23
    
    // If it's the last hour of the day (11 PM), we force it to 100% chance to ensure it publishes.
    // Otherwise, probability is 1 divided by remaining hours.
    const remainingHours = 24 - currentHour;
    const publishChance = 1 / remainingHours;
    
    const randomRoll = Math.random();
    
    if (randomRoll > publishChance && currentHour < 23) {
      return NextResponse.json({ 
        message: 'Skipped: Random roll failed. Will try again next hour.',
        chance: publishChance,
        roll: randomRoll
      });
    }

    // 3. Find an unpublished draft
    const draft = await prisma.article.findFirst({
      where: {
        published: false,
        content: '', // Ensure we don't overwrite a draft the admin is currently writing
      },
      orderBy: {
        publishDate: 'asc' // Pick the oldest draft first
      }
    });

    if (!draft) {
      return NextResponse.json({ message: 'Skipped: No empty drafts available to publish.' });
    }

    // 4. Generate the content using DeepSeek
    const htmlContent = await generateArticleContent(draft.title, draft.excerpt || '');
    
    // Clean up potential markdown formatting blocks returned by the LLM
    const cleanHtml = htmlContent.replace(/^```html\n?/, '').replace(/```$/, '').trim();

    // 5. Update database
    await prisma.article.update({
      where: { id: draft.id },
      data: {
        content: cleanHtml,
        published: true,
        publishDate: new Date(), // Set publish date to exactly right now
      }
    });

    // 6. Purge cache
    revalidatePath('/');
    revalidatePath('/admin/articles');
    revalidatePath(`/${draft.category}`);
    revalidatePath(`/${draft.category}/${draft.slug}`);

    return NextResponse.json({ 
      message: 'Successfully generated and published article!',
      articleId: draft.id,
      title: draft.title
    });

  } catch (error: any) {
    console.error('CRON Auto-Publish Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
