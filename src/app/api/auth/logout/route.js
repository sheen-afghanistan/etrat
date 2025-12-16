import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function GET(request) {
    const cookieStore = await cookies();
    cookieStore.delete("admin_token");
    return NextResponse.redirect(new URL("/admin/login", request.url));
}
