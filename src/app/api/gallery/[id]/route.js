import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Gallery from "@/models/Gallery";

export const dynamic = "force-dynamic";

export async function DELETE(request, { params }) {
    await dbConnect();
    const { id } = await params;

    try {
        const deletedImage = await Gallery.deleteOne({ _id: id });
        if (!deletedImage) {
            return NextResponse.json({ success: false, error: "Image not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: {} });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
