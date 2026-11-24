"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type RevealVariant = "fade-up" | "slide-right" | "pop-in" | "scale-in";

interface RevealPartProps {
  children: React.ReactNode;
  variant?: RevealVariant;
  delay?: number;
  className?: string;
}

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
        rootMargin: "0px 0px -45px 0px",
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
    "fade-up": "opacity-0 translate-y-6",
    "slide-right": "opacity-0 translate-x-6 translate-y-3",
    "pop-in": "opacity-0 translate-y-6 scale-90",
    "scale-in": "opacity-0 scale-95",
  };

  const visibleStyles: Record<RevealVariant, string> = {
    "fade-up": "opacity-100 translate-y-0",
    "slide-right": "opacity-100 translate-x-0 translate-y-0",
    "pop-in": "opacity-100 translate-y-0 scale-100",
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

export default function CtaBanner() {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [cardVisible, setCardVisible] = useState(false);

  useEffect(() => {
    const node = cardRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCardVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-14 sm:py-20 bg-[#F4F8FF]">
      <style jsx>{`
        @keyframes glowDrift {
          0%,
          100% {
            transform: translate(0px, 0px) scale(1);
          }
          50% {
            transform: translate(-18px, 14px) scale(1.1);
          }
        }
        .animate-glow-drift {
          animation: glowDrift 8s ease-in-out infinite;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner Container */}
        <div
          ref={cardRef}
          className={`relative rounded-[2rem] bg-gradient-to-r from-[#1748BA] via-[#2458CC] to-[#09265D] text-white p-8 sm:p-12 lg:p-14 shadow-2xl shadow-blue-950/20 overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            cardVisible
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-8 scale-[0.98]"
          }`}
        >
          {/* Background Bridge Silhouette Overlay (Glides up smoothly) */}
          <div
            className={`absolute inset-0 pointer-events-none mix-blend-overlay bg-bottom bg-repeat-x transition-all duration-1000 delay-150 ease-out ${
              cardVisible
                ? "opacity-20 translate-y-0 scale-100"
                : "opacity-0 translate-y-6 scale-105"
            }`}
            style={{
              backgroundImage: "url('/images/bridge-banner.webp')",
              backgroundSize: "cover",
            }}
            aria-hidden="true"
          />

          {/* Subtle Ambient Radial Light Accents */}
          <div
            className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-blue-400/20 blur-3xl pointer-events-none animate-glow-drift"
            aria-hidden="true"
          />
          <div
            className="absolute -left-16 -bottom-24 w-72 h-72 rounded-full bg-sky-300/15 blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          {/* Inner Content: Each Part Triggers Individually on Scroll */}
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl">
              {/* Part 1: Heading */}
              <RevealPart variant="fade-up">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
                  Let&apos;s Build Your Learning Bridge Together
                </h3>
              </RevealPart>

              {/* Part 2: Description */}
              <RevealPart variant="fade-up" delay={80}>
                <p className="text-sm sm:text-base lg:text-lg text-blue-100/90 leading-relaxed">
                  Join EducaBridge Academy today and take the next step towards
                  your academic and career goals.
                </p>
              </RevealPart>
            </div>

            {/* Part 3: CTA Button */}
            <RevealPart variant="pop-in" className="shrink-0">
              <Link
                href="/signin"
                className="group relative overflow-hidden inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-white hover:bg-blue-50 text-[#09265D] font-bold text-sm sm:text-base ring-4 ring-white/15 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 active:scale-[0.98]"
              >
                {/* Hover Light Shimmer */}
                <span
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-blue-200/50 to-transparent pointer-events-none"
                  aria-hidden="true"
                />
                <span className="relative">Get Started</span>
                <ArrowRight className="relative w-4 h-4 text-[#2458CC] transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </RevealPart>
          </div>
        </div>
      </div>
    </section>
  );
}