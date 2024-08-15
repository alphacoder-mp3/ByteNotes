import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSession } from '@/lib/session';

export function middleware(request: NextRequest) {
  const session = getSession();
  if (session && request.nextUrl.pathname.startsWith('/signup')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (session && request.nextUrl.pathname.startsWith('/signin')) {
    return NextResponse.rewrite(new URL('/', request.url));
  }

  if (!session && !request.nextUrl.pathname.startsWith('/signup')) {
    return NextResponse.rewrite(new URL('/signin', request.url));
  }
}
export const config = {
  matcher: ['/', '/profile', '/signin', '/signup'],
};
