"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Mail,
  Lock,
  User,
  Phone,
  Globe2,
  ArrowRight,
  CheckCircle2,
  LogIn,
  UserPlus,
  HelpCircle,
} from "lucide-react";
import Logo from "@/components/layout/Logo";

function AuthCard() {
  const searchParams = useSearchParams();
  const queryMode = searchParams.get("mode") === "signup" ? "signup" : "signin";
  const [userSelectedMode, setUserSelectedMode] = useState<"signin" | "signup" | null>(null);

  // Derive mode: user's explicit selection takes precedence, falling back to URL parameter
  const mode = userSelectedMode ?? queryMode;

  // Sign In Form States
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [signInSubmitted, setSignInSubmitted] = useState(false);

  // Sign Up Form States
  const [signUpName, setSignUpName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPhone, setSignUpPhone] = useState("");
  const [signUpLanguage, setSignUpLanguage] = useState("French");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpSubmitted, setSignUpSubmitted] = useState(false);

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSignInSubmitted(true);
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSignUpSubmitted(true);
  };

  return (
    <div className="max-w-md w-full space-y-6 bg-white p-7 sm:p-9 rounded-3xl border border-slate-200/90 shadow-xl">
      {/* Brand Header */}
      <div className="text-center space-y-2">
        <div className="flex justify-center mb-1">
          <Logo size="md" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#09265D] tracking-tight">
          {mode === "signin" ? "Welcome Back" : "Join EducaBridge"}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500">
          {mode === "signin"
            ? "Sign in to access your student portal and live class links."
            : "Create your student account to book a demo and start learning."}
        </p>
      </div>

      {/* Modern Segmented Control / Tab Switcher */}
      <div className="grid grid-cols-2 p-1.5 bg-[#F2F6FF] rounded-2xl border border-blue-100">
        <button
          type="button"
          onClick={() => {
            setUserSelectedMode("signin");
            setSignInSubmitted(false);
          }}
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
          onClick={() => {
            setUserSelectedMode("signup");
            setSignUpSubmitted(false);
          }}
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

      {/* =========================================================================
          TAB 1: SIGN IN VIEW
          ========================================================================= */}
      {mode === "signin" && (
        <>
          {signInSubmitted ? (
            <div className="p-6 rounded-2xl bg-blue-50 border border-blue-200 text-center space-y-3 animate-in fade-in-50 duration-200">
              <div className="w-12 h-12 rounded-full bg-[#2458CC] text-white flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-[#09265D] text-base">
                Verification Notice
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Student portal accounts for 2026 inaugural cohorts are verified via your registered email address. Please check your inbox for your direct classroom access credentials.
              </p>
              <div className="pt-2 flex justify-center gap-3">
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2458CC] hover:underline"
                >
                  <span>Explore Courses</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:underline"
                >
                  <span>Contact Support</span>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSignInSubmit} className="space-y-4">
              {/* Email Address */}
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
                    name="email"
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

              {/* Password */}
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
                    name="password"
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

              {/* Remember me */}
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-[#2458CC] focus:ring-[#2458CC]"
                />
                <label htmlFor="remember-me" className="ml-2 block text-xs text-slate-600">
                  Remember me on this device
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#2458CC] hover:bg-[#1b45a6] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer mt-1"
              >
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Tab Footer Helper */}
          <div className="text-center pt-3 border-t border-slate-100 text-xs text-slate-600">
            <span>New to EducaBridge? </span>
            <button
              type="button"
              onClick={() => {
                setUserSelectedMode("signup");
                setSignInSubmitted(false);
              }}
              className="font-bold text-[#2458CC] hover:underline cursor-pointer"
            >
              Create an account now &rarr;
            </button>
          </div>
        </>
      )}

      {/* =========================================================================
          TAB 2: SIGN UP VIEW (CREATE ACCOUNT)
          ========================================================================= */}
      {mode === "signup" && (
        <>
          {signUpSubmitted ? (
            <div className="p-6 rounded-2xl bg-blue-50 border border-blue-200 text-center space-y-3 animate-in fade-in-50 duration-200">
              <div className="w-12 h-12 rounded-full bg-[#2458CC] text-white flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-[#09265D] text-base">
                Welcome to EducaBridge, {signUpName}!
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Thank you for registering. Our academic team will contact you regarding your interest in <strong>{signUpLanguage}</strong> to confirm your batch preference and schedule your complimentary 1.5-hour demo.
              </p>
              <div className="pt-2 flex justify-center gap-3">
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2458CC] hover:underline"
                >
                  <span>Explore Course Outline</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:underline"
                >
                  <span>Contact Admissions</span>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSignUpSubmit} className="space-y-3.5">
              {/* Full Name */}
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

              {/* Email Address */}
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

              {/* Phone / WhatsApp */}
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

              {/* Target Language */}
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

              {/* Password */}
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
                    value={signUpPassword}
                    onChange={(e) => setSignUpPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2458CC] focus:border-transparent transition-all placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Terms Checkbox */}
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

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#2458CC] hover:bg-[#1b45a6] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer mt-1"
              >
                <span>Start Learning (Register)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Tab Footer Helper */}
          <div className="text-center pt-3 border-t border-slate-100 text-xs text-slate-600">
            <span>Already have an account? </span>
            <button
              type="button"
              onClick={() => {
                setUserSelectedMode("signin");
                setSignUpSubmitted(false);
              }}
              className="font-bold text-[#2458CC] hover:underline cursor-pointer"
            >
              Sign in here &rarr;
            </button>
          </div>
        </>
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