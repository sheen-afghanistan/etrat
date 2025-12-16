import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Donation from "@/models/Donation";

export const dynamic = "force-dynamic";

export async function GET() {
    await dbConnect();

    try {
        const donations = await Donation.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: donations });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

export async function POST(request) {
    await dbConnect();

    try {
        const body = await request.json();
        const donation = await Donation.create(body);
        return NextResponse.json({ success: true, data: donation }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
