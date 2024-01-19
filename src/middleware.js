import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
    const path = request.nextUrl.pathname

    const isPublicPath = path === "/GetAccess"

    const token = request.cookies.get('authtoken')?.value || ''

    if (isPublicPath && data.id) {
        return NextResponse.redirect(new URL('/', request.nextUrl))
    }

    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/GetAccess', request.nextUrl))
    }

}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/admin/:path*',
    ],
}