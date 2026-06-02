'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { randomUUID } from 'crypto';

export async function login(prevState: any, formData: FormData) {
  const password = formData.get('password');

  if (password === process.env.ADMIN_PASSWORD) {
    const cookieStore = await cookies();
    const sessionId = randomUUID();
    cookieStore.set('admin_session', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });
  } else {
    return { error: 'Invalid password' };
  }

  redirect('/admin/articles');
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
  redirect('/admin');
}
