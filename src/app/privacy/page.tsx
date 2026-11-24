import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Lock, Shield, Eye } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | EducaBridge Academy",
  description:
    "Learn how EducaBridge Academy collects, stores, protects, and manages personal data for students, teachers, and website visitors.",
};

export default function PrivacyPage() {
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
            <span className="text-[#2458CC]">Privacy Policy</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-[#2458CC] text-xs font-bold uppercase tracking-wider mb-3">
            <Lock className="w-3.5 h-3.5" />
            <span>Data Protection</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#09265D] tracking-tight">
            Privacy Policy
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl">
            At EducaBridge Academy, we are deeply committed to protecting your personal data, transparent communication, and ensuring a safe digital learning environment for all our students and faculty.
          </p>
          <p className="mt-2 text-xs text-slate-400">
            Effective Date: January 1, 2026 &bull; Compliant with Information Technology Act &amp; global data standards.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-14 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Sidebar Highlights */}
            <div className="lg:col-span-4">
              <div className="sticky top-24 p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 space-y-4">
                <h3 className="text-sm font-extrabold text-[#09265D] uppercase tracking-wider">
                  Our Commitments
                </h3>
                <div className="space-y-3 text-xs text-slate-600">
                  <div className="flex items-start gap-2.5">
                    <Shield className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>We never sell or rent your personal information to third-party advertisers.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Lock className="w-4 h-4 text-[#2458CC] shrink-0 mt-0.5" />
                    <span>Row Level Security (RLS) and encrypted database records via Supabase PostgreSQL.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Eye className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span>Transparent OTP verification for signups and administrative two-factor access.</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 text-xs">
                  <p className="font-bold text-[#09265D] mb-1">Data Protection Officer</p>
                  <p className="text-slate-500">
                    Questions about your data? Reach out directly to{" "}
                    <a href="mailto:privacy@educabridgeacademy.com" className="font-semibold text-[#2458CC] underline">
                      privacy@educabridgeacademy.com
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Privacy Articles */}
            <div className="lg:col-span-8 space-y-10 text-slate-700 text-sm sm:text-base leading-relaxed">
              <div className="space-y-3">
                <h2 className="text-xl sm:text-2xl font-black text-[#09265D]">
                  1. Information We Collect
                </h2>
                <p>
                  When you interact with EducaBridge Academy, we collect only information necessary to deliver high-quality educational instruction and platform features:
                </p>
                <div className="space-y-2 text-sm text-slate-600">
                  <p>
                    <strong className="text-[#09265D]">&bull; Personal Identifiers:</strong> Full name, email address, WhatsApp/phone number, and preferred target language.
                  </p>
                  <p>
                    <strong className="text-[#09265D]">&bull; Account &amp; Authentication:</strong> Encrypted password hashes, verified email timestamps, and session tokens.
                  </p>
                  <p>
                    <strong className="text-[#09265D]">&bull; Academic &amp; Cohort Records:</strong> Enrolled batch identifiers, level evaluations, attendance indicators, and mock exam submissions.
                  </p>
                  <p>
                    <strong className="text-[#09265D]">&bull; Technical Logs:</strong> IP address, browser type, device information, and interaction logs strictly used to diagnose platform performance and maintain server security.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl sm:text-2xl font-black text-[#09265D]">
                  2. How We Use Your Information
                </h2>
                <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-600">
                  <li>To coordinate live Google Meet cohorts and provide your instructor with student rosters.</li>
                  <li>To send one-time 6-digit verification codes (OTP) to your email during account registration and admin login.</li>
                  <li>To issue level completion certificates, feedback reports, and batch schedule updates.</li>
                  <li>To process payment receipts and assist your inquiries through our admissions desk.</li>
                  <li>To continuously optimize website navigation, loading speed, and classroom tooling.</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl sm:text-2xl font-black text-[#09265D]">
                  3. Safeguarding Student &amp; Minor Privacy
                </h2>
                <p>
                  EducaBridge Academy welcomes learners of diverse age groups, including school students. For learners under 18 years of age, personal details and enrollment must be supervised by a parent or legal guardian. We do not display young learners&rsquo; contact info publicly or to unauthorized parties.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl sm:text-2xl font-black text-[#09265D]">
                  4. Third-Party Service Providers
                </h2>
                <p>
                  We collaborate only with reputable, enterprise-grade cloud partners under strict confidentiality agreements:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600">
                  <li><strong>Supabase / PostgreSQL:</strong> Secure encrypted cloud database and user authentication.</li>
                  <li><strong>Google Workspace / Meet:</strong> Secure video communication for interactive language classes.</li>
                  <li><strong>Nodemailer / Secure SMTP:</strong> Automated dispatch of account verification codes and cohort notifications.</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl sm:text-2xl font-black text-[#09265D]">
                  5. Your Data Rights &amp; Choices
                </h2>
                <p>
                  You have the right at any time to:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="p-3.5 rounded-xl bg-[#F2F6FF] border border-blue-100">
                    <p className="font-bold text-[#09265D] mb-1">Access &amp; Review</p>
                    <p className="text-slate-600">Request a copy of all personal records associated with your account.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#F2F6FF] border border-blue-100">
                    <p className="font-bold text-[#09265D] mb-1">Rectification</p>
                    <p className="text-slate-600">Update or correct any inaccuracies in your name, contact details, or level.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#F2F6FF] border border-blue-100">
                    <p className="font-bold text-[#09265D] mb-1">Account Deletion</p>
                    <p className="text-slate-600">Request complete erasure of your profile and historical records upon course completion.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#F2F6FF] border border-blue-100">
                    <p className="font-bold text-[#09265D] mb-1">Communication Preferences</p>
                    <p className="text-slate-600">Opt out of non-essential academic announcements or newsletter updates.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-6 border-t border-slate-200">
                <h2 className="text-xl sm:text-2xl font-black text-[#09265D]">
                  6. Contact Our Privacy Team
                </h2>
                <p className="text-sm text-slate-600">
                  If you have questions, feedback, or data requests regarding this Privacy Policy, please write to:
                </p>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-[#09265D] space-y-1">
                  <p className="font-bold">EducaBridge Academy — Data Governance</p>
                  <p className="text-slate-600">Email: privacy@educabridgeacademy.com / contact@educabridgeacademy.com</p>
                  <p className="text-slate-600">Location: Delhi, India &bull; Phone: +91 95403 06253</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
