"use client";

import Link from "next/link";
import React, { useState, useMemo } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Loader2, ArrowLeft, Send, MailOpen } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const buttonDisabled = useMemo(() => {
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

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 text-slate-100 font-sans px-4">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-slate-950 to-slate-950" />
      <div className="absolute -left-1/4 -top-1/4 h-[400px] w-[400px] rounded-full bg-blue-500/5 blur-[100px] pointer-events-none" />
      <div className="absolute -right-1/4 -bottom-1/4 h-[400px] w-[400px] rounded-full bg-emerald-500/5 blur-[100px] pointer-events-none" />

      {/* Floating Home Link */}
      <div className="absolute left-6 top-6 z-20">
        <Link href="/login" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition duration-200">
          <ArrowLeft className="h-4 w-4" />
          Back to Login
        </Link>
      </div>

      <div className="w-full max-w-md z-10">
        <AnimatePresence mode="wait">
          {!emailSent ? (
            <motion.div
              key="forgot-form"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border-slate-800/80 bg-slate-900/50 backdrop-blur-md shadow-2xl text-slate-100">
                <CardHeader className="space-y-1 text-center">
                  <CardTitle className="text-3xl font-bold tracking-tight bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
                    Forgot Password
                  </CardTitle>
                  <CardDescription className="text-slate-400 text-sm">
                    Enter your email to receive a password reset link
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={onSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-slate-300 font-medium">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                        <Input
                          className="pl-10 bg-slate-950/50 border-slate-800 focus:border-blue-500 text-slate-100 placeholder:text-slate-600 rounded-lg focus-visible:ring-0"
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@example.com"
                          required
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={buttonDisabled || loading}
                      className="w-full mt-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition duration-200"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          Send Reset Link <Send className="h-4 w-4" />
                        </span>
                      )}
                    </Button>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-center border-t border-slate-800/50 pt-4">
                  <p className="text-sm text-slate-400">
                    Remember your password?{" "}
                    <Link href="/login" className="text-blue-400 hover:text-blue-300 font-medium transition duration-150">
                      Sign in
                    </Link>
                  </p>
                </CardFooter>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="forgot-success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border-slate-800/80 bg-slate-900/50 backdrop-blur-md shadow-2xl text-slate-100 text-center">
                <CardHeader className="flex flex-col items-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                    className="mb-4 p-4 rounded-full bg-emerald-500/10 text-emerald-400"
                  >
                    <MailOpen className="h-10 w-10" />
                  </motion.div>
                  <CardTitle className="text-2xl font-bold text-emerald-400">
                    Check your email
                  </CardTitle>
                  <CardDescription className="text-slate-400 text-sm mt-2">
                    We&apos;ve sent a password reset link to
                  </CardDescription>
                  <p className="text-white font-medium text-sm mt-1 bg-slate-950/40 px-3 py-1 rounded-full border border-slate-800">
                    {email}
                  </p>
                </CardHeader>
                <CardContent className="text-slate-400 text-sm px-6">
                  Please check your inbox and your spam folder. The link will expire shortly for security reasons.
                </CardContent>
                <CardFooter className="flex justify-center border-t border-slate-800/50 pt-4">
                  <Link
                    href="/login"
                    className={buttonVariants({
                      variant: "outline",
                      className: "border-slate-800 hover:bg-slate-900 hover:text-white rounded-lg transition duration-200"
                    })}
                  >
                    Back to Login
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
