import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Calendar,
  Clock,
  Users,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Courses & Languages | EducaBridge Academy",
  description:
    "Explore live online language courses at EducaBridge Academy: French, English, German, Spanish, and International Exam Preparation (IELTS, DELF, Goethe).",
};

export default function CoursesPage() {
  const courses = [
    {
      id: "french",
      name: "French Language Programme",
      tagline: "Master conversational fluency and DELF / TEF Canada preparation.",
      description:
        "Structured courses from foundational A1 to B2 levels. Ideal for students, professionals, and Canadian immigration aspirants. Develop natural accent, speaking spontaneity, and listening comprehension.",
      levels: ["A1 (Beginner)", "A2 (Elementary)", "B1 (Intermediate)", "B2 (Advanced)"],
      exams: ["DELF A1–B2", "DALF C1–C2", "TEF Canada", "TCF Canada"],
      accent: "border-blue-200 bg-blue-50/30",
      badgeColor: "bg-blue-100 text-[#2458CC]",
    },
    {
      id: "english",
      name: "English Communication & Fluency",
      tagline: "Public speaking, professional articulation, and IELTS / TOEFL mastery.",
      description:
        "Comprehensive training in spoken fluency, pronunciation clarity, business communication, and academic essay formulation. Specialized modules for IELTS Academic & General Training band 7+.",
      levels: ["Foundation", "Intermediate Spoken", "Advanced Business", "Exam Prep"],
      exams: ["IELTS Academic", "IELTS General", "TOEFL iBT", "PTE Academic"],
      accent: "border-indigo-200 bg-indigo-50/30",
      badgeColor: "bg-indigo-100 text-indigo-700",
    },
    {
      id: "german",
      name: "German Language Programme",
      tagline: "Central European academic and engineering career pathways.",
      description:
        "Systematic German instruction following the Goethe-Institut CEFR framework. Build vocabulary retention, grammatical confidence, and listening skills with standard Hochdeutsch accents.",
      levels: ["A1 (Start Deutsch)", "A2 (Elementary)", "B1 (Zertifikat)", "B2 (Professional)"],
      exams: ["Goethe-Zertifikat A1–B2", "TestDaF"],
      accent: "border-amber-200 bg-amber-50/30",
      badgeColor: "bg-amber-100 text-amber-800",
    },
    {
      id: "spanish",
      name: "Spanish Language Programme",
      tagline: "Vibrant conversational skills and DELE / SIELE certification.",
      description:
        "Engaging, high-energy live classes covering peninsular and Latin American Spanish. Focus on practical conversational fluency, everyday idioms, and official Cervantes DELE readiness.",
      levels: ["A1 (Acceso)", "A2 (Plataforma)", "B1 (Umbral)", "B2 (Avanzado)"],
      exams: ["DELE (A1–B2)", "SIELE Global"],
      accent: "border-rose-200 bg-rose-50/30",
      badgeColor: "bg-rose-100 text-rose-700",
    },
  ];

  return (
    <div className="bg-white">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#EBF2FF] to-white py-14 sm:py-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-3">
              <Link href="/" className="hover:text-[#2458CC] transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-[#2458CC]">Courses</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-[#09265D] tracking-tight leading-tight">
              Our Language Programmes
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              Explore live interactive cohorts led by certified faculty. Small groups of 10–15 students meeting 5 days a week.
            </p>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              id={course.id}
              className={`rounded-3xl border ${course.accent} p-7 sm:p-9 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${course.badgeColor}`}>
                    Live Online Class
                  </span>
                  <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-[#2458CC]" />
                    10–15 Students
                  </span>
                </div>

                <h3 className="text-2xl font-extrabold text-[#09265D] mb-1">
                  {course.name}
                </h3>
                <p className="text-xs text-slate-500 font-medium italic mb-4">
                  &ldquo;{course.tagline}&rdquo;
                </p>

                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {course.description}
                </p>

                {/* Level Pills */}
                <div className="mb-5">
                  <span className="text-xs font-bold text-[#09265D] uppercase tracking-wider block mb-2">
                    Available Levels:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {course.levels.map((lvl) => (
                      <span
                        key={lvl}
                        className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700"
                      >
                        {lvl}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Exam Prep Supported */}
                <div className="mb-6">
                  <span className="text-xs font-bold text-[#09265D] uppercase tracking-wider block mb-2">
                    Exam Tracks Supported:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {course.exams.map((exam) => (
                      <span
                        key={exam}
                        className="px-2.5 py-0.5 rounded-full bg-slate-100 text-xs font-medium text-slate-600"
                      >
                        {exam}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Batch Structure Specs */}
                <div className="grid grid-cols-2 gap-2 p-3 bg-white rounded-xl border border-slate-200/80 text-xs font-semibold text-slate-700 mb-6">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#2458CC]" />
                    <span>5 Classes / Week</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#2458CC]" />
                    <span>1.5 Hours / Class</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-200/60 flex items-center gap-3">
                <Link
                  href="/signin"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-[#2458CC] hover:bg-[#1b45a6] text-white font-semibold text-xs sm:text-sm shadow-xs transition-colors"
                >
                  <span>Start Learning</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center py-3 px-4 rounded-full bg-white border border-slate-300 hover:border-slate-400 text-slate-700 font-semibold text-xs sm:text-sm transition-colors"
                >
                  <span>Inquire / Demo</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Banner */}
      <section className="py-14 bg-[#F2F6FF] text-center border-t border-slate-200/60">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="text-2xl font-extrabold text-[#09265D]">
            Not sure which course or level fits you best?
          </h3>
          <p className="mt-2 text-sm text-slate-600 max-w-lg mx-auto">
            Book a complimentary 1.5-hour demo session with an instructor to evaluate your current proficiency.
          </p>
          <div className="mt-5">
            <Link
              href="/signin"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-[#2458CC] hover:bg-[#1b45a6] text-white font-semibold text-sm shadow-xs transition-colors"
            >
              <span>Get Started Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
