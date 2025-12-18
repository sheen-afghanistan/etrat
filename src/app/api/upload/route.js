import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.get("file");

        if (!file) {
            return NextResponse.json({ error: "No file received." }, { status: 400 });
        }

        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(2, 8);
        const originalName = file.name || "upload";
        const fileName = `${timestamp}-${randomString}-${originalName}`;

        const blob = await put(fileName, file, {
            access: 'public',
        });

        return NextResponse.json({
            success: true,
            url: blob.url
        });
    } catch (error) {
        return NextResponse.json({ error: `Upload failed: ${error.message}` }, { status: 500 });
    }
}
