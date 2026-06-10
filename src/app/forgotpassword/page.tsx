"use client";

import Link from "next/link";
import React from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
    const [email, setEmail] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [emailSent, setEmailSent] = React.useState(false);

    const buttonDisabled = React.useMemo(() => {
        return !(email.trim().length > 0);
    }, [email]);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (buttonDisabled || loading) return;

        try {
            setLoading(true);

            const response = await axios.post("/api/users/forgotpassword", {
                email,
            });

            if (response.data.success) {
                setEmailSent(true);
                toast.success("Reset link sent! Check your email.");
            }
        } catch (error) {
            let errorMessage = "An error occurred";

            if (axios.isAxiosError(error)) {
                errorMessage =
                    error.response?.data?.error ||
                    error.response?.data?.message ||
                    error.message;
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }

            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    if (emailSent) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="flex w-96 flex-col items-center rounded-lg border p-8 shadow-md text-center">
                    <div className="mb-4 text-5xl">📧</div>
                    <h1 className="mb-2 text-2xl font-bold text-green-600">
                        Check your email
                    </h1>
                    <p className="mb-6 text-gray-600">
                        If an account with that email exists, we&apos;ve sent a
                        password reset link. Please check your inbox and spam
                        folder.
                    </p>
                    <Link
                        href="/login"
                        className="text-blue-500 hover:underline"
                    >
                        Back to login
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen items-center justify-center">
            <form
                onSubmit={onSubmit}
                className="flex w-80 flex-col rounded-lg border p-6 shadow-md"
            >
                <h1 className="mb-2 text-center text-2xl font-bold">
                    Forgot Password
                </h1>
                <p className="mb-4 text-center text-sm text-gray-500">
                    Enter your email and we&apos;ll send you a link to reset
                    your password.
                </p>

                <label htmlFor="email" className="mb-1">
                    Email
                </label>
                <input
                    className="mb-4 rounded-lg border border-gray-300 p-2 focus:border-gray-600 focus:outline-none"
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                />

                <button
                    type="submit"
                    disabled={buttonDisabled || loading}
                    className={`mb-4 rounded-lg p-2 transition ${
                        buttonDisabled || loading
                            ? "cursor-not-allowed bg-blue-300"
                            : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                >
                    {loading ? "Sending..." : "Send Reset Link"}
                </button>

                <Link
                    href="/login"
                    className="text-center text-blue-500 hover:underline"
                >
                    Back to login
                </Link>
            </form>
        </div>
    );
}
