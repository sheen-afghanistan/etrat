import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";

export const dynamic = "force-dynamic";

export async function GET() {
    await dbConnect();

    try {
        const users = await User.find({}).select("-password").sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: users });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
