"use client";

import React, { useState, useEffect, useRef } from "react";
import { BookOpen, PlayCircle, TrendingUp, Trophy } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Expert-Led Learning",
    subtitle: "Learn from industry & academic mentors",
  },
  {
    icon: PlayCircle,
    title: "Interactive Content",
    subtitle: "Engage & practice with hands-on lessons",
  },
  {
    icon: TrendingUp,
    title: "Track Your Progress",
    subtitle: "Stay on top with clear milestones",
  },
  {
    icon: Trophy,
    title: "Achieve Your Goals",
    subtitle: "Build skills for a brighter future",
  },
];

export default function FeatureCards() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Trigger once and keep visible
        }
      },
      {
        threshold: 0.15, // Starts when 15% of the grid enters the viewport
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="mt-10 sm:mt-24 grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6"
    >
      {features.map((feature, index) => {
        const Icon = feature.icon;
        return (
          <div
            key={feature.title}
            style={{
              transitionDelay: isVisible ? `${index * 110}ms` : "0ms",
            }}
            className={`group p-4 sm:p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-blue-100/90 shadow-xs hover:shadow-xl hover:shadow-blue-900/5 hover:border-blue-200 hover:-translate-y-1 transition-all duration-700 ease-out text-center flex flex-col items-center justify-center space-y-2.5 sm:space-y-3 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#EBF2FF] to-[#DCE8FF] text-[#2458CC] flex items-center justify-center shadow-xs group-hover:scale-110 group-hover:bg-[#2458CC] group-hover:from-[#2458CC] group-hover:to-[#1b45a6] group-hover:text-white transition-all duration-300">
              <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm sm:text-base font-bold text-[#09265D] group-hover:text-[#2458CC] transition-colors leading-snug">
                {feature.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                {feature.subtitle}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}