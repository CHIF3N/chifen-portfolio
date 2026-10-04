import { NextRequest, NextResponse } from 'next/server';
import { isValidToken, COOKIE_NAME } from '@/lib/auth';

/**
 * Middleware — protects all /admin/* and /api/admin/* routes.
 * Uses Web Crypto API (HMAC-SHA-256) — fully compatible with Edge runtime.
 * Unauthenticated page requests are redirected to /login.
 * Unauthenticated API requests receive a 401 JSON response.
 */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Always allow: login page, auth API, Next.js internals, static files
  if (
    pathname === '/login' ||
    pathname.startsWith('/api/auth/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/favicon')
  ) {
    return NextResponse.next();
  }

  const token = req.cookies.get(COOKIE_NAME)?.value;

  if (!(await isValidToken(token))) {
    if (pathname.startsWith('/api/')) {
      return NextResponse.json(
        { error: 'Unauthorized: Session missing or invalid. Please log in.' },
        { status: 401 }
      );
    }
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = '/login';
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
