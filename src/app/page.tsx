"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Key, Mail, Lock } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-950 text-slate-100 font-sans">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950" />
      <div className="absolute -left-1/4 -top-1/4 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute -right-1/4 -bottom-1/4 h-[500px] w-[500px] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />

      <main className="relative z-10 flex w-full max-w-4xl flex-col items-center px-6 text-center">
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-400 backdrop-blur-sm"
        >
          <Shield className="h-4 w-4" />
          <span>Next.js 16 Secure Auth System</span>
        </motion.div>

        {/* Hero Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl font-extrabold tracking-tight sm:text-6xl bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent"
        >
          Authentication, <br className="hidden sm:inline" />
          Simplified & Secured
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 max-w-2xl text-lg text-slate-400"
        >
          A production-ready authentication wrapper built with Next.js, 
          Tailwind CSS, Shadcn/UI, and MongoDB. Secure, robust, and clean.
        </motion.p>

        {/* Feature grid - sleek & minimal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3 w-full max-w-3xl"
        >
          <div className="flex flex-col items-center p-5 rounded-2xl border border-slate-800/80 bg-slate-900/50 backdrop-blur-sm">
            <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400 mb-3">
              <Mail className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-slate-200">Email Verification</h3>
            <p className="mt-1 text-sm text-slate-400 text-center">Auto-verifies users via email confirmation tokens.</p>
          </div>

          <div className="flex flex-col items-center p-5 rounded-2xl border border-slate-800/80 bg-slate-900/50 backdrop-blur-sm">
            <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-400 mb-3">
              <Lock className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-slate-200">Session Security</h3>
            <p className="mt-1 text-sm text-slate-400 text-center">HTTP-only cookie-based tokens utilizing JWT.</p>
          </div>

          <div className="flex flex-col items-center p-5 rounded-2xl border border-slate-800/80 bg-slate-900/50 backdrop-blur-sm">
            <div className="p-3 rounded-lg bg-violet-500/10 text-violet-400 mb-3">
              <Key className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-slate-200">Password Recovery</h3>
            <p className="mt-1 text-sm text-slate-400 text-center">Self-service password reset via secure recovery links.</p>
          </div>
        </motion.div>

        {/* Call-to-actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/login"
            className={buttonVariants({
              size: "lg",
              className: "bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-500/20 px-8 transition duration-200"
            })}
          >
            Sign In <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <Link
            href="/signup"
            className={buttonVariants({
              variant: "outline",
              size: "lg",
              className: "border-slate-800 hover:bg-slate-900 hover:text-white rounded-xl px-8 transition duration-200"
            })}
          >
            Create Account
          </Link>
        </motion.div>
      </main>

      {/* Footer info */}
      <div className="absolute bottom-6 text-xs text-slate-600 pointer-events-none">
        Secure Handshake &copy; {new Date().getFullYear()}
      </div>
    </div>
  );
}
