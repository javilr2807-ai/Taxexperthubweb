import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('file') as File | null;

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadsDir = path.join(process.cwd(), 'uploads');
  await mkdir(uploadsDir, { recursive: true });

  const safeName = file.name.replace(/\s+/g, '-');
  const uniqueName = `${Date.now()}-${safeName}`;
  const filePath = path.join(uploadsDir, uniqueName);

  await writeFile(filePath, buffer);

  return NextResponse.json({ url: `/api/uploads/${uniqueName}` });
}
