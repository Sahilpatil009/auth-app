import { connect } from "@/src/dbConfig/dbConfig";
import User from "@/src/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/src/helpers/mailer";

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email } = reqBody;

        if (!email) {
            return NextResponse.json(
                { error: "Email is required" },
                { status: 400 }
            );
        }

        await connect();

        const user = await User.findOne({ email });

        if (!user) {
            // Return success even if user not found to prevent email enumeration
            return NextResponse.json({
                message: "If an account with that email exists, a password reset link has been sent.",
                success: true,
            });
        }

        // Send password reset email
        await sendEmail({
            email: user.email,
            emailType: "RESET",
            userId: user._id.toString(),
        });

        return NextResponse.json({
            message: "If an account with that email exists, a password reset link has been sent.",
            success: true,
        });
    } catch (error: unknown) {
        const message =
            error instanceof Error
                ? error.message
                : "Something went wrong";

        return NextResponse.json(
            { error: message },
            { status: 500 }
        );
    }
}
