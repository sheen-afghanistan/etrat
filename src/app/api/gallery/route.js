import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Gallery from "@/models/Gallery";

export const dynamic = "force-dynamic";

export async function GET() {
    await dbConnect();
    try {
        const images = await Gallery.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: images });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

export async function POST(request) {
    await dbConnect();
    try {
        const body = await request.json();
        const image = await Gallery.create(body);
        return NextResponse.json({ success: true, data: image }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
