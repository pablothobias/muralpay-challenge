import { NextResponse, type NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const isAuthenticated = req.cookies.get('user.isAuthenticated');

  const { pathname } = req.nextUrl;

  if (!isAuthenticated && pathname !== '/register') {
    return NextResponse.redirect(new URL('/register', req.url));
  }

  if (isAuthenticated && pathname === '/') {
    return NextResponse.redirect(new URL('/home', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/'],
};
