import { NextResponse, type NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const authStorage = req.cookies.get('auth-storage');
  const isAuthenticated = authStorage ? JSON.parse(authStorage.value).state.isAuthenticated : false;
  const { pathname } = req.nextUrl;

  if (!isAuthenticated && pathname === '/') {
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
