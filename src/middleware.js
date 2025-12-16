import { NextResponse } from "next/server";

export function middleware(request) {
    const path = request.nextUrl.pathname;

    // Define paths that require authentication
    if (path.startsWith("/admin")) {
        // Exclude login page and static assets
        if (path === ("/admin/login") || path.includes(".")) {
            return NextResponse.next();
        }

        const token = request.cookies.get("admin_token");

        if (!token) {
            return NextResponse.redirect(new URL("/admin/login", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};
