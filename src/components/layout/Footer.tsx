import React from "react";
import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-[#09265D] text-slate-300 pt-16 pb-10 border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Column (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="light" size="lg" />
            <p className="text-slate-300 text-sm leading-relaxed max-w-sm mt-3">
              EducaBridge Academy is an international online language academy. We connect learners of all ages to world opportunities through live, interactive classes and certified exam preparation.
            </p>
            <div className="pt-2 flex flex-col gap-2 text-xs text-blue-200">
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                Delhi, India &bull; Est. 2026
              </span>
              <span className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                +91 95403 06253
              </span>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-white transition-colors">
                  All Courses
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/signin" className="hover:text-white transition-colors">
                  Student Portal (Sign In / Sign Up)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Courses */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Languages
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/courses#french" className="hover:text-white transition-colors">
                  French Language (A1–B2)
                </Link>
              </li>
              <li>
                <Link href="/courses#english" className="hover:text-white transition-colors">
                  English Communication
                </Link>
              </li>
              <li>
                <Link href="/courses#german" className="hover:text-white transition-colors">
                  German (Goethe Prep)
                </Link>
              </li>
              <li>
                <Link href="/courses#spanish" className="hover:text-white transition-colors">
                  Spanish (DELE Prep)
                </Link>
              </li>
              <li>
                <Link href="/courses#exams" className="hover:text-white transition-colors">
                  IELTS / TOEFL Tracks
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter / Admissions */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Get In Touch
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Have questions about upcoming batches or language levels?
            </p>
            <div className="pt-1">
              <a
                href="tel:+919540306253"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-blue-300" />
                <span>Call +91 95403 06253</span>
              </a>
            </div>
            <p className="text-[11px] text-slate-400 mt-2">
              contact@educabridgeacademy.com
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            &copy; {new Date().getFullYear()} EducaBridge Academy. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/about" className="hover:text-slate-300 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
