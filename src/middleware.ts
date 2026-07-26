import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Check for a cookie or an auth header
    const authCookie = request.cookies.get('admin_secret')?.value;
    const authHeader = request.headers.get('authorization');
    const secret = process.env.ADMIN_SECRET || 'local-secret';

    const isAuthenticated = authCookie === secret || authHeader === `Bearer ${secret}`;

    if (!isAuthenticated) {
      return new NextResponse('Unauthorized: Invalid Admin Secret', { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
