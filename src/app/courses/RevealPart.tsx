"use client";

import React, { useEffect, useRef, useState } from "react";

export type RevealVariant =
  | "fade-up"
  | "slide-right"
  | "slide-left"
  | "pop-in"
  | "scale-in";

interface RevealPartProps {
  children: React.ReactNode;
  variant?: RevealVariant;
  delay?: number;
  immediate?: boolean;
  className?: string;
}

export default function RevealPart({
  children,
  variant = "fade-up",
  delay = 0,
  immediate = false,
  className = "",
}: RevealPartProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    if (immediate) {
      const frame = requestAnimationFrame(() => setIsVisible(true));
      return () => cancelAnimationFrame(frame);
    }

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
        threshold: 0.15,
        rootMargin: "0px 0px -45px 0px",
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [immediate]);

  useEffect(() => {
    if (!isVisible) return;
    const timer = setTimeout(() => setHasEntered(true), 750 + delay);
    return () => clearTimeout(timer);
  }, [isVisible, delay]);

  const hiddenStyles: Record<RevealVariant, string> = {
    "fade-up": "opacity-0 translate-y-7",
    "slide-right": "opacity-0 -translate-x-6 translate-y-3",
    "slide-left": "opacity-0 translate-x-6 translate-y-3",
    "pop-in": "opacity-0 translate-y-8 scale-90",
    "scale-in": "opacity-0 scale-95",
  };

  const visibleStyles: Record<RevealVariant, string> = {
    "fade-up": "opacity-100 translate-y-0",
    "slide-right": "opacity-100 translate-x-0 translate-y-0",
    "slide-left": "opacity-100 translate-x-0 translate-y-0",
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