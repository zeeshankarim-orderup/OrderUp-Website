import {NextRequest, NextResponse} from 'next/server';

export function proxy(request: NextRequest) {
 const {pathname} = request.nextUrl;
 if(pathname==='/download'||pathname==='/download/'){return NextResponse.redirect(new URL('/ar/?app=customer',request.url));}
 // An exact public support URL that returns HTML with HTTP 200, not a redirect.
 if (['/support','/support/','/captain','/captain/','/download','/download/'].includes(pathname)) {
  const destination = new URL(request.url); destination.pathname = `/ar/${pathname.split('/')[1]}/`;
  return NextResponse.rewrite(destination);
 }
 // Preserve the existing trailing-slash convention for localized pages.
 if (!pathname.endsWith('/')) {
  const destination = new URL(request.url); destination.pathname += '/';
  return NextResponse.redirect(destination,308);
 }
 return NextResponse.next();
}
export const config = {matcher:['/download','/download/','/captain','/captain/','/support','/support/','/ar/:path*','/en/:path*']};
