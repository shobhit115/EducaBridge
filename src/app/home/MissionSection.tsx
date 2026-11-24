"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Compass,
  GraduationCap,
  BookOpenCheck,
  HeartHandshake,
} from "lucide-react";

const missionHighlights = [
  {
    step: "01",
    icon: GraduationCap,
    title: "Quality Education for Everyone",
    description: "Accessible, structured learning paths built for every stage.",
  },
  {
    step: "02",
    icon: BookOpenCheck,
    title: "Concept Clarity with Practice",
    description: "Deep foundational understanding reinforced by real exercises.",
  },
  {
    step: "03",
    icon: HeartHandshake,
    title: "Continuous Support in Your Journey",
    description: "Guided mentorship from first lesson to career milestones.",
  },
];

type RevealVariant = "fade-up" | "slide-right" | "pop-in" | "scale-in";

interface RevealPartProps {
  children: React.ReactNode;
  variant?: RevealVariant;
  delay?: number;
  className?: string;
}

/**
 * Observes an individual element and triggers its entrance animation
 * only when that specific part scrolls into view.
 */
function RevealPart({
  children,
  variant = "fade-up",
  delay = 0,
  className = "",
}: RevealPartProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const timer = setTimeout(() => setHasEntered(true), 750 + delay);
    return () => clearTimeout(timer);
  }, [isVisible, delay]);

  const hiddenStyles: Record<RevealVariant, string> = {
    "fade-up": "opacity-0 translate-y-7",
    "slide-right": "opacity-0 translate-x-7 translate-y-4",
    "pop-in": "opacity-0 translate-y-10 scale-90 -rotate-3",
    "scale-in": "opacity-0 scale-80",
  };

  const visibleStyles: Record<RevealVariant, string> = {
    "fade-up": "opacity-100 translate-y-0",
    "slide-right": "opacity-100 translate-x-0 translate-y-0",
    "pop-in": "opacity-100 translate-y-0 scale-100 rotate-0",
    "scale-in": "opacity-100 scale-100",
  };

  return (
    <div
      ref={ref}
      style={{ transitionDelay: hasEntered ? "0ms" : `${delay}ms` }}
      className={`transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isVisible ? visibleStyles[variant] : hiddenStyles[variant]
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default function MissionSection() {
  const bridgeRef = useRef<HTMLDivElement | null>(null);
  const [bridgeVisible, setBridgeVisible] = useState(false);

  useEffect(() => {
    const node = bridgeRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setBridgeVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative py-12 sm:pt-14 sm:pb-16 lg:pt-16 lg:pb-20 bg-gradient-to-b from-white via-[#F9FBFF] to-[#F2F6FF] overflow-hidden">
      {/* Custom Keyframes for Ambient Motion */}
      <style jsx>{`
        @keyframes capFloat {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-9px) rotate(1.2deg);
          }
        }
        @keyframes blobMorph {
          0%,
          100% {
            transform: scale(1) rotate(0deg);
          }
          50% {
            transform: scale(1.035) rotate(2deg);
          }
        }
        @keyframes arcSweep {
          0%,
          100% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(8deg);
          }
        }
        @keyframes shadowPulse {
          0%,
          100% {
            transform: scaleX(1);
            opacity: 0.9;
          }
          50% {
            transform: scaleX(0.92);
            opacity: 0.65;
          }
        }
        @keyframes starTwinkle {
          0%,
          100% {
            opacity: 0.35;
            transform: scale(0.9);
          }
          50% {
            opacity: 1;
            transform: scale(1.25);
          }
        }
        .animate-cap-float {
          animation: capFloat 5.5s ease-in-out infinite;
        }
        .animate-blob-morph {
          transform-origin: 260px 210px;
          animation: blobMorph 8s ease-in-out infinite;
        }
        .animate-arc-sweep {
          transform-origin: 265px 210px;
          animation: arcSweep 6s ease-in-out infinite;
        }
        .animate-shadow-pulse {
          transform-origin: 260px 358px;
          animation: shadowPulse 5.5s ease-in-out infinite;
        }
        .animate-star-twinkle {
          transform-origin: 92px 289px;
          animation: starTwinkle 3.2s ease-in-out infinite;
        }
      `}</style>

      {/* =====================================================================
          SECTION BACKGROUND: Bridge SVG (Triggers when bottom scrolls in)
          ===================================================================== */}
      <div
        className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden"
        aria-hidden="true"
      >
        <div
          ref={bridgeRef}
          className={`absolute inset-x-0 -bottom-[2px] flex justify-center overflow-hidden transition-all duration-1000 ease-out ${
            bridgeVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <img
            src="/images/home-mission-bridge.svg"
            alt=""
            className="block w-full min-w-[768px] max-w-none h-auto"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* =================================================================
              LEFT COLUMN: Cutout Image + SVG Backdrop (Independent Trigger)
              ================================================================= */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full max-w-[290px] sm:max-w-[360px] lg:max-w-[420px] flex items-center justify-center group">
              {/* Custom SVG Backdrop */}
              <RevealPart
                variant="scale-in"
                className="absolute inset-0 -inset-x-5 -inset-y-3 flex items-center justify-center pointer-events-none select-none"
              >
                <svg
                  viewBox="0 0 520 420"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full object-contain"
                  aria-hidden="true"
                >
                  <path
                    d="M276 34C378 36 468 106 474 204C480 302 396 374 282 378C168 382 62 326 52 224C42 122 174 32 276 34Z"
                    fill="url(#missionBlobGrad)"
                    className="animate-blob-morph"
                  />
                  <path
                    d="M365 72C424 102 458 164 450 232"
                    stroke="url(#goldArcGrad)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray="10 10"
                    className="animate-arc-sweep"
                  />
                  <ellipse
                    cx="265"
                    cy="210"
                    rx="185"
                    ry="145"
                    stroke="#2458CC"
                    strokeOpacity="0.14"
                    strokeWidth="1.75"
                  />
                  <ellipse
                    cx="260"
                    cy="358"
                    rx="165"
                    ry="18"
                    fill="url(#bookPedestalShadow)"
                    className="animate-shadow-pulse"
                  />
                  <circle
                    cx="84"
                    cy="128"
                    r="6"
                    fill="#93C5FD"
                    fillOpacity="0.7"
                  />
                  <circle
                    cx="445"
                    cy="96"
                    r="7"
                    fill="#FBBF24"
                    fillOpacity="0.55"
                  />
                  <circle
                    cx="458"
                    cy="278"
                    r="5"
                    fill="#2458CC"
                    fillOpacity="0.25"
                  />
                  <path
                    d="M92 275L96 285L106 289L96 293L92 303L88 293L78 289L88 285L92 275Z"
                    fill="#F59E0B"
                    fillOpacity="0.6"
                    className="animate-star-twinkle"
                  />
                  <defs>
                    <linearGradient
                      id="missionBlobGrad"
                      x1="260"
                      y1="34"
                      x2="260"
                      y2="378"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0%" stopColor="#DCE8FF" stopOpacity="0.85" />
                      <stop offset="100%" stopColor="#EBF2FF" stopOpacity="0.3" />
                    </linearGradient>
                    <linearGradient
                      id="goldArcGrad"
                      x1="365"
                      y1="72"
                      x2="450"
                      y2="232"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.55" />
                      <stop offset="100%" stopColor="#FBBF24" stopOpacity="0.1" />
                    </linearGradient>
                    <radialGradient
                      id="bookPedestalShadow"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientUnits="userSpaceOnUse"
                      gradientTransform="translate(260 358) scale(165 18)"
                    >
                      <stop offset="0%" stopColor="#09265D" stopOpacity="0.16" />
                      <stop offset="100%" stopColor="#09265D" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                </svg>
              </RevealPart>

              {/* Borderless Cutout Image */}
              <RevealPart variant="pop-in" delay={100} className="relative z-10 w-full">
                <Image
                  src="/images/home-mission.webp"
                  alt="Blue graduation cap with golden tassel resting on stacked books"
                  width={520}
                  height={340}
                  className="w-full h-auto object-contain select-none drop-shadow-[0_14px_22px_rgba(9,38,93,0.12)] animate-cap-float group-hover:[animation-play-state:paused] group-hover:-translate-y-2 transition-transform duration-500 ease-out"
                />
              </RevealPart>
            </div>
          </div>

          {/* =================================================================
              RIGHT COLUMN: Each Part Animates Individually On Scroll
              ================================================================= */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            {/* Part 1: Eyebrow Pill */}
            <RevealPart variant="fade-up">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-blue-200/80 shadow-xs text-xs font-bold uppercase tracking-wider text-[#2458CC]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2458CC] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2458CC]" />
                </span>
                <Compass className="w-3.5 h-3.5 text-[#2458CC]" />
                <span>OUR MISSION</span>
              </div>
            </RevealPart>

            {/* Part 2: Heading & Narrative */}
            <RevealPart variant="fade-up" className="space-y-3">
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-[#09265D] tracking-tight leading-[1.12]">
                Empowering Learners,{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2458CC] via-[#3B82F6] to-[#1D4ED8]">
                  Building Futures
                </span>
              </h2>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                At EducaBridge Academy, we believe in the power of education to
                unlock opportunities. Our goal is to make quality learning
                accessible, engaging, and effective for every learner.
              </p>
            </RevealPart>

            {/* Part 3: Individual Pillar Cards (Each observes its own scroll position) */}
            <div className="space-y-3 pt-1 text-left">
              {missionHighlights.map((item) => {
                const Icon = item.icon;
                return (
                  <RevealPart key={item.title} variant="slide-right">
                    <div className="group relative flex items-start sm:items-center gap-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-blue-100/90 hover:border-blue-300 shadow-sm hover:shadow-lg hover:shadow-blue-900/5 hover:translate-x-1.5 transition-all duration-300">
                      {/* Animated Left Accent Indicator */}
                      <div
                        className="absolute left-0 top-3 bottom-3 w-1 rounded-r-full bg-gradient-to-b from-[#2458CC] to-[#3B82F6] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        aria-hidden="true"
                      />

                      {/* Icon Box */}
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#EBF2FF] to-[#DCE8FF] group-hover:from-[#2458CC] group-hover:to-[#1b45a6] text-[#2458CC] group-hover:text-white flex items-center justify-center shrink-0 shadow-xs transition-all duration-300 group-hover:scale-105 group-hover:-rotate-3">
                        <Icon className="w-5 h-5" />
                      </div>

                      {/* Title & Description */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="text-sm sm:text-base font-bold text-[#09265D] group-hover:text-[#2458CC] transition-colors">
                            {item.title}
                          </h3>
                          <span className="text-xs font-extrabold tracking-widest text-blue-300 group-hover:text-[#2458CC]/60 transition-colors select-none">
                            {item.step}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mt-0.5">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </RevealPart>
                );
              })}
            </div>

            {/* Part 4: Action Buttons (Triggers when scrolled to the bottom of the section) */}
            <RevealPart
              variant="fade-up"
              className="pt-3 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5"
            >
              <Link
                href="/about"
                className="group relative overflow-hidden w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#09265D] via-[#13388A] to-[#2458CC] hover:from-[#071D47] hover:to-[#1B45A6] text-white text-sm sm:text-base font-bold ring-4 ring-white shadow-xl shadow-blue-950/25 hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300 active:scale-[0.98]"
              >
                <span
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
                  aria-hidden="true"
                />
                <span className="relative">Learn More About Us</span>
                <ArrowRight className="relative w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/courses"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/95 hover:bg-white text-[#09265D] border border-blue-200 hover:border-[#2458CC] text-sm sm:text-base font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 active:scale-[0.98]"
              >
                <span>Explore Courses</span>
              </Link>
            </RevealPart>
          </div>
        </div>
      </div>
    </section>
  );
}