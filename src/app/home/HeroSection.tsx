import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import FeatureCards from "./FeatureCards";

export default function HeroSection() {
  return (
    <section className="relative pt-8 pb-10 sm:pt-10 sm:pb-12 lg:pt-12 lg:pb-14 bg-gradient-to-b from-[#EBF2FF] via-[#F6F9FF] to-white overflow-hidden">  {/* Ambient Background Glows */}
      <div
        className="absolute -top-32 right-0 w-[28rem] h-[28rem] bg-blue-300/25 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 -left-20 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Full-Section Organic Wave Background */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none -z-10"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 720"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover"
          preserveAspectRatio="xMidYMid slice"
        >
          <rect width="1440" height="720" fill="url(#heroBaseGrad)" />
          <path
            d="M-80 120C140 40 320 220 560 150C800 80 960 -20 1220 40L1440 0V320C1180 280 940 380 680 310C420 240 180 340 -80 280V120Z"
            fill="url(#waveGrad1)"
          />
          <defs>
            <linearGradient
              id="heroBaseGrad"
              x1="720"
              y1="0"
              x2="720"
              y2="720"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#F0F5FF" />
              <stop offset="65%" stopColor="#F8FAFF" />
              <stop offset="100%" stopColor="#FFFFFF" />
            </linearGradient>
            <linearGradient
              id="waveGrad1"
              x1="0"
              y1="60"
              x2="1200"
              y2="280"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#DCE8FF" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#EEF4FF" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Content */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left z-10">
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-xs border border-blue-200/80 shadow-xs text-xs sm:text-sm font-semibold text-[#2458CC]">
              <Sparkles className="w-4 h-4 text-[#2458CC]" />
              <span>Empowering Next-Gen Learners</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-black text-[#09265D] tracking-tight leading-[1.1]">
              Bridge Your <br className="hidden sm:inline" />
              Learning Journey{" "}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#2458CC] to-[#3B82F6] mt-1">
                with EducaBridge Academy
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-xl font-medium text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Learn &bull; Practice &bull; Grow — structured mentorship and
              interactive courses built for a brighter future.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/courses"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#2458CC] hover:bg-[#1b45a6] text-white text-base font-semibold shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30 hover:-translate-y-0.5 transition-all duration-200 active:scale-[0.98]"
              >
                <span>Explore Courses</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/about"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/90 backdrop-blur-xs hover:bg-white text-[#09265D] border border-slate-200/90 hover:border-blue-300 text-base font-semibold shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 active:scale-[0.98]"
              >
                <span>About Us</span>
              </Link>
            </div>
          </div>

          {/* Right Hero Cutout Image + Custom SVG Backdrop */}
          <div className="lg:col-span-6 relative flex items-end justify-center">
            {/* Responsive SVG Backdrop Behind the Students */}
            <div
              className="absolute inset-0 -inset-x-4 sm:-inset-x-8 -top-6 bottom-0 flex items-center justify-center pointer-events-none select-none"
              aria-hidden="true"
            >
              <svg
                viewBox="0 0 600 500"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full max-w-[580px] object-contain"
              >
                {/* Soft outer pastel halo */}
                <path
                  d="M325 48C445 48 548 135 556 252C564 365 485 455 365 468C242 482 115 435 88 320C60 202 185 48 325 48Z"
                  fill="url(#studentHaloGrad)"
                />

                {/* Secondary inner organic wave shape */}
                <path
                  d="M350 95C445 102 518 178 512 272C506 364 425 425 328 422C232 419 148 362 152 268C156 172 252 88 350 95Z"
                  fill="url(#studentInnerBlob)"
                />

                {/* Subtle dashed orbit accent */}
                <circle
                  cx="335"
                  cy="265"
                  r="205"
                  stroke="#2458CC"
                  strokeOpacity="0.18"
                  strokeWidth="2"
                  strokeDasharray="8 8"
                />

                {/* Minimal decorative dots & plus accents */}
                <circle cx="122" cy="155" r="6" fill="#93C5FD" fillOpacity="0.7" />
                <circle cx="525" cy="120" r="8" fill="#BFDBFE" fillOpacity="0.8" />
                <circle cx="95" cy="340" r="5" fill="#2458CC" fillOpacity="0.25" />
                <path
                  d="M525 365V381M517 373H533"
                  stroke="#2458CC"
                  strokeOpacity="0.35"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                <defs>
                  <linearGradient
                    id="studentHaloGrad"
                    x1="315"
                    y1="48"
                    x2="315"
                    y2="470"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0%" stopColor="#DCE8FF" stopOpacity="0.75" />
                    <stop offset="100%" stopColor="#EBF2FF" stopOpacity="0.2" />
                  </linearGradient>
                  <linearGradient
                    id="studentInnerBlob"
                    x1="330"
                    y1="95"
                    x2="330"
                    y2="422"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0%" stopColor="#B8D0FF" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#DBEAFE" stopOpacity="0.15" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Borderless Cutout Image (compensated for left transparent padding) */}
            <div className="relative z-10 w-[122%] -ml-[18%] sm:w-[116%] sm:-ml-[14%] lg:w-[128%] lg:-ml-[24%] select-none">
              <Image
                src="/images/hero.webp"
                alt="Students smiling and holding books with floating education icons at EducaBridge Academy"
                width={1200}
                height={510}
                priority
                className="w-full h-auto object-contain object-bottom drop-shadow-[0_14px_24px_rgba(9,38,93,0.08)]"
              />
            </div>
          </div>
        </div>

        {/* 4 Feature Cards */}
        <FeatureCards />
      </div>
    </section>
  );
}