import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Cookie, ShieldCheck, Settings, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Cookie Policy | EducaBridge Academy",
  description:
    "Understand how EducaBridge Academy uses cookies, session tokens, and local storage to provide secure login and seamless educational portal features.",
};

export default function CookiePolicyPage() {
  return (
    <div className="bg-white">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#EBF2FF] to-white py-14 sm:py-20 border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-3">
            <Link href="/" className="hover:text-[#2458CC] transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#2458CC]">Cookie Policy</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-[#2458CC] text-xs font-bold uppercase tracking-wider mb-3">
            <Cookie className="w-3.5 h-3.5" />
            <span>Browser Storage Notice</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#09265D] tracking-tight">
            Cookie Policy
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl">
            This Cookie Policy explains how EducaBridge Academy utilizes cookies, cryptographic session cookies, and modern browser storage technologies to keep your account safe and your learning experience responsive.
          </p>
          <p className="mt-2 text-xs text-slate-400">
            Last Updated: January 2026 &bull; Compliant with global privacy standards.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-14 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Sidebar */}
            <div className="lg:col-span-4">
              <div className="sticky top-24 p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 space-y-4">
                <h3 className="text-sm font-extrabold text-[#09265D] uppercase tracking-wider">
                  Highlights
                </h3>
                <div className="space-y-3 text-xs text-slate-600">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>We do NOT use invasive cross-site advertising or third-party tracking pixels.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-[#2458CC] shrink-0 mt-0.5" />
                    <span>Admin sessions are secured with Signed HTTP-Only cryptographic tokens.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Settings className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                    <span>You can manage or disable non-essential cookies via your browser settings anytime.</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200">
                  <p className="text-[11px] text-slate-500">
                    Read our full{" "}
                    <Link href="/privacy" className="font-bold text-[#2458CC] underline">
                      Privacy Policy
                    </Link>{" "}
                    for broader information on how personal data is handled.
                  </p>
                </div>
              </div>
            </div>

            {/* Articles */}
            <div className="lg:col-span-8 space-y-10 text-slate-700 text-sm sm:text-base leading-relaxed">
              <div className="space-y-3">
                <h2 className="text-xl sm:text-2xl font-black text-[#09265D]">
                  1. What Are Cookies?
                </h2>
                <p>
                  Cookies are small text files placed on your computer, tablet, or smartphone when you visit a website. They allow the platform to remember your active sign-in status, preserve user preferences (such as your chosen language track), and guarantee that restricted dashboards (e.g. Student Portal, Instructor Workspace, Admin Suite) remain secure.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl sm:text-2xl font-black text-[#09265D]">
                  2. Categories of Cookies We Use
                </h2>
                <div className="space-y-4 pt-1">
                  <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-[#09265D] text-sm">
                        Strictly Necessary / Authentication Cookies
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-blue-100 text-[#2458CC] text-[10px] font-bold">
                        Mandatory
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Essential for authentication and account security. For example:
                    </p>
                    <ul className="list-disc pl-5 text-xs text-slate-500 space-y-1">
                      <li>
                        <code className="text-[#09265D] bg-white px-1.5 py-0.5 rounded border border-slate-200">educabridge_admin_session</code>: A signed HTTP-only cryptographic token verifying admin 2FA verification.
                      </li>
                      <li>
                        <code className="text-[#09265D] bg-white px-1.5 py-0.5 rounded border border-slate-200">sb-*-auth-token</code>: Supabase authentication cookies preserving verified student and instructor logins.
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-[#09265D] text-sm">
                        Functional &amp; Preference Cookies
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        Functional
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Remembers your choices, such as your selected target language (French, German, Spanish, English), cohort view filters, and UI display settings.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-[#09265D] text-sm">
                        Performance &amp; Diagnostics Cookies
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[10px] font-bold">
                        Analytics
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Gathers anonymous telemetry regarding page load times, broken links, and core web vitals to help our engineering team keep the platform running smoothly.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl sm:text-2xl font-black text-[#09265D]">
                  3. Third-Party Cookies
                </h2>
                <p>
                  When you access live classroom video rooms (e.g. Google Meet), third-party cookies from Google may be utilized according to Google&rsquo;s standard privacy and cookie policies. EducaBridge Academy does not operate ad-retargeting or data broker scripts on our learning portal.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl sm:text-2xl font-black text-[#09265D]">
                  4. How to Control or Disable Cookies
                </h2>
                <p>
                  You have the option to accept, decline, or delete cookies directly from your web browser settings. Most browsers (Google Chrome, Mozilla Firefox, Safari, Microsoft Edge) provide controls under their &ldquo;Privacy &amp; Security&rdquo; preferences.
                </p>
                <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900">
                  <p className="font-bold mb-1">Please Note:</p>
                  <p>
                    Disabling strictly necessary authentication cookies will prevent you from signing into your student portal, teacher dashboard, or admin control suite.
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-6 border-t border-slate-200">
                <h2 className="text-xl sm:text-2xl font-black text-[#09265D]">
                  5. Inquiries Regarding Cookies
                </h2>
                <p className="text-sm text-slate-600">
                  For questions regarding our use of cookies and local storage tokens, feel free to contact us:
                </p>
                <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 text-xs sm:text-sm text-[#09265D] space-y-1">
                  <p className="font-bold">EducaBridge Academy Technical &amp; Legal Desk</p>
                  <p className="text-slate-600">Email: support@educabridgeacademy.com / contact@educabridgeacademy.com</p>
                  <p className="text-slate-600">Delhi, India &bull; Phone: +91 95403 06253</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
