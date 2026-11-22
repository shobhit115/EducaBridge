import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CtaBanner() {
  return (
    <section className="py-14 sm:py-20 bg-[#F4F8FF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[2rem] bg-gradient-to-r from-[#1748BA] via-[#2458CC] to-[#09265D] text-white p-8 sm:p-12 lg:p-14 shadow-2xl shadow-blue-950/20 overflow-hidden">
          {/* Background bridge image / silhouette overlay */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay bg-bottom bg-repeat-x"
            style={{
              backgroundImage: "url('/images/bridge-banner.jpg')",
              backgroundSize: "cover",
            }}
            aria-hidden="true"
          />

          {/* Subtle Radial Light Accent */}
          <div
            className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-blue-400/20 blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
                Let&apos;s Build Your Learning Bridge Together
              </h3>
              <p className="text-sm sm:text-base lg:text-lg text-blue-100/90 leading-relaxed">
                Join EducaBridge Academy today and take the next step towards
                your academic and career goals.
              </p>
            </div>

            <div className="shrink-0">
              <Link
                href="/signin"
                className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-white hover:bg-blue-50 text-[#09265D] font-bold text-sm sm:text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 active:scale-[0.98]"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 text-[#2458CC] transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}