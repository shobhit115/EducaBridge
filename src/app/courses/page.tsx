import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  LogIn,
  LayoutDashboard,
  Video,
  MailCheck,
  MessageSquare,
  Users,
  Sparkles,
} from "lucide-react";
import CoursesShowcase from "./CoursesShowcase";
import RevealPart from "./RevealPart";

export const metadata: Metadata = {
  title: "Courses & Languages | EducaBridge Academy",
  description:
    "Explore live online language courses at EducaBridge Academy: French, English, German, Spanish, and International Exam Preparation (IELTS, DELF, Goethe).",
};

const enrollmentSteps = [
  {
    step: "01",
    icon: LogIn,
    title: "Log In & Enroll",
    description:
      "Sign in to your account, choose your preferred language and level, and complete your course fee payment securely.",
  },
  {
    step: "02",
    icon: LayoutDashboard,
    title: "Unlock Your Dashboard",
    description:
      "Get instant access to your personalized student dashboard displaying your complete batch calendar, class dates, and timings.",
  },
  {
    step: "03",
    icon: Video,
    title: "Join via Link & Email Alerts",
    description:
      "Launch live classes in one click right from your dashboard—plus receive timely email reminders before every session starts.",
  },
  {
    step: "04",
    icon: MessageSquare,
    title: "Two-Way Small-Group Class",
    description:
      "Learn with just 10–15 students per cohort in active two-way sessions where you can ask doubts anytime and teachers engage directly.",
  },
];

export default function CoursesPage() {
  return (
    <div className="bg-white overflow-x-hidden">
      {/* Header Banner */}
      <section className="relative bg-[#1953d1] text-white pt-10 pb-20 sm:pt-14 sm:pb-28 lg:pt-16 lg:pb-32 overflow-hidden">
        {/* Soft atmospheric radial glows */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 right-0 w-96 h-96 rounded-full bg-white/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-12 left-0 w-80 h-80 rounded-full bg-blue-400/20 blur-3xl"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <RevealPart immediate variant="fade-up" delay={0}>
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-200 mb-3">
                <Link
                  href="/"
                  className="hover:text-white transition-colors"
                >
                  Home
                </Link>
                <span className="text-blue-300/60">/</span>
                <span className="text-white font-bold">Courses</span>
              </div>
            </RevealPart>

            <RevealPart immediate variant="fade-up" delay={80}>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                Our Language Courses
              </h1>
            </RevealPart>

            <RevealPart immediate variant="fade-up" delay={160}>
              <p className="mt-3 text-sm sm:text-base text-blue-100 leading-relaxed max-w-2xl">
                Select any programme below to explore levels, exam tracks, and
                schedules. Small live cohorts of 10–15 students meeting 5 days a
                week.
              </p>
            </RevealPart>
          </div>
        </div>

        {/* Animated Moving Wave at the bottom of heading section */}
        <div
          aria-hidden="true"
          className="absolute -bottom-[1px] inset-x-0 w-full overflow-hidden leading-none z-10 pointer-events-none"
        >
          <svg
            className="w-full h-12 sm:h-16 lg:h-20 block min-w-[700px]"
            viewBox="0 24 150 28"
            preserveAspectRatio="none"
            shapeRendering="auto"
          >
            <defs>
              <path
                id="courses-gentle-wave"
                d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
              />
            </defs>
            <g>
              <use
                href="#courses-gentle-wave"
                x="48"
                y="0"
                fill="rgba(255, 255, 255, 0.2)"
                className="wave-layer-1"
              />
              <use
                href="#courses-gentle-wave"
                x="48"
                y="3"
                fill="rgba(255, 255, 255, 0.4)"
                className="wave-layer-2"
              />
              <use
                href="#courses-gentle-wave"
                x="48"
                y="5"
                fill="rgba(255, 255, 255, 0.7)"
                className="wave-layer-3"
              />
              <use
                href="#courses-gentle-wave"
                x="48"
                y="7"
                fill="#FFFFFF"
                className="wave-layer-4"
              />
            </g>
          </svg>
        </div>
      </section>

      {/* Minimal Interactive Course Cards */}
      <section className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealPart variant="fade-up" className="mb-4">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Click any card to view full syllabus &amp; exam tracks
          </p>
        </RevealPart>

        <CoursesShowcase />
      </section>

      {/* How It Works: Enrollment & Live Classroom Process */}
      <section className="relative py-12 sm:py-16 lg:py-20  overflow-hidden">
        {/* Background Bridge SVG Graphic */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden flex items-center justify-center"
        >
          <Image
            src="/images/course-bridge-bg.svg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center opacity-15 sm:opacity-20 pointer-events-none"
          />
          </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="max-w-2xl mx-auto text-center space-y-2 mb-8 sm:mb-10">
            <RevealPart variant="fade-up">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-blue-200/80 shadow-2xs text-xs font-bold uppercase tracking-wider text-[#2458CC]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2458CC] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2458CC]" />
                </span>
                <Sparkles className="w-3.5 h-3.5" />
                <span>How Live Learning Works</span>
              </div>
            </RevealPart>

            <RevealPart variant="fade-up" delay={70}>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#09265D] tracking-tight">
                From Enrollment to Your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2458CC] to-[#3B82F6]">
                  First Live Class
                </span>
              </h2>
            </RevealPart>

            <RevealPart variant="fade-up" delay={120}>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                A seamless, structured learning experience designed around
                personal attention, clear schedules, and real two-way
                conversation.
              </p>
            </RevealPart>
          </div>

          {/* 4-Step Connected Process Grid */}
          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            <div
              aria-hidden="true"
              className="hidden lg:block absolute top-10 left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-blue-200 via-[#2458CC]/30 to-blue-200 z-0"
            />

            {enrollmentSteps.map((item, idx) => {
              const Icon = item.icon;
              return (
                <RevealPart
                  key={item.step}
                  variant="fade-up"
                  delay={idx * 80}
                  className="relative z-10 h-full"
                >
                  <div className="group h-full rounded-2xl bg-white p-5 border border-blue-100/90 hover:border-blue-300 shadow-xs hover:shadow-lg hover:shadow-blue-950/[0.06] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3.5">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#EBF2FF] to-[#DCE8FF] group-hover:from-[#2458CC] group-hover:to-[#1b45a6] text-[#2458CC] group-hover:text-white flex items-center justify-center shadow-2xs transition-all duration-300 group-hover:scale-105 group-hover:-rotate-3">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-[11px] font-black tracking-widest px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-[#2458CC] transition-colors">
                          STEP {item.step}
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-extrabold text-[#09265D] group-hover:text-[#2458CC] transition-colors mb-1.5">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </RevealPart>
              );
            })}
          </div>

          {/* Interactive Classroom & Reminders Highlight Strip */}
          <RevealPart variant="scale-in" className="mt-6 sm:mt-8">
            <div className="rounded-2xl bg-white border border-blue-200/80 p-5 sm:p-6 shadow-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1 w-full">
                <RevealPart
                  variant="fade-up"
                  delay={50}
                  className="flex items-start gap-3"
                >
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#2458CC] flex items-center justify-center shrink-0">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-[#09265D]">
                      10–15 Students Only
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                      Capped cohort size ensures every learner gets personal
                      speaking time.
                    </p>
                  </div>
                </RevealPart>

                <RevealPart
                  variant="fade-up"
                  delay={110}
                  className="flex items-start gap-3"
                >
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#2458CC] flex items-center justify-center shrink-0">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-[#09265D]">
                      2-Way Live Interaction
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                      Ask doubts freely anytime while teachers engage you with
                      live questions.
                    </p>
                  </div>
                </RevealPart>

                <RevealPart
                  variant="fade-up"
                  delay={170}
                  className="flex items-start gap-3"
                >
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#2458CC] flex items-center justify-center shrink-0">
                    <MailCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-[#09265D]">
                      Dashboard + Email Links
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                      Join straight from your dashboard or via automated email
                      reminders.
                    </p>
                  </div>
                </RevealPart>
              </div>

              <RevealPart
                variant="pop-in"
                delay={140}
                className="w-full lg:w-auto shrink-0"
              >
                <Link
                  href="/signin"
                  className="group relative overflow-hidden w-full lg:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#2458CC] hover:bg-[#1b45a6] text-white font-bold text-sm shadow-md shadow-blue-600/20 transition-all hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
                  />
                  <span className="relative">Enroll Now</span>
                  <ArrowRight className="relative w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </RevealPart>
            </div>
          </RevealPart>
        </div>
      </section>

      {/* Bottom Banner */}
      <section className="relative bg-[#1953d1] text-white pt-24 pb-14 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20 text-center overflow-hidden">
        {/* Soft atmospheric radial glows */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-16 right-0 w-80 h-80 rounded-full bg-white/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-12 left-0 w-72 h-72 rounded-full bg-blue-400/20 blur-3xl"
        />

        {/* Animated Moving Wave at the top of the section */}
        <div
          aria-hidden="true"
          className="absolute -top-[1px] inset-x-0 w-full overflow-hidden leading-none z-10 pointer-events-none rotate-180"
        >
          <svg
            className="w-full h-12 sm:h-16 lg:h-20 block min-w-[700px]"
            viewBox="0 24 150 28"
            preserveAspectRatio="none"
            shapeRendering="auto"
          >
            <defs>
              <path
                id="courses-gentle-wave-bottom"
                d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
              />
            </defs>
            <g>
              <use
                href="#courses-gentle-wave-bottom"
                x="48"
                y="0"
                fill="rgba(255, 255, 255, 0.2)"
                className="wave-layer-1"
              />
              <use
                href="#courses-gentle-wave-bottom"
                x="48"
                y="3"
                fill="rgba(255, 255, 255, 0.4)"
                className="wave-layer-2"
              />
              <use
                href="#courses-gentle-wave-bottom"
                x="48"
                y="5"
                fill="rgba(255, 255, 255, 0.7)"
                className="wave-layer-3"
              />
              <use
                href="#courses-gentle-wave-bottom"
                x="48"
                y="7"
                fill="#FFFFFF"
                className="wave-layer-4"
              />
            </g>
          </svg>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <RevealPart variant="fade-up">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              Not sure which course or level fits you best?
            </h3>
          </RevealPart>

          <RevealPart variant="fade-up" delay={80}>
            <p className="mt-3 text-sm sm:text-base text-blue-100 max-w-xl mx-auto leading-relaxed">
              Book a complimentary 1.5-hour demo session with an instructor to
              evaluate your current proficiency.
            </p>
          </RevealPart>

          <RevealPart variant="pop-in" delay={140} className="mt-6">
            <Link
              href="/signin"
              className="group relative overflow-hidden inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white hover:bg-blue-50 text-[#1953d1] font-bold text-sm shadow-lg shadow-blue-950/20 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 active:scale-[0.98]"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-blue-100/40 to-transparent pointer-events-none"
              />
              <span className="relative">Get Started Now</span>
              <ArrowRight className="relative w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </RevealPart>
        </div>
      </section>
    </div>
  );
}