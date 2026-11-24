"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Video,
  Calendar,
  Clock,
  BookOpen,
  Award,
  CheckCircle2,
  Download,
  Users,
  LogOut,
  ExternalLink,
  FileText,
  GraduationCap,
} from "lucide-react";
import Logo from "@/components/layout/Logo";
import { createClient } from "@/lib/supabase/client";

interface StudentInfo {
  name: string;
  email: string;
  language: string;
  level: string;
  cohort: string;
}

export default function StudentDashboardPage() {
  const router = useRouter();
  const supabase = createClient();

  const [student, setStudent] = useState<StudentInfo>({
    name: "Alex Sharma",
    email: "student@educabridgeacademy.com",
    language: "French",
    level: "A2 Elementary Fluency",
    cohort: "Cohort FR-104 (12/15 Learners)",
  });
  const [activeTab, setActiveTab] = useState<"overview" | "schedule" | "materials">("overview");
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    async function loadStudentProfile() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("full_name, preferred_language")
            .eq("id", user.id)
            .single();

          setStudent({
            name: profile?.full_name || user.user_metadata?.full_name || "Alex Sharma",
            email: user.email || "student@educabridgeacademy.com",
            language: profile?.preferred_language || user.user_metadata?.preferred_language || "French",
            level: "A2 Elementary Fluency",
            cohort: "Cohort FR-104 (12/15 Learners)",
          });
        }
      } catch (err) {
        console.error("Error loading student profile:", err);
      }
    }
    loadStudentProfile();
  }, [supabase]);

  const handleSignOut = async () => {
    setLoggingOut(true);
    await supabase.auth.signOut();
    router.push("/signin");
    router.refresh();
  };

  const scheduleItems = [
    {
      day: "Monday",
      time: "6:00 PM – 7:30 PM IST",
      topic: "Grammar & Conjugation: Passé Composé vs. Imparfait",
      instructor: "Mme. Claire Dubois",
      status: "Upcoming Today",
      isToday: true,
      link: "https://meet.google.com/edu-fr-104",
    },
    {
      day: "Tuesday",
      time: "6:00 PM – 7:30 PM IST",
      topic: "Live Speaking Clinic: Expressing Daily Habits & Routines",
      instructor: "Mme. Claire Dubois",
      status: "Scheduled",
      isToday: false,
      link: "https://meet.google.com/edu-fr-104",
    },
    {
      day: "Wednesday",
      time: "6:00 PM – 7:30 PM IST",
      topic: "Listening Immersion & Native Accent Drill (Audio lab)",
      instructor: "M. Antoine Laurent",
      status: "Scheduled",
      isToday: false,
      link: "https://meet.google.com/edu-fr-104",
    },
    {
      day: "Thursday",
      time: "6:00 PM – 7:30 PM IST",
      topic: "Vocabulary Expansion: Travel, Hotel & Ordering Cuisine",
      instructor: "Mme. Claire Dubois",
      status: "Scheduled",
      isToday: false,
      link: "https://meet.google.com/edu-fr-104",
    },
    {
      day: "Friday",
      time: "6:00 PM – 7:30 PM IST",
      topic: "DELF A2 Practical Exam Simulation & Speaking Debates",
      instructor: "Mme. Claire Dubois",
      status: "Scheduled",
      isToday: false,
      link: "https://meet.google.com/edu-fr-104",
    },
  ];

  const syllabusModules = [
    {
      module: "Module 1",
      title: "Foundations & Phonetics",
      status: "Completed",
      lessons: "6 / 6 Live Sessions",
      score: "98% Quiz Score",
    },
    {
      module: "Module 2",
      title: "Daily Life, Narration & Tenses",
      status: "In Progress (75%)",
      lessons: "5 / 8 Live Sessions",
      score: "Live Cohort Active",
    },
    {
      module: "Module 3",
      title: "Workplace & Travel Conversational Drills",
      status: "Upcoming",
      lessons: "0 / 6 Live Sessions",
      score: "Starts next week",
    },
    {
      module: "Module 4",
      title: "Official DELF A2 Exam Masterclass",
      status: "Upcoming",
      lessons: "0 / 4 Live Sessions",
      score: "Capstone & Certificate",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5F8FF] text-slate-800">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Logo size="md" />
            <div className="hidden sm:flex items-center gap-2 pl-4 border-l border-slate-200">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[#2458CC] border border-blue-200/70 text-xs font-bold uppercase tracking-wider">
                Student Workspace
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-3 pr-3 border-r border-slate-200">
              <div className="text-right">
                <p className="text-xs font-bold text-[#09265D] leading-tight">{student.name}</p>
                <p className="text-[11px] text-slate-500">{student.language} • {student.level.split(" ")[0]}</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-[#1953d1] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                {student.name.charAt(0)}
              </div>
            </div>

            <button
              onClick={handleSignOut}
              disabled={loggingOut}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-red-600 hover:bg-red-50 border border-slate-200 hover:border-red-200 transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>{loggingOut ? "Signing Out..." : "Sign Out"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Next Class Hero Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#09265D] via-[#1953d1] to-[#2458CC] text-white p-6 sm:p-8 lg:p-10 shadow-xl shadow-blue-950/15">
          <div
            aria-hidden="true"
            className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none"
          />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs border border-white/20 text-xs font-bold tracking-wide">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span>Next Live Session Today</span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
                Grammar &amp; Conjugation: Passé Composé
              </h1>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm text-blue-100">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-blue-200" />
                  <span>Today, 6:00 PM – 7:30 PM IST</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-blue-200" />
                  <span>{student.cohort}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-blue-200" />
                  <span>Instructor: Mme. Claire Dubois</span>
                </div>
              </div>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href="https://meet.google.com/edu-fr-104"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl bg-white hover:bg-blue-50 text-[#09265D] font-extrabold text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 active:scale-[0.98]"
              >
                <Video className="w-4 h-4 text-[#2458CC] group-hover:scale-110 transition-transform" />
                <span>Join Live Classroom</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#2458CC]" />
              </a>
            </div>
          </div>
        </div>

        {/* Quick Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:border-blue-200 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Attendance Rate</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-black text-[#09265D]">96%</p>
            <p className="text-xs text-slate-500 mt-1">23 of 24 cohorts attended</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:border-blue-200 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Course Progress</span>
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#2458CC] flex items-center justify-center">
                <BookOpen className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-black text-[#09265D]">68%</p>
            <p className="text-xs text-slate-500 mt-1">Module 2 in progress</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:border-blue-200 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Cohort Limit</span>
              <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-black text-[#09265D]">12 / 15</p>
            <p className="text-xs text-slate-500 mt-1">Small group 2-way speaking</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:border-blue-200 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Target Exam</span>
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                <Award className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-black text-[#09265D]">DELF A2</p>
            <p className="text-xs text-slate-500 mt-1">Mock test in 14 days</p>
          </div>
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === "overview"
                ? "bg-[#2458CC] text-white shadow-xs"
                : "text-slate-600 hover:text-[#09265D] hover:bg-slate-100"
            }`}
          >
            Weekly Live Schedule
          </button>
          <button
            onClick={() => setActiveTab("schedule")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === "schedule"
                ? "bg-[#2458CC] text-white shadow-xs"
                : "text-slate-600 hover:text-[#09265D] hover:bg-slate-100"
            }`}
          >
            Syllabus Progression
          </button>
          <button
            onClick={() => setActiveTab("materials")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === "materials"
                ? "bg-[#2458CC] text-white shadow-xs"
                : "text-slate-600 hover:text-[#09265D] hover:bg-slate-100"
            }`}
          >
            Lesson Notes &amp; Recordings
          </button>
        </div>

        {/* Tab 1: Weekly Schedule Table */}
        {activeTab === "overview" && (
          <div className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs">
            <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-black text-[#09265D]">Weekly Live Cohort Timetable</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Live classes run 5 days a week (Mon–Fri). Doubts and speaking practice are encouraged in every session.
                </p>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#2458CC] text-xs font-bold">
                <Calendar className="w-3.5 h-3.5" />
                <span>IST Timezone (UTC+5:30)</span>
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {scheduleItems.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${
                    item.isToday ? "bg-blue-50/50" : "hover:bg-slate-50/60"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex flex-col items-center justify-center shrink-0 shadow-2xs">
                      <span className="text-[10px] font-black text-slate-400 uppercase">{item.day.slice(0, 3)}</span>
                      <span className="text-sm font-black text-[#09265D]">#{idx + 1}</span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-extrabold text-[#09265D]">{item.topic}</span>
                        {item.isToday && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-[10px] uppercase">
                            Today
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-x-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          {item.time}
                        </span>
                        <span>•</span>
                        <span>Teacher: {item.instructor}</span>
                      </div>
                    </div>
                  </div>

                  <div className="sm:self-center shrink-0">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        item.isToday
                          ? "bg-[#2458CC] hover:bg-[#1b45a6] text-white shadow-xs hover:shadow-md"
                          : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                      }`}
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>{item.isToday ? "Enter Classroom" : "Class Link"}</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Syllabus Progression */}
        {activeTab === "schedule" && (
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
            <div>
              <h2 className="text-lg font-black text-[#09265D]">Curriculum Roadmap &amp; Milestones</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Detailed progression from foundational pronunciation to official CEFR exam benchmarks.
              </p>
            </div>

            <div className="space-y-4">
              {syllabusModules.map((mod, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl border border-slate-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-blue-200 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2458CC] flex items-center justify-center font-bold text-xs shrink-0">
                      0{idx + 1}
                    </div>
                    <div>
                      <h3 className="text-sm font-extrabold text-[#09265D]">{mod.title}</h3>
                      <p className="text-xs text-slate-500">{mod.lessons} • {mod.score}</p>
                    </div>
                  </div>

                  <span className={`self-start sm:self-center px-3 py-1 rounded-full text-xs font-bold ${
                    mod.status === "Completed"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : mod.status.includes("In Progress")
                      ? "bg-blue-50 text-[#2458CC] border border-blue-200"
                      : "bg-slate-100 text-slate-500"
                  }`}>
                    {mod.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Materials & Downloads */}
        {activeTab === "materials" && (
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
            <div>
              <h2 className="text-lg font-black text-[#09265D]">Lesson Notes &amp; Recorded Sessions</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Download PDF lesson summaries, vocabulary flashcards, and access video replay archives.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl border border-slate-200/80 hover:border-blue-300 transition-all flex flex-col justify-between space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-[#09265D]">Passé Composé Handout</h4>
                    <p className="text-[11px] text-slate-500">PDF • 2.4 MB • Updated yesterday</p>
                  </div>
                </div>
                <button className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer">
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </button>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200/80 hover:border-blue-300 transition-all flex flex-col justify-between space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2458CC] flex items-center justify-center shrink-0">
                    <Video className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-[#09265D]">Session 23 Replay Video</h4>
                    <p className="text-[11px] text-slate-500">74 mins • HD Classroom Recording</p>
                  </div>
                </div>
                <button className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer">
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Watch Replay</span>
                </button>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200/80 hover:border-blue-300 transition-all flex flex-col justify-between space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-[#09265D]">DELF A2 Mock Exam Paper</h4>
                    <p className="text-[11px] text-slate-500">Sample Listening &amp; Writing Set</p>
                  </div>
                </div>
                <button className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer">
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Sample</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
