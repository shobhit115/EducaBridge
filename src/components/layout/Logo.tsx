import React from "react";
import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  className?: string;
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
}

export default function Logo({
  className = "",
  variant = "dark",
  size = "md",
}: LogoProps) {
  const isLight = variant === "light";

  const sizeClasses = {
    sm: "h-7 w-auto",
    md: "h-9 w-auto",
    lg: "h-11 w-auto",
  }[size];

  const dimensions = {
    sm: { width: 38, height: 28 },
    md: { width: 48, height: 36 },
    lg: { width: 60, height: 44 },
  }[size];

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 group transition-opacity hover:opacity-95 focus:outline-none ${className}`}
      aria-label="EducaBridge Academy Homepage"
    >
      {/* Official emblem icon from logo.svg */}
      <div className="relative flex items-center justify-center shrink-0">
        <Image
          src="/logo.svg"
          alt="EducaBridge Academy"
          width={dimensions.width}
          height={dimensions.height}
          priority
          className={`${sizeClasses} object-contain ${
            isLight ? "brightness-0 invert" : ""
          }`}
        />
      </div>

      {/* Typography */}
      <div className="flex flex-col leading-tight">
        <span
          className={`font-extrabold tracking-tight text-lg sm:text-xl font-sans ${
            isLight ? "text-white" : "text-[#09265D]"
          }`}
        >
          EducaBridge
        </span>
        <span
          className={`text-xs font-semibold tracking-wide ${
            isLight ? "text-blue-200" : "text-[#2458CC]"
          }`}
        >
          Academy
        </span>
      </div>
    </Link>
  );
}
