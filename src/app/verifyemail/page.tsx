"use client";

import axios from "axios";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function VerifyEmailContent() {
    const searchParams = useSearchParams();

    const [verified, setVerified] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const token = searchParams.get("token");

                if (!token) {
                    setError("Verification token is missing.");
                    return;
                }

                const response = await axios.post(
                    "/api/users/verifyemail",
                    { token }
                );

                if (response.data.success) {
                    setVerified(true);
                }
            } catch (err: unknown) {
                if (axios.isAxiosError(err)) {
                    setError(
                        err.response?.data?.error ||
                            "Email verification failed."
                    );
                    return;
                }

                setError(
                    err instanceof Error
                        ? err.message
                        : "Email verification failed."
                );
            } finally {
                setLoading(false);
            }
        };

        verifyEmail();
    }, [searchParams]);

    if (loading) {
        return (
            <div>
                <h1>Verifying Email...</h1>
            </div>
        );
    }

    if (verified) {
        return (
            <div>
                <h1>Email Verified Successfully ✅</h1>
                <p>You can now log in.</p>
            </div>
        );
    }

    return (
        <div>
            <h1>Email Verification Failed ❌</h1>
            <p>{error}</p>
        </div>
    );
}

export default function VerifyEmailPage() {
    return (
        <Suspense fallback={
            <div>
                <h1>Loading...</h1>
            </div>
        }>
            <VerifyEmailContent />
        </Suspense>
    );
}