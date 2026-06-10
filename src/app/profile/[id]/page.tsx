import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, User, ShieldAlert } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface UserProfileParams {
  params: Promise<{
    id: string;
  }>;
}

export const metadata: Metadata = {
  title: "Public Profile Detail",
  description: "View public user credentials overview",
};

export default async function UserProfile({ params }: UserProfileParams) {
  const { id } = await params;

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-950 text-slate-100 font-sans px-4">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-slate-950 to-slate-950" />
      <div className="absolute -left-1/4 -top-1/4 h-[400px] w-[400px] rounded-full bg-blue-500/5 blur-[100px] pointer-events-none" />
      <div className="absolute -right-1/4 -bottom-1/4 h-[400px] w-[400px] rounded-full bg-emerald-500/5 blur-[100px] pointer-events-none" />

      {/* Floating Back Link */}
      <div className="absolute left-6 top-6 z-20">
        <Link
          href="/profile"
          className={buttonVariants({
            variant: "ghost",
            className: "text-slate-400 hover:text-white hover:bg-slate-900/50 rounded-lg inline-flex items-center gap-2 text-sm"
          })}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>
      </div>

      <div className="w-full max-w-md z-10">
        <Card className="border-slate-800/80 bg-slate-900/50 backdrop-blur-md shadow-2xl text-slate-100 overflow-hidden">
          <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 to-indigo-500" />
          
          <CardHeader className="space-y-1 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-500/10 text-blue-400">
              <User className="h-6 w-6" />
            </div>
            <CardTitle className="text-2xl font-bold tracking-tight bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
              Public Profile
            </CardTitle>
            <CardDescription className="text-slate-400 text-xs">
              Publicly accessible user parameters information page
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="rounded-xl bg-slate-950/40 border border-slate-800/60 p-4">
              <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                User Record Reference ID
              </span>
              <code className="mt-2 block font-mono text-sm text-blue-400 break-all select-all bg-slate-950 px-2 py-1.5 rounded border border-slate-800/60 text-center">
                {id}
              </code>
            </div>

            <div className="flex items-start gap-2.5 rounded-lg bg-blue-950/10 border border-blue-500/10 p-3 text-xs text-slate-400">
              <ShieldAlert className="h-4 w-4 shrink-0 text-blue-400" />
              <span>
                This is a mock public detail screen. Detailed profile assets require active session signature authentication keys.
              </span>
            </div>
          </CardContent>

          <CardFooter className="flex justify-center border-t border-slate-800/50 pt-4">
            <Link
              href="/profile"
              className={buttonVariants({
                className: "w-full bg-blue-600 hover:bg-blue-500 text-white rounded-lg justify-center"
              })}
            >
              Return to Dashboard
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}