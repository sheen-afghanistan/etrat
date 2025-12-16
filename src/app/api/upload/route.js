import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
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
        const filename = Date.now() + "_" + file.name.replaceAll(" ", "_");

        // Save to public/uploads
        const uploadDir = path.join(process.cwd(), "public/uploads");
        await writeFile(path.join(uploadDir, filename), buffer);

        return NextResponse.json({
            success: true,
            url: `/uploads/${filename}`
        });
    } catch (error) {
        console.error("Upload Error:", error);
        return NextResponse.json({ error: "Upload failed." }, { status: 500 });
    }
}
