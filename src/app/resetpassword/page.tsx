"use client";

import Link from "next/link";
import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

function ResetPasswordContent() {
    const searchParams = useSearchParams();

    const [newPassword, setNewPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [resetSuccess, setResetSuccess] = React.useState(false);
    const [error, setError] = React.useState("");

    const token = searchParams.get("token");

    const buttonDisabled = React.useMemo(() => {
        return !(
            newPassword.trim().length >= 6 &&
            confirmPassword.trim().length >= 6
        );
    }, [newPassword, confirmPassword]);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (buttonDisabled || loading) return;

        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        if (!token) {
            toast.error("Reset token is missing");
            return;
        }

        try {
            setLoading(true);
            setError("");

            const response = await axios.post("/api/users/resetpassword", {
                token,
                newPassword,
            });

            if (response.data.success) {
                setResetSuccess(true);
                toast.success("Password reset successfully!");
            }
        } catch (err) {
            let errorMessage = "An error occurred";

            if (axios.isAxiosError(err)) {
                errorMessage =
                    err.response?.data?.error ||
                    err.response?.data?.message ||
                    err.message;
            } else if (err instanceof Error) {
                errorMessage = err.message;
            }

            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    if (!token) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="flex w-96 flex-col items-center rounded-lg border p-8 shadow-md text-center">
                    <div className="mb-4 text-5xl">⚠️</div>
                    <h1 className="mb-2 text-2xl font-bold text-red-600">
                        Invalid Link
                    </h1>
                    <p className="mb-6 text-gray-600">
                        The password reset link is invalid or missing a token.
                    </p>
                    <Link
                        href="/forgotpassword"
                        className="text-blue-500 hover:underline"
                    >
                        Request a new reset link
                    </Link>
                </div>
            </div>
        );
    }

    if (resetSuccess) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="flex w-96 flex-col items-center rounded-lg border p-8 shadow-md text-center">
                    <div className="mb-4 text-5xl">✅</div>
                    <h1 className="mb-2 text-2xl font-bold text-green-600">
                        Password Reset!
                    </h1>
                    <p className="mb-6 text-gray-600">
                        Your password has been successfully reset. You can now
                        log in with your new password.
                    </p>
                    <Link
                        href="/login"
                        className="rounded-lg bg-green-500 px-6 py-2 text-white hover:bg-green-600 transition"
                    >
                        Go to Login
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
                    Reset Password
                </h1>
                <p className="mb-4 text-center text-sm text-gray-500">
                    Enter your new password below.
                </p>

                {error && (
                    <p className="mb-4 rounded-lg bg-red-50 p-2 text-center text-sm text-red-600">
                        {error}
                    </p>
                )}

                <label htmlFor="newPassword" className="mb-1">
                    New Password
                </label>
                <input
                    className="mb-4 rounded-lg border border-gray-300 p-2 focus:border-gray-600 focus:outline-none"
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Min 6 characters"
                    minLength={6}
                />

                <label htmlFor="confirmPassword" className="mb-1">
                    Confirm Password
                </label>
                <input
                    className="mb-4 rounded-lg border border-gray-300 p-2 focus:border-gray-600 focus:outline-none"
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter password"
                    minLength={6}
                />

                <button
                    type="submit"
                    disabled={buttonDisabled || loading}
                    className={`mb-4 rounded-lg p-2 transition ${
                        buttonDisabled || loading
                            ? "cursor-not-allowed bg-green-300"
                            : "bg-green-500 text-white hover:bg-green-600"
                    }`}
                >
                    {loading ? "Resetting..." : "Reset Password"}
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

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={
            <div className="flex min-h-screen items-center justify-center">
                <p>Loading...</p>
            </div>
        }>
            <ResetPasswordContent />
        </Suspense>
    );
}
