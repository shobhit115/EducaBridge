import React from "react";
import Link from "next/link";
import { MapPin, Mail, ArrowUpRight } from "lucide-react";
import Logo from "./Logo";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "All Courses", href: "/courses" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Student Portal", href: "/signin" },
];

const languageLinks = [
  { label: "French (A1–B2)", href: "/courses#french" },
  { label: "English Communication", href: "/courses#english" },
  { label: "German (Goethe Prep)", href: "/courses#german" },
  { label: "Spanish (DELE Prep)", href: "/courses#spanish" },
  { label: "IELTS / TOEFL Tracks", href: "/courses#exams" },
];

const legalLinks = [
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Refund & Cancellation", href: "/refund-policy" },
  { label: "Student Code of Conduct", href: "/code-of-conduct" },
  { label: "Cookie Policy", href: "/cookies" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#1953d1] text-white pt-16 pb-10 mt-auto">
      {/* Subtle ambient glow for visual depth */}
      <div className="pointer-events-none absolute -top-28 -right-28 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -left-28 h-80 w-80 rounded-full bg-blue-950/30 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-white/15">
          {/* Brand Column (3 cols on lg) */}
          <div className="md:col-span-2 lg:col-span-3 space-y-5">
            <Logo variant="light" size="lg" />
            <p className="text-blue-100/90 text-sm leading-relaxed max-w-sm">
              EducaBridge Academy is an international online language academy
              connecting learners of all ages to global opportunities through
              live, interactive classes and certified exam preparation.
            </p>
            <div className="pt-1">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-3.5 py-1.5 text-xs font-medium text-blue-50">
                <MapPin className="w-3.5 h-3.5 text-blue-200 shrink-0" />
                Delhi, India &bull; Est. 2026
              </span>
            </div>
          </div>

          {/* Quick Links (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-semibold text-blue-200 uppercase tracking-widest">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-block text-blue-50/90 hover:text-white hover:translate-x-0.5 transition-all"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Languages (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-semibold text-blue-200 uppercase tracking-widest">
              Languages
            </h4>
            <ul className="space-y-2.5 text-sm">
              {languageLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-block text-blue-50/90 hover:text-white hover:translate-x-0.5 transition-all"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Policies (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-semibold text-blue-200 uppercase tracking-widest">
              Legal &amp; Policies
            </h4>
            <ul className="space-y-2.5 text-sm">
              {legalLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-block text-blue-50/90 hover:text-white hover:translate-x-0.5 transition-all"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get In Touch Card (3 cols on lg) */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl bg-white/[0.08] border border-white/15 p-5 backdrop-blur-sm space-y-4">
              <div className="space-y-1.5">
                <h4 className="text-xs font-semibold text-blue-200 uppercase tracking-widest">
                  Get In Touch
                </h4>
                <p className="text-xs text-blue-100/90 leading-relaxed">
                  Have questions about upcoming batches or language proficiency
                  levels?
                </p>
              </div>

              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-white px-4 py-2.5 text-xs font-semibold text-[#1953d1] shadow-sm hover:bg-blue-50 transition-colors"
              >
                <span>Contact Admissions</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>

              <a
                href="mailto:contact@educabridgeacademy.com"
                className="flex items-center gap-2 text-xs text-blue-100 hover:text-white transition-colors pt-1"
              >
                <Mail className="w-3.5 h-3.5 text-blue-200 shrink-0" />
                <span className="truncate">contact@educabridgeacademy.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-blue-200/80">
          <p>
            &copy; {new Date().getFullYear()} EducaBridge Academy. All rights
            reserved.
          </p>
          <p className="text-blue-200/80">
            CEFR-Aligned Curriculum &bull; Live Global Batches
          </p>
        </div>
      </div>
    </footer>
  );
}