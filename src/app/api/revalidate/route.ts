import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { secret, paths } = body;
    const envSecret = process.env.CRON_SECRET || process.env.UPDATE_API_SECRET;
    
    if (!envSecret || secret !== envSecret) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (Array.isArray(paths)) {
      paths.forEach((p: string) => {
        revalidatePath(p);
      });
      console.log('[Revalidate API] Successfully revalidated paths:', paths);
    }

    return NextResponse.json({ revalidated: true, paths });
  } catch (error: any) {
    console.error('[Revalidate API] Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
