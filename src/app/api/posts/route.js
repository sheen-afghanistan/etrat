import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Post from "@/models/Post";

export const dynamic = "force-dynamic";

export async function GET() {
    await dbConnect();

    try {
        const posts = await Post.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: posts });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

export async function POST(request) {
    await dbConnect();

    try {
        let body;
        try {
            body = await request.json();
        } catch (err) {
            return NextResponse.json({ success: false, error: "Invalid JSON body" }, { status: 400 });
        }

        const required = ["title", "content", "excerpt", "category"];
        const missing = required.filter((f) => !body[f] || (typeof body[f] === "string" && body[f].trim() === ""));
        if (missing.length) {
            return NextResponse.json({ success: false, error: `Missing required fields: ${missing.join(", ")}` }, { status: 400 });
        }

        const post = await Post.create(body);
        return NextResponse.json({ success: true, data: post }, { status: 201 });
    } catch (error) {
        console.error("POST /api/posts error:", error);
        if (error.name === "ValidationError") {
            const messages = Object.values(error.errors).map((e) => e.message).join(" | ");
            return NextResponse.json({ success: false, error: messages }, { status: 422 });
        }

        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
