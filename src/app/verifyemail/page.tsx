"use client";

import Link from "next/link";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

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
          setError("Verification token is missing from the link URL.");
          setLoading(false);
          return;
        }

        const response = await axios.post("/api/users/verifyemail", { token });

        if (response.data.success) {
          setVerified(true);
        }
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.error || "Email verification failed.");
        } else {
          setError(err instanceof Error ? err.message : "Email verification failed.");
        }
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [searchParams]);

  return (
    <div className="w-full max-w-md z-10">
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="border-slate-800/80 bg-slate-900/50 backdrop-blur-md shadow-2xl text-slate-100 text-center py-6">
              <CardHeader className="flex flex-col items-center gap-4">
                <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
                <CardTitle className="text-2xl font-bold bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
                  Verifying Email
                </CardTitle>
                <CardDescription className="text-slate-400 text-sm">
                  Please wait while we verify your security credentials...
                </CardDescription>
              </CardHeader>
            </Card>
          </motion.div>
        ) : verified ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-emerald-950 bg-slate-900/50 backdrop-blur-md shadow-2xl text-slate-100 text-center">
              <CardHeader className="flex flex-col items-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                  className="mb-4 p-4 rounded-full bg-emerald-500/10 text-emerald-400"
                >
                  <CheckCircle className="h-10 w-10" />
                </motion.div>
                <CardTitle className="text-2xl font-bold text-emerald-400">
                  Email Verified!
                </CardTitle>
                <CardDescription className="text-slate-400 text-sm mt-2">
                  Your email has been successfully verified.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-slate-400 text-sm px-6">
                You can now log in to access the system features. Thank you for securing your profile.
              </CardContent>
              <CardFooter className="flex justify-center border-t border-slate-800/50 pt-4">
                <Link
                  href="/login"
                  className={buttonVariants({
                    className: "w-full bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition duration-200 justify-center"
                  })}
                >
                  Go to Login
                </Link>
              </CardFooter>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="error"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-red-950 bg-slate-900/50 backdrop-blur-md shadow-2xl text-slate-100 text-center">
              <CardHeader className="flex flex-col items-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                  className="mb-4 p-4 rounded-full bg-red-500/10 text-red-400"
                >
                  <AlertCircle className="h-10 w-10" />
                </motion.div>
                <CardTitle className="text-2xl font-bold text-red-400">
                  Verification Failed
                </CardTitle>
                <CardDescription className="text-slate-400 text-sm mt-2">
                  We encountered an issue during verification.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-red-400/90 text-sm px-6 py-2 bg-red-950/20 border border-red-900/30 rounded-lg mx-6 mb-4">
                {error || "Verification link is invalid or has expired."}
              </CardContent>
              <CardFooter className="flex flex-col gap-3 justify-center border-t border-slate-800/50 pt-4">
                <Link
                  href="/signup"
                  className={buttonVariants({
                    className: "w-full bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition duration-200 justify-center"
                  })}
                >
                  Back to Sign Up
                </Link>
                <Link href="/login" className="text-sm text-slate-400 hover:text-white transition">
                  Back to login
                </Link>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 text-slate-100 font-sans px-4">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-slate-950 to-slate-950" />
      <div className="absolute -left-1/4 -top-1/4 h-[400px] w-[400px] rounded-full bg-blue-500/5 blur-[100px] pointer-events-none" />
      <div className="absolute -right-1/4 -bottom-1/4 h-[400px] w-[400px] rounded-full bg-emerald-500/5 blur-[100px] pointer-events-none" />

      <Suspense fallback={
        <div className="flex flex-col items-center gap-3 z-10 text-slate-400">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          <p className="text-sm">Initiating verification verification context...</p>
        </div>
      }>
        <VerifyEmailContent />
      </Suspense>
    </div>
  );
}