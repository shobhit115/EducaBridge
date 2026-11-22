import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Compass,
  Target,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | EducaBridge Academy",
  description:
    "Learn about EducaBridge Academy, established in 2026. Empowering learners and building futures through interactive, accessible language education.",
};

export default function AboutPage() {
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
              <span className="text-[#2458CC]">About Us</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-[#09265D] tracking-tight leading-tight">
              About EducaBridge Academy
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              Empowering learners, building futures, and bridging cultures through world-class interactive education.
            </p>
          </div>
        </div>
      </section>

      {/* Story & Background Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-block px-3.5 py-1 rounded-full bg-[#EBF2FF] text-[#2458CC] text-xs font-bold uppercase tracking-wider">
                OUR STORY
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#09265D]">
                Connecting Learners to Global Horizons
              </h2>
              <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                <p>
                  Established in 2026, EducaBridge Academy was born from a clear conviction: language and communication are the most powerful bridges to personal, academic, and professional growth.
                </p>
                <p>
                  We bring together expert instructors, structured CEFR-aligned curricula, and live interactive online classrooms. Whether you are a young learner taking your first steps in French, a professional mastering Business English, or an applicant preparing for international certifications like IELTS or Goethe, EducaBridge Academy provides the guidance and community you need.
                </p>
                <p>
                  Our motto — <strong className="text-[#09265D]">&ldquo;Learn. Practice. Grow.&rdquo;</strong> — reflects our commitment to active practice over passive memorisation.
                </p>
              </div>

              {/* Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
                <div className="p-4 rounded-2xl bg-[#F2F6FF] text-left">
                  <span className="text-xs text-slate-500 block">Established</span>
                  <span className="font-bold text-[#09265D] text-base mt-0.5 block">2026</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#F2F6FF] text-left">
                  <span className="text-xs text-slate-500 block">Headquarters</span>
                  <span className="font-bold text-[#09265D] text-base mt-0.5 block">Delhi, India</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#F2F6FF] text-left col-span-2 sm:col-span-1">
                  <span className="text-xs text-slate-500 block">Learning Mode</span>
                  <span className="font-bold text-[#09265D] text-base mt-0.5 block">Live Online</span>
                </div>
              </div>
            </div>

            {/* Right Card / Library Image */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-100">
                <Image
                  src="/images/mission-library.jpg"
                  alt="EducaBridge Academy library"
                  width={500}
                  height={350}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 sm:py-24 bg-[#F2F6FF]/60 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Mission */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#2458CC] text-white flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#2458CC]">
                Our Mission
              </span>
              <h3 className="text-2xl font-bold text-[#09265D]">
                Empowering Learners, Building Futures
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                To provide quality, communicative, and accessible language education that builds genuine fluency and global confidence for students of all ages.
              </p>
              <ul className="space-y-2 pt-2 text-xs font-semibold text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Interactive and engaging live classroom sessions</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Curated digital course materials and homework</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Continuous instructor feedback and progress tracking</span>
                </li>
              </ul>
            </div>

            {/* Vision */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#09265D] text-white flex items-center justify-center">
                <Compass className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#2458CC]">
                Our Vision
              </span>
              <h3 className="text-2xl font-bold text-[#09265D]">
                Bridging You to the World
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                To be the most trustworthy online language academy, fostering confident global citizens and opening pathways for international study, careers, and cultural discovery.
              </p>
              <ul className="space-y-2 pt-2 text-xs font-semibold text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>CEFR-benchmarked courses across 4 world languages</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Specialized exam tracks (IELTS, DELF, Goethe, DELE)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Inclusive learning environment for kids and adults</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#09265D]">
            Start Your Journey with EducaBridge Today
          </h3>
          <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
            Explore our language tracks or connect with our admissions team to book a free demo session.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/courses"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-[#2458CC] hover:bg-[#1b45a6] text-white font-semibold text-sm shadow-md transition-all"
            >
              <span>Explore Courses</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/signin"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-white hover:bg-slate-50 text-[#09265D] border border-slate-300 font-semibold text-sm shadow-xs transition-all"
            >
              <span>Start Learning</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
