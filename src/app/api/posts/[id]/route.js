import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Post from "@/models/Post";

export async function GET(request, { params }) {
    await dbConnect();
    const { id } = await params;

    try {
        const post = await Post.findById(id);
        if (!post) {
            return NextResponse.json({ success: false, error: "Post not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: post });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

export async function DELETE(request, { params }) {
    await dbConnect();
    const { id } = await params;

    try {
        const deletedPost = await Post.findByIdAndDelete(id);
        if (!deletedPost) {
            return NextResponse.json({ success: false, error: "Post not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: {} });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
