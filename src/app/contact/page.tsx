"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  MessageSquare,
  User,
  Globe2,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export default function ContactPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [language, setLanguage] = useState("French");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate swift submission feedback
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="bg-white">
      {/* =========================================================================
          HERO BANNER
          ========================================================================= */}
      <section className="relative pt-12 pb-16 sm:pt-16 sm:pb-20 bg-gradient-to-b from-[#EBF2FF] via-[#F4F8FF] to-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 text-[#2458CC] text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Admissions & Support</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-[#09265D] tracking-tight leading-tight max-w-3xl mx-auto">
            Get in Touch with <br className="hidden sm:inline" />
            <span className="text-[#2458CC]">EducaBridge Academy</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Have questions about our live language courses, upcoming batches, or certified examination prep? Send us a message and our academic advisors in Delhi will be glad to assist you.
          </p>
        </div>
      </section>

      {/* =========================================================================
          MAIN CONTACT SECTION: FORM & DETAILS
          ========================================================================= */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            {/* LEFT COLUMN: THE CONTACT FORM (7 cols) */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/90 shadow-xl">
              <div className="mb-8">
                <div className="flex items-center gap-2 text-[#2458CC] text-xs font-bold uppercase tracking-wider mb-2">
                  <MessageSquare className="w-4 h-4" />
                  <span>Send a Message</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#09265D] tracking-tight">
                  How can we help you?
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Fill in your details below and our team will respond within 24 hours.
                </p>
              </div>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-blue-50/80 border border-blue-200 text-center space-y-4 animate-in fade-in-50 duration-300">
                  <div className="w-16 h-16 rounded-full bg-[#2458CC] text-white flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-[#09265D]">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
                    Thank you, <strong>{fullName}</strong>. We have received your inquiry regarding <strong>{language}</strong>. One of our course advisors will reach out to you at <strong>{email}</strong> shortly.
                  </p>
                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setMessage("");
                        setSubject("");
                      }}
                      className="px-6 py-2.5 rounded-full bg-white border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      Send Another Message
                    </button>
                    <Link
                      href="/courses"
                      className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-[#2458CC] text-white text-xs font-semibold hover:bg-[#1b45a6] transition-colors"
                    >
                      <span>Browse All Courses</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name and Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block text-xs font-bold text-[#09265D] uppercase tracking-wider mb-1.5"
                      >
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <User className="w-4 h-4" />
                        </div>
                        <input
                          id="fullName"
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Your name"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2458CC] focus:border-transparent transition-all placeholder:text-slate-400"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs font-bold text-[#09265D] uppercase tracking-wider mb-1.5"
                      >
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <Mail className="w-4 h-4" />
                        </div>
                        <input
                          id="email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@example.com"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2458CC] focus:border-transparent transition-all placeholder:text-slate-400"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Phone & Language Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Phone */}
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-xs font-bold text-[#09265D] uppercase tracking-wider mb-1.5"
                      >
                        Phone / WhatsApp <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <Phone className="w-4 h-4" />
                        </div>
                        <input
                          id="phone"
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 95403 06253"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2458CC] focus:border-transparent transition-all placeholder:text-slate-400"
                        />
                      </div>
                    </div>

                    {/* Language Interested */}
                    <div>
                      <label
                        htmlFor="language"
                        className="block text-xs font-bold text-[#09265D] uppercase tracking-wider mb-1.5"
                      >
                        Course of Interest
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <Globe2 className="w-4 h-4" />
                        </div>
                        <select
                          id="language"
                          value={language}
                          onChange={(e) => setLanguage(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2458CC] focus:border-transparent transition-all bg-white"
                        >
                          <option value="French">French (A1–B2 & DELF/DALF)</option>
                          <option value="English">English Communication & IELTS</option>
                          <option value="German">German (Goethe-Zertifikat A1–B2)</option>
                          <option value="Spanish">Spanish (DELE / SIELE)</option>
                          <option value="Exam Prep">Exam Preparation Only</option>
                          <option value="General Inquiry">General Admissions Question</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-xs font-bold text-[#09265D] uppercase tracking-wider mb-1.5"
                    >
                      Subject
                    </label>
                    <input
                      id="subject"
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g. Inquiring about evening batch timings"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2458CC] focus:border-transparent transition-all placeholder:text-slate-400"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs font-bold text-[#09265D] uppercase tracking-wider mb-1.5"
                    >
                      Your Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us about your learning goals, current language proficiency level, preferred timings, or questions..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2458CC] focus:border-transparent transition-all placeholder:text-slate-400 resize-y"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#2458CC] hover:bg-[#1b45a6] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-[0.98] disabled:opacity-70 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? "Sending Message..." : "Send Message"}</span>
                  </button>

                  <p className="text-[11px] text-slate-400 text-center">
                    We respect your privacy. Your information is only used to respond to your inquiry.
                  </p>
                </form>
              )}
            </div>

            {/* RIGHT COLUMN: CONTACT DETAILS & FAQ CARDS (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Direct Academy Info Card */}
              <div className="bg-[#09265D] text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
                <div>
                  <span className="text-xs font-bold text-blue-300 uppercase tracking-wider">
                    Academy Information
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight mt-1">
                    EducaBridge Academy
                  </h3>
                  <p className="text-xs text-blue-100 mt-2 leading-relaxed">
                    Online language education connecting learners across India and the globe with expert educators.
                  </p>
                </div>

                <div className="space-y-4 pt-2 border-t border-white/10 text-sm">
                  {/* Location */}
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-blue-300">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">Headquarters</p>
                      <p className="text-xs text-slate-300 mt-0.5">
                        Delhi, India &bull; Established 2026
                      </p>
                      <p className="text-[11px] text-blue-200">
                        Live online interactive batches conducted worldwide
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-blue-300">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">Call / WhatsApp</p>
                      <a
                        href="tel:+919540306253"
                        className="text-xs text-blue-200 hover:text-white underline mt-0.5 block"
                      >
                        +91 95403 06253
                      </a>
                      <p className="text-[11px] text-slate-400">
                        Admissions desk open 6 days a week
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-blue-300">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">Email Inquiries</p>
                      <a
                        href="mailto:contact@educabridgeacademy.com"
                        className="text-xs text-blue-200 hover:text-white underline mt-0.5 block"
                      >
                        contact@educabridgeacademy.com
                      </a>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-blue-300">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">Batch & Desk Hours</p>
                      <p className="text-xs text-slate-300 mt-0.5">
                        Monday – Saturday: 8:00 AM – 8:00 PM IST
                      </p>
                      <p className="text-[11px] text-blue-200">
                        5 classes/week &bull; 1.5-hour live sessions
                      </p>
                    </div>
                  </div>
                </div>

                {/* Free Demo Callout */}
                <div className="pt-4 border-t border-white/10">
                  <div className="p-4 rounded-2xl bg-white/10 border border-white/10 space-y-2">
                    <div className="flex items-center gap-2 text-blue-200 text-xs font-bold uppercase">
                      <Sparkles className="w-4 h-4 text-blue-300" />
                      <span>Complimentary Demo</span>
                    </div>
                    <p className="text-xs text-slate-200 leading-snug">
                      Unsure about your proficiency level? Experience our interactive classroom with a free 1.5-hour demo.
                    </p>
                    <div className="pt-1">
                      <Link
                        href="/signin"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-white hover:text-blue-200 transition-colors"
                      >
                        <span>Start Learning / Sign Up &rarr;</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Assistance Box */}
              <div className="p-6 rounded-3xl bg-[#F2F6FF] border border-blue-100 space-y-3">
                <h4 className="font-bold text-[#09265D] text-sm">
                  Quick Admissions Pointers
                </h4>
                <ul className="space-y-2 text-xs text-slate-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2458CC] shrink-0 mt-0.5" />
                    <span><strong>Cohort Sizes:</strong> Capped at 10–15 students to ensure active speaking time.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2458CC] shrink-0 mt-0.5" />
                    <span><strong>Exam Guidance:</strong> Dedicated preparation for DELF, IELTS, TOEFL, Goethe, and DELE.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2458CC] shrink-0 mt-0.5" />
                    <span><strong>Digital Materials:</strong> Coursebooks, audio tracks, and session notes included with enrolment.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}