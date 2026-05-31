import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

export async function GET(request: Request, { params }: { params: Promise<{ name: string }> } ) {
  const { name } = await params;
  const filePath = path.join(process.cwd(), 'uploads', name);

  try {
    const file = await readFile(filePath);
    const ext = path.extname(name).toLowerCase();
    const mime: Record<string, string> = {
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.gif': 'image/gif',
      '.webp': 'image/webp',
      '.svg': 'image/svg+xml',
    };
    const contentType = mime[ext] || 'application/octet-stream';

    return new NextResponse(file, {
      headers: { 'Content-Type': contentType, 'Cache-Control': 'public, max-age=31536000, immutable' },
    });
  } catch {
    return new NextResponse('Not found', { status: 404 });
  }
}
