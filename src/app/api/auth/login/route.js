import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { signToken } from "@/lib/auth";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

export const dynamic = "force-dynamic";

export async function POST(request) {
    try {
        const { username, password } = await request.json();

        await dbConnect();

        const user = await User.findOne({ username });

        if (!user) {
            const count = await User.countDocuments();
            if (count === 0 && username === "admin" && password === "admin") {
                const hashedPassword = await bcrypt.hash("admin", 10);
                await User.create({
                    username: "admin",
                    password: hashedPassword,
                    role: "admin"
                });
            }
        }

        const foundUser = await User.findOne({ username });

        if (!foundUser) {
            return NextResponse.json(
                { error: "نام کاربری یا رمز عبور اشتباه است." },
                { status: 401 }
            );
        }

        const isMatch = await bcrypt.compare(password, foundUser.password);

        if (!isMatch) {
            return NextResponse.json(
                { error: "نام کاربری یا رمز عبور اشتباه است." },
                { status: 401 }
            );
        }

        const token = signToken({ username: foundUser.username, role: foundUser.role });
        const cookieStore = await cookies();

        cookieStore.set("admin_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24, // 1 day
            path: "/",
        });

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error("Login Error:", error);
        return NextResponse.json(
            { error: "خطای سرور" },
            { status: 500 }
        );
    }
}
