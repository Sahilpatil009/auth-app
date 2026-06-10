"use client";

import Link from "next/link";
import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Lock, Loader2, ArrowLeft, CheckCircle, AlertTriangle, Key } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

function ResetPasswordContent() {
  const searchParams = useSearchParams();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [error, setError] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const token = searchParams.get("token");

  const buttonDisabled = useMemo(() => {
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
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <Card className="border-red-950 bg-slate-900/50 backdrop-blur-md shadow-2xl text-slate-100 text-center">
          <CardHeader className="flex flex-col items-center">
            <div className="mb-4 p-4 rounded-full bg-red-500/10 text-red-400">
              <AlertTriangle className="h-10 w-10" />
            </div>
            <CardTitle className="text-2xl font-bold text-red-400">
              Invalid Link
            </CardTitle>
            <CardDescription className="text-slate-400 text-sm mt-2">
              The password reset link is invalid or missing a security token.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-slate-400 text-sm px-6">
            Please make sure you copied the correct link from your email or try requesting a new reset link below.
          </CardContent>
          <CardFooter className="flex flex-col gap-3 justify-center border-t border-slate-800/50 pt-4">
            <Link
              href="/forgotpassword"
              className={buttonVariants({
                className: "w-full bg-blue-600 hover:bg-blue-500 text-white rounded-lg justify-center"
              })}
            >
              Request new link
            </Link>
            <Link href="/login" className="text-sm text-slate-400 hover:text-white transition">
              Back to login
            </Link>
          </CardFooter>
        </Card>
      </motion.div>
    );
  }

  if (resetSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <Card className="border-emerald-950 bg-slate-900/50 backdrop-blur-md shadow-2xl text-slate-100 text-center">
          <CardHeader className="flex flex-col items-center">
            <div className="mb-4 p-4 rounded-full bg-emerald-500/10 text-emerald-400">
              <CheckCircle className="h-10 w-10" />
            </div>
            <CardTitle className="text-2xl font-bold text-emerald-400">
              Password Reset!
            </CardTitle>
            <CardDescription className="text-slate-400 text-sm mt-2">
              Your password has been successfully updated.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-slate-400 text-sm px-6">
            You can now log in to your account with your newly configured password credentials.
          </CardContent>
          <CardFooter className="flex justify-center border-t border-slate-800/50 pt-4">
            <Link
              href="/login"
              className={buttonVariants({
                className: "w-full bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg justify-center"
              })}
            >
              Go to Login
            </Link>
          </CardFooter>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-md"
    >
      <Card className="border-slate-800/80 bg-slate-900/50 backdrop-blur-md shadow-2xl text-slate-100">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold tracking-tight bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
            Reset Password
          </CardTitle>
          <CardDescription className="text-slate-400 text-sm">
            Please enter and confirm your new secure password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            {error && (
              <div className="flex items-center gap-2 rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-400">
                <AlertTriangle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="newPassword" className="text-slate-300 font-medium">New Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                <Input
                  className="pl-10 pr-10 bg-slate-950/50 border-slate-800 focus:border-blue-500 text-slate-100 placeholder:text-slate-600 rounded-lg focus-visible:ring-0"
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Min 6 characters"
                  minLength={6}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-3 text-slate-500 hover:text-slate-300 transition"
                >
                  {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-slate-300 font-medium">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                <Input
                  className="pl-10 pr-10 bg-slate-950/50 border-slate-800 focus:border-blue-500 text-slate-100 placeholder:text-slate-600 rounded-lg focus-visible:ring-0"
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter new password"
                  minLength={6}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-slate-500 hover:text-slate-300 transition"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {newPassword && confirmPassword && newPassword !== confirmPassword && (
                <p className="text-xs text-red-400 mt-1">Passwords do not match</p>
              )}
              {newPassword && confirmPassword && newPassword === confirmPassword && (
                <p className="text-xs text-emerald-400 mt-1">Passwords match</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={buttonDisabled || loading}
              className="w-full mt-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition duration-200"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Resetting Password...
                </>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Update Password <Key className="h-4 w-4" />
                </span>
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center border-t border-slate-800/50 pt-4">
          <Link href="/login" className="text-sm text-slate-400 hover:text-white transition">
            Back to login
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 text-slate-100 font-sans px-4">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-slate-950 to-slate-950" />
      <div className="absolute -left-1/4 -top-1/4 h-[400px] w-[400px] rounded-full bg-blue-500/5 blur-[100px] pointer-events-none" />
      <div className="absolute -right-1/4 -bottom-1/4 h-[400px] w-[400px] rounded-full bg-emerald-500/5 blur-[100px] pointer-events-none" />

      <Suspense fallback={
        <div className="flex flex-col items-center gap-3 z-10 text-slate-400">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          <p className="text-sm">Verifying secure token context...</p>
        </div>
      }>
        <ResetPasswordContent />
      </Suspense>
    </div>
  );
}
