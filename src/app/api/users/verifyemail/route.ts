import { NextRequest, NextResponse } from "next/server";
import User from "@/src/models/userModel";
import { connect } from "@/src/dbConfig/dbConfig";

export async function POST(req: NextRequest) {
    try {
        await connect();

        const { token } = await req.json();

        if (!token) {
            return NextResponse.json(
                { error: "Token is required" },
                { status: 400 }
            );
        }

        const user = await User.findOne({
            verifyToken: token,
            verifyTokenExpiry: { $gt: new Date() },
        });

        if (!user) {
            return NextResponse.json(
                { error: "Invalid or expired token" },
                { status: 400 }
            );
        }
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        await user.save();

        return NextResponse.json(
            {
                success: true,
                message: "Email verified successfully",
            },
            { status: 200 }
        );
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something went wrong";

        return NextResponse.json(
            { error: message },
            { status: 500 }
        );
    }
}