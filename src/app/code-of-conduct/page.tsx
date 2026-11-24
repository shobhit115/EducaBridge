import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Users, Video, Mic, HeartHandshake, ShieldAlert } from "lucide-react";

export const metadata: Metadata = {
  title: "Student Code of Conduct | EducaBridge Academy",
  description:
    "Guidelines, digital classroom etiquette, and community standards for students attending EducaBridge Academy live language cohorts.",
};

export default function CodeOfConductPage() {
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
            <span className="text-[#2458CC]">Student Code of Conduct</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-[#2458CC] text-xs font-bold uppercase tracking-wider mb-3">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Classroom Culture</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#09265D] tracking-tight">
            Student Code of Conduct
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl">
            Language learning thrives when students feel respected, encouraged, and psychologically safe to speak, make mistakes, and practice openly. Our Code of Conduct sets the standard for our live digital classrooms.
          </p>
          <p className="mt-2 text-xs text-slate-400">
            Applicable to all live batches, speaking clubs, doubt sessions, and digital cohort forums.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-14 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Quick Principles */}
            <div className="lg:col-span-4">
              <div className="sticky top-24 p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 space-y-4">
                <h3 className="text-sm font-extrabold text-[#09265D] uppercase tracking-wider">
                  The 4 Core Pillars
                </h3>
                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-xl bg-white border border-slate-200">
                    <p className="font-bold text-[#09265D] flex items-center gap-1.5 mb-0.5">
                      <Users className="w-3.5 h-3.5 text-[#2458CC]" />
                      1. Mutual Respect
                    </p>
                    <p className="text-slate-500">Treat peers, teachers, and coordinators with courtesy and patience.</p>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-slate-200">
                    <p className="font-bold text-[#09265D] flex items-center gap-1.5 mb-0.5">
                      <Video className="w-3.5 h-3.5 text-purple-600" />
                      2. Active Presence
                    </p>
                    <p className="text-slate-500">Keep camera ready and participate actively in two-way spoken dialogues.</p>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-slate-200">
                    <p className="font-bold text-[#09265D] flex items-center gap-1.5 mb-0.5">
                      <Mic className="w-3.5 h-3.5 text-emerald-600" />
                      3. Digital Courtesy
                    </p>
                    <p className="text-slate-500">Mute microphone when not speaking to preserve clean audio for all.</p>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-slate-200">
                    <p className="font-bold text-[#09265D] flex items-center gap-1.5 mb-0.5">
                      <ShieldAlert className="w-3.5 h-3.5 text-red-600" />
                      4. Zero Tolerance
                    </p>
                    <p className="text-slate-500">Zero tolerance for harassment, discrimination, or link sharing.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Guidelines */}
            <div className="lg:col-span-8 space-y-10 text-slate-700 text-sm sm:text-base leading-relaxed">
              <div className="space-y-3">
                <h2 className="text-xl sm:text-2xl font-black text-[#09265D]">
                  1. Live Classroom Etiquette
                </h2>
                <p>
                  To make the most of every 1.5-hour cohort session, students are expected to uphold the following standards:
                </p>
                <div className="space-y-2 text-sm text-slate-600">
                  <p>
                    <strong className="text-[#09265D]">&bull; Punctuality:</strong> Join class 2–3 minutes before the scheduled start time. Late arrivals disrupt ongoing speaking activities.
                  </p>
                  <p>
                    <strong className="text-[#09265D]">&bull; Audio &amp; Video Readiness:</strong> Ensure a quiet environment. Use headphones with a built-in microphone for clear pronunciation feedback.
                  </p>
                  <p>
                    <strong className="text-[#09265D]">&bull; Screen Names:</strong> Always enter the meeting room with your real registered name (e.g., &ldquo;Rohan Sharma&rdquo;) so instructors can record attendance and call upon you.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl sm:text-2xl font-black text-[#09265D]">
                  2. Constructive Participation &amp; Making Mistakes
                </h2>
                <p>
                  Learning a new language (French, German, Spanish, or English) requires stepping out of your comfort zone. In EducaBridge cohorts:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600">
                  <li>Errors in grammar and pronunciation are a natural, celebrated part of linguistic progress.</li>
                  <li>Mocking, ridiculing, or interrupting fellow students while they are speaking is strictly prohibited.</li>
                  <li>Encourage your peers, support group partner exercises, and celebrate each other&rsquo;s milestones.</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl sm:text-2xl font-black text-[#09265D]">
                  3. Academic Honesty &amp; Mock Exams
                </h2>
                <p>
                  For students preparing for international certification tracks (DELF A1–B2, Goethe-Zertifikat, DELE, IELTS, TOEFL):
                </p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600">
                  <li>Mock tests and weekly writing assignments must reflect the student&rsquo;s own independent effort.</li>
                  <li>The use of automated translation software during speaking or writing evaluations defeats the purpose of practice and will result in an uncredited test score.</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl sm:text-2xl font-black text-[#09265D]">
                  4. Privacy &amp; Recording Restrictions
                </h2>
                <div className="p-4 rounded-xl bg-red-50/70 border border-red-200 text-sm text-red-900 space-y-2">
                  <p className="font-bold flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-red-600" />
                    Strict Privacy Prohibition
                  </p>
                  <p className="text-xs leading-relaxed text-red-800">
                    Students may NOT screen-record, screenshot, or distribute audio/video footage of instructors or fellow classmates without express written consent. Doing so infringes upon privacy rights and will lead to immediate expulsion without refund.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl sm:text-2xl font-black text-[#09265D]">
                  5. Disciplinary Process
                </h2>
                <p>
                  In the event of misconduct, EducaBridge Academy follows a graduated resolution policy:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <p className="font-bold text-[#09265D] mb-1">Step 1: Warning</p>
                    <p className="text-slate-600">Private verbal or written counseling by the instructor or student coordinator.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <p className="font-bold text-amber-700 mb-1">Step 2: Suspension</p>
                    <p className="text-slate-600">Temporary removal from live sessions pending review with academic leadership.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <p className="font-bold text-red-700 mb-1">Step 3: Expulsion</p>
                    <p className="text-slate-600">Permanent termination of portal access and revocation of cohort enrollment.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-6 border-t border-slate-200">
                <h2 className="text-xl sm:text-2xl font-black text-[#09265D]">
                  6. Reporting Classroom Concerns
                </h2>
                <p className="text-sm text-slate-600">
                  If you ever feel uncomfortable, encounter inappropriate behavior, or have safety concerns in any session, please immediately inform our Student Welfare Desk:
                </p>
                <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 text-xs sm:text-sm text-[#09265D] space-y-1">
                  <p className="font-bold">Student Welfare &amp; Academic Leadership</p>
                  <p className="text-slate-600">Email: support@educabridgeacademy.com / contact@educabridgeacademy.com</p>
                  <p className="text-slate-600">Confidential Helpline: +91 95403 06253</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
