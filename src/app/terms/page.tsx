import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, FileText, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms & Conditions | EducaBridge Academy",
  description:
    "Review the terms of service, enrollment policies, and legal agreements governing the use of EducaBridge Academy's platform and live courses.",
};

export default function TermsPage() {
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
            <span className="text-[#2458CC]">Terms &amp; Conditions</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-[#2458CC] text-xs font-bold uppercase tracking-wider mb-3">
            <FileText className="w-3.5 h-3.5" />
            <span>Legal Agreement</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#09265D] tracking-tight">
            Terms &amp; Conditions
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl">
            Please read these terms carefully before accessing or enrolling in any live language cohorts, test preparation masterclasses, or digital educational services at EducaBridge Academy.
          </p>
          <p className="mt-2 text-xs text-slate-400">
            Last Updated: January 2026 &bull; Effective for all registered students and visitors.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-14 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Table of contents sidebar */}
            <div className="lg:col-span-4">
              <div className="sticky top-24 p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 space-y-4">
                <h3 className="text-sm font-extrabold text-[#09265D] uppercase tracking-wider">
                  Quick Navigation
                </h3>
                <nav className="space-y-2 text-xs font-medium text-slate-600">
                  <a href="#acceptance" className="block hover:text-[#2458CC] transition-colors">
                    1. Acceptance of Terms
                  </a>
                  <a href="#eligibility" className="block hover:text-[#2458CC] transition-colors">
                    2. Eligibility &amp; Registration
                  </a>
                  <a href="#cohorts" className="block hover:text-[#2458CC] transition-colors">
                    3. Live Cohorts &amp; Attendance
                  </a>
                  <a href="#fees" className="block hover:text-[#2458CC] transition-colors">
                    4. Fees &amp; Payments
                  </a>
                  <a href="#ip" className="block hover:text-[#2458CC] transition-colors">
                    5. Intellectual Property
                  </a>
                  <a href="#conduct" className="block hover:text-[#2458CC] transition-colors">
                    6. User Conduct &amp; Prohibitions
                  </a>
                  <a href="#liability" className="block hover:text-[#2458CC] transition-colors">
                    7. Limitation of Liability
                  </a>
                  <a href="#contact-legal" className="block hover:text-[#2458CC] transition-colors">
                    8. Contact Information
                  </a>
                </nav>

                <div className="pt-4 border-t border-slate-200">
                  <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-100 text-[11px] text-[#09265D] space-y-1">
                    <p className="font-bold flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#2458CC]" />
                      Need clarification?
                    </p>
                    <p className="text-slate-600">
                      Email admissions desk at{" "}
                      <a href="mailto:contact@educabridgeacademy.com" className="font-bold text-[#2458CC] underline">
                        contact@educabridgeacademy.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Terms Articles */}
            <div className="lg:col-span-8 space-y-10 text-slate-700 text-sm sm:text-base leading-relaxed">
              <div id="acceptance" className="space-y-3 scroll-mt-24">
                <h2 className="text-xl sm:text-2xl font-black text-[#09265D]">
                  1. Acceptance of Terms
                </h2>
                <p>
                  By creating an account, browsing this website, booking a trial demo, or enrolling in any language course provided by EducaBridge Academy (&ldquo;EducaBridge&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), you agree to be bound by these Terms &amp; Conditions and our related Privacy Policy. If you do not agree with any part of these terms, you must discontinue using our platform and services immediately.
                </p>
              </div>

              <div id="eligibility" className="space-y-3 scroll-mt-24">
                <h2 className="text-xl sm:text-2xl font-black text-[#09265D]">
                  2. Eligibility &amp; Account Registration
                </h2>
                <p>
                  Our courses are designed for learners of all ages, including young learners, university students, and adult professionals. If a learner is under 18 years of age, account registration, fee payment, and terms acceptance must be completed by a parent or legal guardian.
                </p>
                <ul className="list-disc pl-5 space-y-1 text-slate-600 text-sm">
                  <li>You must provide accurate, complete, and current registration information.</li>
                  <li>You are responsible for maintaining the confidentiality of your login credentials.</li>
                  <li>Accounts may not be shared, transferred, or assigned to third parties without prior written consent from EducaBridge Academy.</li>
                </ul>
              </div>

              <div id="cohorts" className="space-y-3 scroll-mt-24">
                <h2 className="text-xl sm:text-2xl font-black text-[#09265D]">
                  3. Live Cohorts, Scheduling &amp; Class Links
                </h2>
                <p>
                  EducaBridge Academy conducts synchronous online cohorts capped at 10–15 students to guarantee two-way oral communication and personal feedback.
                </p>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 text-sm space-y-2">
                  <p className="font-bold text-[#09265D] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Key Cohort Rules
                  </p>
                  <p className="text-slate-600 text-xs">
                    Meeting links (e.g., Google Meet, Zoom) provided inside your student portal are exclusive to your registered enrollment. Distributing meeting links or inviting non-enrolled individuals is strictly prohibited and subject to immediate suspension.
                  </p>
                </div>
              </div>

              <div id="fees" className="space-y-3 scroll-mt-24">
                <h2 className="text-xl sm:text-2xl font-black text-[#09265D]">
                  4. Fees, Invoicing &amp; Taxes
                </h2>
                <p>
                  Tuition fees for each level, exam track, or masterclass are specified on our course page and during admission consultation. All fees are quoted in Indian Rupees (INR) or applicable local currencies and are inclusive of standard live cohort instruction, session materials, and mock exam evaluations.
                </p>
                <p className="text-sm text-slate-600">
                  Payments must be settled prior to the cohort commencement date. For policy regarding withdrawals and refunds, please review our separate{" "}
                  <Link href="/refund-policy" className="font-bold text-[#2458CC] underline">
                    Refund &amp; Cancellation Policy
                  </Link>.
                </p>
              </div>

              <div id="ip" className="space-y-3 scroll-mt-24">
                <h2 className="text-xl sm:text-2xl font-black text-[#09265D]">
                  5. Intellectual Property &amp; Course Materials
                </h2>
                <p>
                  All curriculum outlines, worksheets, custom slide decks, audio recordings, mock examinations, and website assets are the exclusive intellectual property of EducaBridge Academy.
                </p>
                <p>
                  Enrolled students receive a limited, revocable, non-transferable license to access course materials solely for personal study. You may not record live classes, publish, redistribute, or commercially exploit any educational content provided by EducaBridge Academy.
                </p>
              </div>

              <div id="conduct" className="space-y-3 scroll-mt-24">
                <h2 className="text-xl sm:text-2xl font-black text-[#09265D]">
                  6. User Conduct &amp; Classroom Decorum
                </h2>
                <p>
                  EducaBridge Academy enforces a strict zero-tolerance policy against cyberbullying, harassment, hate speech, inappropriate language, and unauthorized disruptive behavior in live cohorts. For comprehensive standards, please read our{" "}
                  <Link href="/code-of-conduct" className="font-bold text-[#2458CC] underline">
                    Student Code of Conduct
                  </Link>.
                </p>
              </div>

              <div id="liability" className="space-y-3 scroll-mt-24">
                <h2 className="text-xl sm:text-2xl font-black text-[#09265D]">
                  7. Limitation of Liability &amp; Disclaimers
                </h2>
                <p>
                  While our curricula are rigorously aligned with CEFR standards (DELF, Goethe-Zertifikat, DELE, IELTS, TOEFL) and taught by certified professionals, individual test results depend upon the student&rsquo;s diligence, attendance, and preparation. EducaBridge Academy does not guarantee specific exam scores or third-party visa approvals.
                </p>
              </div>

              <div id="contact-legal" className="space-y-3 scroll-mt-24 pt-6 border-t border-slate-200">
                <h2 className="text-xl sm:text-2xl font-black text-[#09265D]">
                  8. Governing Law &amp; Legal Inquiries
                </h2>
                <p>
                  These terms are governed by and construed in accordance with the laws of India. Any disputes arising in connection with these terms shall be subject to the exclusive jurisdiction of the competent courts in Delhi, India.
                </p>
                <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 text-xs sm:text-sm text-[#09265D] space-y-1">
                  <p className="font-bold">EducaBridge Academy Admissions &amp; Legal Desk</p>
                  <p className="text-slate-600">Email: contact@educabridgeacademy.com</p>
                  <p className="text-slate-600">Phone: +91 95403 06253 &bull; Delhi, India</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
