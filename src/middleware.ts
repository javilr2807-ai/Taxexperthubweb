import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  const session = request.cookies.get('admin_session')?.value;

  // Redirect /admin to /admin/articles if already logged in
  if (path === '/admin') {
    if (session === 'authenticated') {
      return NextResponse.redirect(new URL('/admin/articles', request.url));
    }
    return NextResponse.next();
  }

  // Protect all other /admin routes
  if (session !== 'authenticated') {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
