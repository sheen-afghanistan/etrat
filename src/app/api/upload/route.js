import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

export async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.get("file");

        if (!file) {
            return NextResponse.json({ error: "No file received." }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const base64 = buffer.toString("base64");
        const mimeType = file.type || "image/jpeg"; // Default to jpeg if type is missing
        const dataUri = `data:${mimeType};base64,${base64}`;

        return NextResponse.json({
            success: true,
            url: dataUri
        });
    } catch (error) {
        console.error("Upload Error:", error);
        return NextResponse.json({ error: `Upload failed: ${error.message}` }, { status: 500 });
    }
}
