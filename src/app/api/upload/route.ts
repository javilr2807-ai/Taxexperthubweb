import { NextResponse } from 'next/server';
import { assertAdmin } from '@/lib/auth';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';

const MAX_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

export async function POST(request: Request) {
  try {
    await assertAdmin();
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get('file') as File | null;

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: 'File too large (max 10MB)' }, { status: 413 });
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadsDir = path.resolve(process.cwd(), 'uploads');
  await mkdir(uploadsDir, { recursive: true });

  const ext = path.extname(file.name) || '';
  const uniqueName = `${randomUUID()}${ext}`;
  const filePath = path.join(uploadsDir, uniqueName);

  if (!filePath.startsWith(uploadsDir + path.sep)) {
    return NextResponse.json({ error: 'Invalid filename' }, { status: 400 });
  }

  await writeFile(filePath, buffer);

  return NextResponse.json({ url: `/api/uploads/${uniqueName}` });
}
