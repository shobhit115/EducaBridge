import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { RefreshCw, CheckCircle2, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy | EducaBridge Academy",
  description:
    "Review EducaBridge Academy's clear, student-friendly refund, cohort deferral, and cancellation terms for all live language programmes.",
};

export default function RefundPolicyPage() {
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
            <span className="text-[#2458CC]">Refund &amp; Cancellation</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-[#2458CC] text-xs font-bold uppercase tracking-wider mb-3">
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Fair Enrollment Policy</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#09265D] tracking-tight">
            Refund &amp; Cancellation Policy
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl">
            Because our live language cohorts are strictly capped between 10 to 15 students to guarantee personal instructor attention, we maintain a transparent and balanced cancellation and cohort-switching framework.
          </p>
          <p className="mt-2 text-xs text-slate-400">
            Last Updated: January 2026 &bull; Applies to French, German, Spanish, and English cohorts.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-14 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Quick Summary Cards */}
            <div className="lg:col-span-4">
              <div className="sticky top-24 p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 space-y-4">
                <h3 className="text-sm font-extrabold text-[#09265D] uppercase tracking-wider">
                  Policy at a Glance
                </h3>
                <div className="space-y-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200">
                    <p className="font-bold text-emerald-800">100% Free Demo Session</p>
                    <p className="text-emerald-700 mt-0.5">
                      We offer a complimentary 1.5-hour demo evaluation before you pay any enrollment fees.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200">
                    <p className="font-bold text-[#09265D]">Cohort Transfer Privilege</p>
                    <p className="text-slate-600 mt-0.5">
                      Need to reschedule due to exams or work? Transfer your seat to the next upcoming batch without forfeit.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-200">
                    <p className="font-bold text-slate-800">Quick Processing</p>
                    <p className="text-slate-600 mt-0.5">
                      Approved refunds are returned to the original payment source within 5–7 business days.
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200">
                  <Link
                    href="/contact"
                    className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#2458CC] text-white text-xs font-bold hover:bg-[#1b45a6] transition-colors"
                  >
                    <span>Request Assistance</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Detailed Articles */}
            <div className="lg:col-span-8 space-y-10 text-slate-700 text-sm sm:text-base leading-relaxed">
              <div className="space-y-3">
                <h2 className="text-xl sm:text-2xl font-black text-[#09265D]">
                  1. Complimentary Evaluation Before Enrollment
                </h2>
                <p>
                  To eliminate risk and ensure perfect level alignment (A1, A2, B1, B2, or Exam Prep), EducaBridge Academy provides every student with an obligation-free 1.5-hour live demo evaluation. We encourage all learners to experience our instructor methodology, curriculum materials, and small-cohort dynamics before formal enrollment.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl sm:text-2xl font-black text-[#09265D]">
                  2. Withdrawal Prior to Cohort Start Date
                </h2>
                <p>
                  If you have paid your course fee but wish to cancel your enrollment before your scheduled batch begins:
                </p>
                <div className="space-y-2 text-sm text-slate-600">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <p>
                      <strong>More than 7 days prior to Day 1:</strong> 100% refund of tuition fees paid, minus nominal banking/payment gateway transaction charges (typically 2-3%).
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2458CC] shrink-0 mt-0.5" />
                    <p>
                      <strong>Between 3 to 7 days prior to Day 1:</strong> 80% refund of the course fee, or 100% credit transfer to any upcoming batch within the next 6 months.
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <p>
                      <strong>Within 48 hours of Day 1:</strong> Because cohort seats are capped at 15 students and reserved specifically for you, refunds are not permitted; however, you may defer your seat to the immediate next month&rsquo;s batch without penalty.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl sm:text-2xl font-black text-[#09265D]">
                  3. Withdrawals After Cohort Commencement
                </h2>
                <p>
                  Once live classes have commenced and curriculum materials and seat access have been delivered, refunds cannot be granted for completed or ongoing instructional days.
                </p>
                <p className="text-sm text-slate-600">
                  In documented cases of medical emergency or serious personal hardship, the student may apply for a <strong>Cohort Freeze</strong>. The remaining unused class hours will be preserved as credit for up to six (6) months to resume with an equivalent level cohort.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl sm:text-2xl font-black text-[#09265D]">
                  4. Course Rescheduling by EducaBridge Academy
                </h2>
                <p>
                  In the rare event that EducaBridge Academy cancels or reschedules a batch start date by more than 14 days and the new timetable is incompatible with your schedule, you are entitled to choose between:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600">
                  <li>A prompt 100% full refund of all amounts paid.</li>
                  <li>Transfer to an alternate cohort slot or private 1-on-1 transition hours.</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl sm:text-2xl font-black text-[#09265D]">
                  5. Refund Request Procedure
                </h2>
                <p>
                  To request a cancellation, deferral, or refund, follow these simple steps:
                </p>
                <ol className="list-decimal pl-5 space-y-1.5 text-sm text-slate-600">
                  <li>Email <strong>contact@educabridgeacademy.com</strong> with the subject line: &ldquo;Refund / Deferral Request - [Your Full Name] - [Batch Code]&rdquo;.</li>
                  <li>Provide your registered email address, phone number, and brief reason for withdrawal.</li>
                  <li>Our admissions desk will acknowledge your request within 24 business hours. Approved refunds are credited back to the original bank account or card within 5–7 working days.</li>
                </ol>
              </div>

              <div className="space-y-3 pt-6 border-t border-slate-200">
                <h2 className="text-xl sm:text-2xl font-black text-[#09265D]">
                  6. Contact &amp; Grievance Support
                </h2>
                <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 text-xs sm:text-sm text-[#09265D] space-y-1">
                  <p className="font-bold">EducaBridge Academy Admissions Desk</p>
                  <p className="text-slate-600">Email: contact@educabridgeacademy.com</p>
                  <p className="text-slate-600">Direct Support Line / WhatsApp: +91 95403 06253</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
