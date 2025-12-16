import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Teacher from "@/models/Teacher";

export const dynamic = "force-dynamic";

export async function DELETE(request, { params }) {
    await dbConnect();
    const { id } = await params;

    try {
        const deleted = await Teacher.deleteOne({ _id: id });
        if (!deleted) {
            return NextResponse.json({ success: false, error: "Teacher not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: {} });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
