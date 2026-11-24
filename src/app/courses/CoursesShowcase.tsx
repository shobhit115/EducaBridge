"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Clock,
  Users,
  X,
  CheckCircle2,
  Award,
  Layers,
  Sparkles,
} from "lucide-react";
import RevealPart from "./RevealPart";

export interface CourseItem {
  id: string;
  code: string;
  greeting: string;
  name: string;
  shortHook: string;
  tagline: string;
  description: string;
  levelRange: string;
  levels: string[];
  exams: string[];
  accentBorder: string;
  accentBg: string;
  pillClass: string;
  watermarkColor: string;
}

export const coursesData: CourseItem[] = [
  {
    id: "french",
    code: "FR",
    greeting: "Bonjour",
    name: "French Language",
    shortHook: "Conversational fluency & DELF / TEF Canada readiness.",
    tagline: "Master conversational fluency and DELF / TEF Canada preparation.",
    description:
      "Structured courses from foundational A1 to B2 levels. Ideal for students, professionals, and Canadian immigration aspirants. Develop natural accent, speaking spontaneity, and listening comprehension.",
    levelRange: "A1 – B2",
    levels: [
      "A1 (Beginner)",
      "A2 (Elementary)",
      "B1 (Intermediate)",
      "B2 (Advanced)",
    ],
    exams: ["DELF A1–B2", "DALF C1–C2", "TEF Canada", "TCF Canada"],
    accentBorder: "hover:border-blue-400/80",
    accentBg: "from-blue-50/90 via-white to-white",
    pillClass: "bg-blue-100/80 text-[#2458CC]",
    watermarkColor: "text-blue-600/[0.06]",
  },
  {
    id: "english",
    code: "EN",
    greeting: "Hello",
    name: "English Fluency",
    shortHook: "Public speaking, business articulation & IELTS 7+ mastery.",
    tagline:
      "Public speaking, professional articulation, and IELTS / TOEFL mastery.",
    description:
      "Comprehensive training in spoken fluency, pronunciation clarity, business communication, and academic essay formulation. Specialized modules for IELTS Academic & General Training band 7+.",
    levelRange: "Foundation – Pro",
    levels: [
      "Foundation",
      "Intermediate Spoken",
      "Advanced Business",
      "Exam Prep",
    ],
    exams: ["IELTS Academic", "IELTS General", "TOEFL iBT", "PTE Academic"],
    accentBorder: "hover:border-indigo-400/80",
    accentBg: "from-indigo-50/90 via-white to-white",
    pillClass: "bg-indigo-100/80 text-indigo-700",
    watermarkColor: "text-indigo-600/[0.06]",
  },
  {
    id: "german",
    code: "DE",
    greeting: "Hallo",
    name: "German Language",
    shortHook: "Goethe CEFR framework for European study & engineering.",
    tagline: "Central European academic and engineering career pathways.",
    description:
      "Systematic German instruction following the Goethe-Institut CEFR framework. Build vocabulary retention, grammatical confidence, and listening skills with standard Hochdeutsch accents.",
    levelRange: "A1 – B2",
    levels: [
      "A1 (Start Deutsch)",
      "A2 (Elementary)",
      "B1 (Zertifikat)",
      "B2 (Professional)",
    ],
    exams: ["Goethe-Zertifikat A1–B2", "TestDaF"],
    accentBorder: "hover:border-amber-400/80",
    accentBg: "from-amber-50/80 via-white to-white",
    pillClass: "bg-amber-100/80 text-amber-800",
    watermarkColor: "text-amber-600/[0.07]",
  },
  {
    id: "spanish",
    code: "ES",
    greeting: "Hola",
    name: "Spanish Language",
    shortHook: "High-energy speaking & official DELE / SIELE prep.",
    tagline: "Vibrant conversational skills and DELE / SIELE certification.",
    description:
      "Engaging, high-energy live classes covering peninsular and Latin American Spanish. Focus on practical conversational fluency, everyday idioms, and official Cervantes DELE readiness.",
    levelRange: "A1 – B2",
    levels: [
      "A1 (Acceso)",
      "A2 (Plataforma)",
      "B1 (Umbral)",
      "B2 (Avanzado)",
    ],
    exams: ["DELE (A1–B2)", "SIELE Global"],
    accentBorder: "hover:border-rose-400/80",
    accentBg: "from-rose-50/80 via-white to-white",
    pillClass: "bg-rose-100/80 text-rose-700",
    watermarkColor: "text-rose-600/[0.06]",
  },
];

export default function CoursesShowcase() {
  const [selectedCourse, setSelectedCourse] = useState<CourseItem | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedCourse(null);
    };

    if (selectedCourse) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedCourse]);

  return (
    <>
      {/* Compact 4-Card Modern Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {coursesData.map((course, idx) => (
          <RevealPart
            key={course.id}
            variant="pop-in"
            delay={idx * 80}
            className="h-full"
          >
            <button
              type="button"
              onClick={() => setSelectedCourse(course)}
              className={`group relative w-full h-full text-left rounded-2xl border border-slate-200/80 ${course.accentBorder} bg-gradient-to-b ${course.accentBg} p-5 shadow-xs hover:shadow-lg hover:shadow-blue-950/[0.06] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between min-h-[205px] overflow-hidden cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2458CC]`}
            >
              {/* Typographic Greeting Watermark */}
              <span
                aria-hidden="true"
                className={`pointer-events-none select-none absolute -bottom-2.5 -right-2 text-5xl font-black tracking-tighter ${course.watermarkColor} group-hover:scale-110 group-hover:-translate-x-1 transition-transform duration-500`}
              >
                {course.greeting}
              </span>

              {/* Top Row: Language Code & Level Pill */}
              <div className="relative z-10 flex items-center justify-between gap-2">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-white border border-slate-200/80 text-xs font-black tracking-wider text-[#09265D] shadow-2xs group-hover:bg-[#09265D] group-hover:text-white group-hover:border-[#09265D] transition-colors duration-300">
                  {course.code}
                </span>

                <span
                  className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full tracking-wide ${course.pillClass}`}
                >
                  {course.levelRange}
                </span>
              </div>

              {/* Middle: Title & Concise 2-Line Hook */}
              <div className="relative z-10 my-3.5 space-y-1">
                <h2 className="text-lg font-extrabold text-[#09265D] group-hover:text-[#2458CC] transition-colors">
                  {course.name}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 leading-snug line-clamp-2">
                  {course.shortHook}
                </p>
              </div>

              {/* Bottom: Compact Meta + Interactive Trigger */}
              <div className="relative z-10 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-[#2458CC]">
                <span className="inline-flex items-center gap-1.5 text-slate-500 font-semibold">
                  <Users className="w-3.5 h-3.5 text-[#2458CC]" />
                  10–15 / batch
                </span>

                <span className="inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>View Details</span>
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </button>
          </RevealPart>
        ))}
      </div>

      {/* Slide-Over Detail Drawer */}
      {selectedCourse && (
        <div
          className="fixed inset-0 z-50 flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-labelledby="course-drawer-title"
        >
          <div
            onClick={() => setSelectedCourse(null)}
            className="fixed inset-0 bg-[#09265D]/40 backdrop-blur-xs transition-opacity"
          />

          <div className="relative z-10 w-full max-w-lg bg-white h-full shadow-2xl border-l border-slate-200 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
            <div className="p-6 sm:p-7 space-y-5">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${selectedCourse.pillClass}`}
                  >
                    Live Online Cohort
                  </span>
                  <span className="text-xs font-bold text-slate-400">
                    {selectedCourse.greeting}!
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedCourse(null)}
                  aria-label="Close course details"
                  className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-1.5">
                <h3
                  id="course-drawer-title"
                  className="text-2xl sm:text-3xl font-black text-[#09265D] tracking-tight"
                >
                  {selectedCourse.name} Programme
                </h3>
                <p className="text-sm font-medium text-[#2458CC] italic">
                  &ldquo;{selectedCourse.tagline}&rdquo;
                </p>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">
                {selectedCourse.description}
              </p>

              <div className="grid grid-cols-3 gap-2.5 p-3 rounded-2xl bg-[#F4F8FF] border border-blue-100">
                <div className="text-center p-1">
                  <Calendar className="w-4 h-4 text-[#2458CC] mx-auto mb-1" />
                  <p className="text-xs font-extrabold text-[#09265D]">
                    5 Days / Wk
                  </p>
                  <p className="text-[11px] text-slate-500">Live Schedule</p>
                </div>
                <div className="text-center p-1 border-x border-blue-200/60">
                  <Clock className="w-4 h-4 text-[#2458CC] mx-auto mb-1" />
                  <p className="text-xs font-extrabold text-[#09265D]">
                    1.5 Hours
                  </p>
                  <p className="text-[11px] text-slate-500">Per Session</p>
                </div>
                <div className="text-center p-1">
                  <Users className="w-4 h-4 text-[#2458CC] mx-auto mb-1" />
                  <p className="text-xs font-extrabold text-[#09265D]">
                    10–15 Max
                  </p>
                  <p className="text-[11px] text-slate-500">2-Way Class</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#09265D]">
                  <Layers className="w-4 h-4 text-[#2458CC]" />
                  <span>Available Levels</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {selectedCourse.levels.map((lvl) => (
                    <div
                      key={lvl}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-semibold text-slate-700"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2458CC] shrink-0" />
                      <span>{lvl}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#09265D]">
                  <Award className="w-4 h-4 text-[#2458CC]" />
                  <span>Exam Tracks Supported</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedCourse.exams.map((exam) => (
                    <span
                      key={exam}
                      className="px-3 py-1 rounded-full bg-blue-50 border border-blue-200/70 text-xs font-semibold text-[#09265D]"
                    >
                      {exam}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#09265D] to-[#2458CC] text-white space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-200">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Two-Way Live Classroom</span>
                </div>
                <p className="text-xs sm:text-sm text-blue-50 leading-relaxed">
                  Direct microphone &amp; chat interaction—ask doubts anytime and
                  practice speaking directly with your instructor.
                </p>
              </div>
            </div>

            <div className="sticky bottom-0 p-4 bg-white/95 backdrop-blur-md border-t border-slate-200 flex items-center gap-3">
              <Link
                href="/signin"
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-[#2458CC] hover:bg-[#1b45a6] text-white font-bold text-sm shadow-md shadow-blue-600/20 transition-colors"
              >
                <span>Enroll &amp; Start</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center py-3 px-5 rounded-full bg-slate-100 hover:bg-slate-200 text-[#09265D] font-bold text-sm transition-colors"
              >
                <span>Free Demo</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}