import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const userCookie = request.cookies.get('user')?.value;
    
    if (!userCookie) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    const { role_name } = JSON.parse(userCookie);

    if (role_name === 'level_1' && pathname !== '/') {
        return NextResponse.redirect(new URL('/', request.url));
    }

    if (role_name === 'admin') {
        return NextResponse.next();
    }

    return NextResponse.redirect(new URL('/403', request.url));
}

export const config = {
    matcher: ['/admin/:path*'],
};
