// @ts-expect-error nodemailer does not have TypeScript definitions
import nodemailer from "nodemailer";
import User from "../models/userModel";
import crypto from "crypto";

type EmailType = "VERIFY" | "RESET";

interface SendEmailOptions {
    email: string;
    emailType: EmailType;
    userId: string;
}

export const sendEmail = async ({
    email,
    emailType,
    userId,
}: SendEmailOptions) => {
    try {

        const token = crypto.randomBytes(32).toString("hex");

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: token,
                verifyTokenExpiry: Date.now() + 3600000,
            });
        } else {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: token,
                forgotPasswordTokenExpiry: Date.now() + 3600000,
            });
        }

        const transport = nodemailer.createTransport({
            host: process.env.MAILTRAP_HOST,
            port: Number(process.env.MAILTRAP_PORT),
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASS,
            },
        });

        const mailOptions = {
            from: "noreply@myapp.com",
            to: email,
            subject:
                emailType === "VERIFY"
                    ? "Verify your email"
                    : "Reset your password",
            html: `
                <p>
                    Click the link below:
                </p>
                <a href="${process.env.DOMAIN}/${
                    emailType === "VERIFY"
                        ? "verifyemail"
                        : "resetpassword"
                }?token=${token}">
                    ${
                        emailType === "VERIFY"
                            ? "Verify Email"
                            : "Reset Password"
                    }
                </a>
            `,
        };

        const mailResponse = await transport.sendMail(mailOptions);

        return mailResponse;

    } catch (error) {
        throw new Error(
            error instanceof Error
                ? error.message
                : "Something went wrong"
        );
    }
};