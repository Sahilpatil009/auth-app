"use client";

import axios from "axios";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { LogOut, User as UserIcon, Mail, Shield, ShieldAlert, Key, RefreshCw, Loader2, ArrowRight } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface UserProfileData {
  _id: string;
  username: string;
  email: string;
  isVerified: boolean;
  isAdmin?: boolean;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [logoutLoading, setLogoutLoading] = useState(false);

  const fetchUserDetails = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/users/me");
      if (res.data && res.data.data) {
        setUser(res.data.data);
      } else {
        toast.error("Failed to load user profile");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching user details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const logout = async () => {
    try {
      setLogoutLoading(true);
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error ? error.message : "Something went wrong during logout"
      );
      setLogoutLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-950 text-slate-100 font-sans px-4 py-12">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-slate-950 to-slate-950" />
      <div className="absolute -left-1/4 -top-1/4 h-[400px] w-[400px] rounded-full bg-blue-500/5 blur-[100px] pointer-events-none" />
      <div className="absolute -right-1/4 -bottom-1/4 h-[400px] w-[400px] rounded-full bg-emerald-500/5 blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl z-10"
      >
        <Card className="border-slate-800/80 bg-slate-900/50 backdrop-blur-md shadow-2xl text-slate-100 overflow-hidden">
          {/* Card Header Decoration */}
          <div className="h-2 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500" />
          
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-between">
              <CardTitle className="text-3xl font-bold tracking-tight bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
                User Profile
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={fetchUserDetails}
                disabled={loading}
                className="text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-full"
              >
                <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              </Button>
            </div>
            <CardDescription className="text-slate-400 text-sm">
              Manage your account credentials and security settings
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                <p className="text-sm text-slate-400">Loading profile data...</p>
              </div>
            ) : user ? (
              <div className="space-y-4">
                {/* User Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Username */}
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-950/40 border border-slate-800/60">
                    <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400">
                      <UserIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium">Username</p>
                      <p className="text-sm font-semibold text-slate-200">{user.username}</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-950/40 border border-slate-800/60">
                    <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-400">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-xs text-slate-500 font-medium">Email Address</p>
                      <p className="text-sm font-semibold text-slate-200 truncate">{user.email}</p>
                    </div>
                  </div>

                  {/* Account Verification */}
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-950/40 border border-slate-800/60">
                    <div className={`p-2.5 rounded-lg ${user.isVerified ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"}`}>
                      {user.isVerified ? <Shield className="h-5 w-5" /> : <ShieldAlert className="h-5 w-5" />}
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium">Security Status</p>
                      <p className={`text-sm font-semibold ${user.isVerified ? "text-emerald-400" : "text-amber-400"}`}>
                        {user.isVerified ? "Verified Account" : "Pending Verification"}
                      </p>
                    </div>
                  </div>

                  {/* Role Type */}
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-950/40 border border-slate-800/60">
                    <div className={`p-2.5 rounded-lg ${user.isAdmin ? "bg-violet-500/10 text-violet-400" : "bg-slate-500/10 text-slate-400"}`}>
                      <Key className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium">Role Type</p>
                      <p className="text-sm font-semibold text-slate-200">
                        {user.isAdmin ? "Administrator" : "Standard User"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Profile ID Box & link */}
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <p className="text-xs text-slate-500 font-medium">Unique Identifier (ID)</p>
                    <code className="text-xs font-mono text-slate-300 select-all bg-slate-950 px-2 py-1 rounded border border-slate-800 mt-1 block">
                      {user._id}
                    </code>
                  </div>
                  <Link
                    href={`/profile/${user._id}`}
                    className={buttonVariants({
                      size: "sm",
                      variant: "secondary",
                      className: "hover:bg-slate-800 text-slate-200 rounded-lg flex items-center gap-1.5 text-xs"
                    })}
                  >
                    View Public Profile <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-slate-400">
                Failed to load profile parameters.
              </div>
            )}
          </CardContent>
          
          <CardFooter className="flex items-center justify-between border-t border-slate-800/50 pt-4 px-6 pb-6">
            <p className="text-xs text-slate-500">
              Logged in session credentials secure
            </p>
            <Button
              onClick={logout}
              disabled={logoutLoading}
              variant="destructive"
              className="bg-red-950/30 hover:bg-red-900/40 border border-red-500/20 text-red-400 rounded-lg px-5 hover:text-red-200 transition duration-150"
            >
              {logoutLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging out...
                </>
              ) : (
                <span className="flex items-center gap-2">
                  Logout <LogOut className="h-4 w-4" />
                </span>
              )}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}