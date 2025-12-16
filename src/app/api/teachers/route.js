import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Teacher from "@/models/Teacher";

export const dynamic = "force-dynamic";

export async function GET() {
    await dbConnect();
    try {
        const teachers = await Teacher.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: teachers });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

export async function POST(request) {
    await dbConnect();
    try {
        const body = await request.json();
        const teacher = await Teacher.create(body);
        return NextResponse.json({ success: true, data: teacher }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
