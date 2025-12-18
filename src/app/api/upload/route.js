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

        const fileName = file.name || `upload-${Date.now()}`;

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
