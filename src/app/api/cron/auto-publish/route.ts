import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateArticleContent } from '@/lib/deepseek';
import { revalidatePath } from 'next/cache';

// This function can run for up to 5 minutes on Vercel Pro/Docker, allowing DeepSeek enough time to generate 2000 words.
export const maxDuration = 300; 

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    const secret = process.env.CRON_SECRET || process.env.UPDATE_API_SECRET;
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

    // 3. We decided to publish this hour! Pick a random minute between 0 and 59.
    const randomMinute = Math.floor(Math.random() * 60);
    const delayMs = randomMinute * 60 * 1000;

    // 4. Find an unpublished draft immediately so we know if we have work to do
    const draft = await prisma.article.findFirst({
      where: {
        published: false,
      },
      orderBy: {
        publishDate: 'asc' // Pick the oldest draft first
      }
    });

    if (!draft) {
      await prisma.cronLog.create({
        data: {
          status: 'ERROR',
          message: 'Fallo al publicar: No quedan borradores vacíos en la base de datos.',
        }
      });
      return NextResponse.json({ message: 'Skipped: No empty drafts available to publish.' });
    }

    // 5. Schedule the publication in the background
    // Since this runs on a VPS (Node.js), setTimeout will keep running after the response is sent.
    setTimeout(async () => {
      try {
        console.log(`[Auto-Publish] Starting background generation for article ID: ${draft.id}`);
        const htmlContent = await generateArticleContent(draft.title, draft.excerpt || '');
        
        // Basic check if DeepSeek failed or returned empty
        if (!htmlContent || htmlContent.length < 100) {
           throw new Error('DeepSeek devolvió un contenido vacío o demasiado corto.');
        }

        const cleanHtml = htmlContent.replace(/^```html\n?/, '').replace(/```$/, '').trim();

        await prisma.article.update({
          where: { id: draft.id },
          data: {
            content: cleanHtml,
            published: true,
            publishDate: new Date(), // Set publish date to the exact random time
          }
        });

        // Log success
        await prisma.cronLog.create({
          data: {
            status: 'SUCCESS',
            message: `Publicado exitosamente a las ${new Date().toLocaleTimeString('es-ES')}.`,
            articleId: draft.id,
          }
        });

        revalidatePath('/');
        revalidatePath('/admin/articles');
        revalidatePath(`/${draft.category}`);
        revalidatePath(`/${draft.category}/${draft.slug}`);
        console.log(`[Auto-Publish] Successfully published: ${draft.title}`);
      } catch (err: any) {
        console.error('[Auto-Publish] Background task failed:', err);
        // Log error
        await prisma.cronLog.create({
          data: {
            status: 'ERROR',
            message: `Error de DeepSeek o Base de Datos: ${err.message || 'Error desconocido'}`,
            articleId: draft.id,
          }
        });
      }
    }, delayMs);

    return NextResponse.json({ 
      message: `Success: Article will be published in ${randomMinute} minutes to ensure a random timestamp.`,
      articleId: draft.id,
      title: draft.title,
      scheduledMinute: randomMinute
    });

  } catch (error: any) {
    console.error('CRON Auto-Publish Error:', error);
    await prisma.cronLog.create({
      data: {
        status: 'ERROR',
        message: `Error interno de la ruta API: ${error.message || 'Error desconocido'}`,
      }
    });
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
