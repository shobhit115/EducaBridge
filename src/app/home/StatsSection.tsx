"use client";

import React, { useEffect, useRef, useState } from "react";
import { GraduationCap, PlayCircle, Star, Trophy } from "lucide-react";

interface StatItem {
  icon: React.ElementType;
  target: number;
  decimals?: number;
  suffix: string;
  label: string;
}

const stats: StatItem[] = [
  {
    icon: GraduationCap,
    target: 50,
    suffix: "K+",
    label: "Active Students",
  },
  {
    icon: PlayCircle,
    target: 1,
    suffix: "K+",
    label: "Hours of Content",
  },
  {
    icon: Star,
    target: 4.8,
    decimals: 1,
    suffix: "/5",
    label: "Learner Rating",
  },
  {
    icon: Trophy,
    target: 95,
    suffix: "%",
    label: "Success Rate",
  },
];

function AnimatedCounter({
  target,
  decimals = 0,
  suffix = "",
  start,
  duration = 1800,
}: {
  target: number;
  decimals?: number;
  suffix?: string;
  start: boolean;
  duration?: number;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let animationFrameId: number;
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic curve for smooth deceleration at the final number
      const eased = 1 - Math.pow(1 - progress, 3);

      setCount(eased * target);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [start, target, duration]);

  const displayValue =
    decimals > 0 ? count.toFixed(decimals) : Math.round(count).toString();

  return (
    <span className="tabular-nums">
      {displayValue}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-14 sm:py-20 bg-[#1953d1] text-white overflow-hidden"
    >
      
        
        

      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="group relative flex flex-col items-center text-center p-6 sm:p-7 rounded-3xl bg-white/10 hover:bg-white/[0.16] backdrop-blur-md border border-white/20 hover:border-white/40 shadow-lg shadow-blue-950/15 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Top subtle shine line */}
                <div
                  className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"
                  aria-hidden="true"
                />

                {/* Icon Container */}
                <div className="w-12 h-12 rounded-2xl bg-white text-[#1953d1] flex items-center justify-center mb-4 shadow-md shadow-blue-950/20 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6" />
                </div>

                {/* Animated Metric Value */}
                <span className="text-3xl sm:text-4xl lg:text-[42px] font-black text-white tracking-tight leading-none">
                  <AnimatedCounter
                    target={stat.target}
                    decimals={stat.decimals}
                    suffix={stat.suffix}
                    start={inView}
                  />
                </span>

                {/* Metric Label */}
                <span className="text-xs sm:text-sm font-semibold text-blue-100/90 mt-2.5 tracking-wide">
                  {stat.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}