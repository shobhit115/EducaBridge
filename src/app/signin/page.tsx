"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Mail,
  Lock,
  User,
  Phone,
  Globe2,
  ArrowRight,
  LogIn,
  UserPlus,
  HelpCircle,
  KeyRound,
  AlertCircle,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import Logo from "@/components/layout/Logo";
import { createClient } from "@/lib/supabase/client";

function AuthCard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  const queryMode = searchParams.get("mode") === "signup" ? "signup" : "signin";
  const [userSelectedMode, setUserSelectedMode] = useState<"signin" | "signup" | null>(null);
  const mode = userSelectedMode ?? queryMode;

  // Shared UI Feedback States
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [infoMsg, setInfoMsg] = useState<string | null>(null);

  // Sign In Form States
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  // Sign Up Form States
  const [signUpName, setSignUpName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPhone, setSignUpPhone] = useState("");
  const [signUpLanguage, setSignUpLanguage] = useState("French");
  const [signUpPassword, setSignUpPassword] = useState("");

  // OTP Verification States
  const [otpStep, setOtpStep] = useState(false);
  const [otpCode, setOtpCode] = useState("");

  const resetFeedback = () => {
    setErrorMsg(null);
    setInfoMsg(null);
  };

  const switchMode = (nextMode: "signin" | "signup") => {
    setUserSelectedMode(nextMode);
    setOtpStep(false);
    setOtpCode("");
    resetFeedback();
  };

  // =========================================================================
  // 1. SIGN IN HANDLER (Supabase Auth + Role-Based Dashboard Redirect)
  // =========================================================================
  const handleSignInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    resetFeedback();
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: signInEmail.trim().toLowerCase(),
      password: signInPassword,
    });

    if (error) {
      setLoading(false);
      setErrorMsg(error.message);
      return;
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .single();

    setLoading(false);

    if (profileError || !profile) {
      setErrorMsg("Unable to load account permissions. Please contact support.");
      return;
    }

    if (profile.role === "admin") {
      router.push("/admin/dashboard");
    } else if (profile.role === "teacher") {
      router.push("/teacher/dashboard");
    } else {
      router.push("/student/dashboard");
    }
    router.refresh();
  };

  // =========================================================================
  // 2. STEP 1 SIGN UP: DISPATCH 6-DIGIT OTP VIA YOUR SERVER SMTP
  // =========================================================================
  const requestOtpFromServer = async () => {
    resetFeedback();
    setLoading(true);

    const res = await fetch("/api/auth/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: signUpName,
        email: signUpEmail,
        password: signUpPassword,
      }),
    });

    const result = await res.json();
    setLoading(false);

    if (!res.ok) {
      setErrorMsg(result.error || "Unable to send verification code.");
      return;
    }

    setOtpStep(true);
    setInfoMsg(`We sent a 6-digit verification code to ${signUpEmail.trim().toLowerCase()}.`);
  };

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await requestOtpFromServer();
  };

  // =========================================================================
  // 3. STEP 2 SIGN UP: VERIFY OTP -> CREATE CONFIRMED USER -> AUTO SIGN-IN
  // =========================================================================
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    resetFeedback();
    setLoading(true);

    const normalizedEmail = signUpEmail.trim().toLowerCase();

    const res = await fetch("/api/auth/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: signUpName,
        email: normalizedEmail,
        phone: signUpPhone,
        preferredLanguage: signUpLanguage,
        password: signUpPassword,
        otp: otpCode,
      }),
    });

    const result = await res.json();

    if (!res.ok) {
      setLoading(false);
      setErrorMsg(result.error || "Invalid verification code.");
      return;
    }

    // Account is now created & verified; establish client session
    const { error: loginError } = await supabase.auth.signInWithPassword({
      email: normalizedEmail,
      password: signUpPassword,
    });

    setLoading(false);

    if (loginError) {
      setOtpStep(false);
      setUserSelectedMode("signin");
      setInfoMsg("Account created! Please sign in with your email and password.");
      return;
    }

    router.push("/student/dashboard");
    router.refresh();
  };

  return (
    <div className="max-w-md w-full space-y-6 bg-white p-7 sm:p-9 rounded-3xl border border-slate-200/90 shadow-xl">
      {/* Brand Header */}
      <div className="text-center space-y-2">
        <div className="flex justify-center mb-1">
          <Logo size="md" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#09265D] tracking-tight">
          {otpStep
            ? "Verify Your Email"
            : mode === "signin"
            ? "Welcome Back"
            : "Join EducaBridge"}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500">
          {otpStep
            ? "Enter the 6-digit OTP sent to your inbox to activate your account."
            : mode === "signin"
            ? "Sign in to access your student portal and live class links."
            : "Create your student account to book a demo and start learning."}
        </p>
      </div>

      {/* Mode Switcher */}
      {!otpStep && (
        <div className="grid grid-cols-2 p-1.5 bg-[#F2F6FF] rounded-2xl border border-blue-100">
          <button
            type="button"
            onClick={() => switchMode("signin")}
            className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              mode === "signin"
                ? "bg-white text-[#09265D] shadow-xs"
                : "text-slate-600 hover:text-[#09265D]"
            }`}
          >
            <LogIn className="w-4 h-4 text-[#2458CC]" />
            <span>Sign In</span>
          </button>

          <button
            type="button"
            onClick={() => switchMode("signup")}
            className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              mode === "signup"
                ? "bg-white text-[#09265D] shadow-xs"
                : "text-slate-600 hover:text-[#09265D]"
            }`}
          >
            <UserPlus className="w-4 h-4 text-[#2458CC]" />
            <span>Create Account</span>
          </button>
        </div>
      )}

      {/* Error & Info Banners */}
      {errorMsg && (
        <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
          <span>{errorMsg}</span>
        </div>
      )}

      {infoMsg && (
        <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-[#09265D]">
          <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-[#2458CC]" />
          <span>{infoMsg}</span>
        </div>
      )}

      {/* =========================================================================
          TAB 1: SIGN IN VIEW
          ========================================================================= */}
      {mode === "signin" && !otpStep && (
        <>
          <form onSubmit={handleSignInSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="signin-email"
                className="block text-xs font-bold text-[#09265D] uppercase tracking-wider mb-1"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="signin-email"
                  type="email"
                  autoComplete="email"
                  required
                  value={signInEmail}
                  onChange={(e) => setSignInEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2458CC] focus:border-transparent transition-all placeholder:text-slate-400"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label
                  htmlFor="signin-password"
                  className="block text-xs font-bold text-[#09265D] uppercase tracking-wider"
                >
                  Password
                </label>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    alert(
                      "Password resets and login support for current cohorts are handled directly by the admissions desk: +91 95403 06253 or contact@educabridgeacademy.com"
                    );
                  }}
                  className="text-xs text-[#2458CC] hover:underline font-medium"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="signin-password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={signInPassword}
                  onChange={(e) => setSignInPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2458CC] focus:border-transparent transition-all placeholder:text-slate-400"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#2458CC] hover:bg-[#1b45a6] disabled:opacity-60 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer mt-1"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="text-center pt-3 border-t border-slate-100 text-xs text-slate-600">
            <span>New to EducaBridge? </span>
            <button
              type="button"
              onClick={() => switchMode("signup")}
              className="font-bold text-[#2458CC] hover:underline cursor-pointer"
            >
              Create an account now &rarr;
            </button>
          </div>
        </>
      )}

      {/* =========================================================================
          TAB 2A: SIGN UP STEP 1 (ACCOUNT DETAILS)
          ========================================================================= */}
      {mode === "signup" && !otpStep && (
        <>
          <form onSubmit={handleSignUpSubmit} className="space-y-3.5">
            <div>
              <label
                htmlFor="signup-name"
                className="block text-xs font-bold text-[#09265D] uppercase tracking-wider mb-1"
              >
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id="signup-name"
                  type="text"
                  autoComplete="name"
                  required
                  value={signUpName}
                  onChange={(e) => setSignUpName(e.target.value)}
                  placeholder="e.g. Ananya Sharma"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2458CC] focus:border-transparent transition-all placeholder:text-slate-400"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="signup-email"
                className="block text-xs font-bold text-[#09265D] uppercase tracking-wider mb-1"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="signup-email"
                  type="email"
                  autoComplete="email"
                  required
                  value={signUpEmail}
                  onChange={(e) => setSignUpEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2458CC] focus:border-transparent transition-all placeholder:text-slate-400"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="signup-phone"
                className="block text-xs font-bold text-[#09265D] uppercase tracking-wider mb-1"
              >
                Phone / WhatsApp
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  id="signup-phone"
                  type="tel"
                  required
                  value={signUpPhone}
                  onChange={(e) => setSignUpPhone(e.target.value)}
                  placeholder="+91 95403 06253"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2458CC] focus:border-transparent transition-all placeholder:text-slate-400"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="signup-language"
                className="block text-xs font-bold text-[#09265D] uppercase tracking-wider mb-1"
              >
                Language of Interest
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Globe2 className="w-4 h-4" />
                </div>
                <select
                  id="signup-language"
                  value={signUpLanguage}
                  onChange={(e) => setSignUpLanguage(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2458CC] focus:border-transparent transition-all bg-white"
                >
                  <option value="French">French (Français &bull; A1–B2)</option>
                  <option value="English">English (Fluency &bull; IELTS / TOEFL)</option>
                  <option value="German">German (Deutsch &bull; Goethe Prep)</option>
                  <option value="Spanish">Spanish (Español &bull; DELE Prep)</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="signup-password"
                className="block text-xs font-bold text-[#09265D] uppercase tracking-wider mb-1"
              >
                Create Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="signup-password"
                  type="password"
                  autoComplete="new-password"
                  required
                  minLength={8}
                  value={signUpPassword}
                  onChange={(e) => setSignUpPassword(e.target.value)}
                  placeholder="Min. 8 characters"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2458CC] focus:border-transparent transition-all placeholder:text-slate-400"
                />
              </div>
            </div>

            <div className="flex items-start pt-1">
              <input
                id="signup-terms"
                type="checkbox"
                required
                className="h-4 w-4 rounded border-slate-300 text-[#2458CC] focus:ring-[#2458CC] mt-0.5"
              />
              <label htmlFor="signup-terms" className="ml-2 block text-xs text-slate-600 leading-snug">
                I agree to receive batch schedules and demo orientation from EducaBridge Academy.
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#2458CC] hover:bg-[#1b45a6] disabled:opacity-60 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer mt-1"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Sending Verification OTP...</span>
                </>
              ) : (
                <>
                  <span>Continue & Verify Email</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="text-center pt-3 border-t border-slate-100 text-xs text-slate-600">
            <span>Already have an account? </span>
            <button
              type="button"
              onClick={() => switchMode("signin")}
              className="font-bold text-[#2458CC] hover:underline cursor-pointer"
            >
              Sign in here &rarr;
            </button>
          </div>
        </>
      )}

      {/* =========================================================================
          TAB 2B: SIGN UP STEP 2 (6-DIGIT EMAIL OTP)
          ========================================================================= */}
      {otpStep && (
        <form onSubmit={handleVerifyOtp} className="space-y-4">
          <div>
            <label
              htmlFor="otp-code"
              className="block text-xs font-bold text-[#09265D] uppercase tracking-wider mb-1"
            >
              6-Digit Verification Code
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <KeyRound className="w-4 h-4" />
              </div>
              <input
                id="otp-code"
                type="text"
                inputMode="numeric"
                maxLength={6}
                required
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
                placeholder="123456"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-center font-mono text-lg tracking-[0.35em] text-[#09265D] font-bold focus:outline-none focus:ring-2 focus:ring-[#2458CC] focus:border-transparent transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#2458CC] hover:bg-[#1b45a6] disabled:opacity-60 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Verifying & Creating Account...</span>
              </>
            ) : (
              <>
                <span>Verify & Create Account</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <div className="flex items-center justify-between pt-2 text-xs text-slate-600">
            <button
              type="button"
              onClick={() => {
                setOtpStep(false);
                setOtpCode("");
                resetFeedback();
              }}
              className="hover:underline cursor-pointer"
            >
              &larr; Edit email
            </button>
            <button
              type="button"
              onClick={requestOtpFromServer}
              disabled={loading}
              className="font-bold text-[#2458CC] hover:underline disabled:opacity-50 cursor-pointer"
            >
              Resend 6-digit code
            </button>
          </div>
        </form>
      )}

      {/* General Support Help Link */}
      <div className="pt-2 text-center">
        <Link
          href="/contact"
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-[#09265D] transition-colors"
        >
          <HelpCircle className="w-3.5 h-3.5 text-blue-500" />
          <span>Need help with admissions? Contact us</span>
        </Link>
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F2F6FF] to-white">
      <Suspense
        fallback={
          <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-slate-200 text-center py-16">
            <div className="w-8 h-8 border-3 border-[#2458CC] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm text-slate-500">Loading portal...</p>
          </div>
        }
      >
        <AuthCard />
      </Suspense>
    </div>
  );
}