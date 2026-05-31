import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Protect all /admin/articles paths
  if (path.startsWith('/admin/articles')) {
    const session = request.cookies.get('admin_session')?.value;
    
    if (session !== 'authenticated') {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  // Redirect /admin to /admin/articles if already logged in
  if (path === '/admin') {
    const session = request.cookies.get('admin_session')?.value;
    if (session === 'authenticated') {
      return NextResponse.redirect(new URL('/admin/articles', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
