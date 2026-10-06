import {NextRequest, NextResponse} from 'next/server';

export function proxy(request: NextRequest) {
 const {pathname} = request.nextUrl;
 // An exact public support URL that returns HTML with HTTP 200, not a redirect.
 if (pathname === '/support' || pathname === '/support/') {
  const destination = new URL(request.url); destination.pathname = '/ar/support/';
  return NextResponse.rewrite(destination);
 }
 // Preserve the existing trailing-slash convention for localized pages.
 if (!pathname.endsWith('/')) {
  const destination = new URL(request.url); destination.pathname += '/';
  return NextResponse.redirect(destination,308);
 }
 return NextResponse.next();
}
export const config = {matcher:['/support','/support/','/ar/:path*','/en/:path*']};
