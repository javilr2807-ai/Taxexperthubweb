import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function assertAdmin() {
  const c = await cookies();
  if (c.get('admin_session')?.value !== 'authenticated') {
    throw new Error('Unauthorized');
  }
}

export async function assertAdminOrRedirect() {
  const c = await cookies();
  if (c.get('admin_session')?.value !== 'authenticated') {
    redirect('/admin');
  }
}
