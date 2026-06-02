import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

export async function GET(request: Request, { params }: { params: Promise<{ name: string }> } ) {
  const { name } = await params;
  const decodedName = decodeURIComponent(name);

  const uploadsDir = path.resolve(process.cwd(), 'uploads');
  const resolvedPath = path.resolve(uploadsDir, decodedName);

  if (!resolvedPath.startsWith(uploadsDir + path.sep)) {
    return new NextResponse('Forbidden', { status: 403 });
  }

  try {
    const file = await readFile(resolvedPath);
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
