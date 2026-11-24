"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Video,
  Users,
  BookOpen,
  LogOut,
  Clock,
  ExternalLink,
  Loader2,
  Calendar,
} from "lucide-react";
import Logo from "@/components/layout/Logo";
import { createClient } from "@/lib/supabase/client";

interface TeacherProfile {
  id: string;
  full_name: string;
  email: string;
  preferred_language: string;
}

interface BatchStudent {
  student_id: string;
  enrolled_at: string;
  student: {
    id: string;
    full_name: string;
    email: string;
    phone?: string;
  };
}

interface TeacherBatch {
  id: string;
  code: string;
  language: string;
  level: string;
  schedule: string;
  max_students: number;
  meeting_link?: string;
  status: string;
  batch_students?: { count: number }[];
}

export default function TeacherDashboardPage() {
  const router = useRouter();
  const supabase = createClient();

  const [profile, setProfile] = useState<TeacherProfile | null>(null);
  const [batches, setBatches] = useState<TeacherBatch[]>([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  const [activeBatchId, setActiveBatchId] = useState<string | null>(null);
  const [batchStudents, setBatchStudents] = useState<BatchStudent[]>([]);
  const [studentsLoading, setStudentsLoading] = useState(false);

  useEffect(() => {
    async function init() {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) { router.push("/signin"); return; }

      const { data: prof } = await supabase
        .from("profiles")
        .select("id, full_name, email, preferred_language, role")
        .eq("id", user.id)
        .single();

      if (!prof || prof.role !== "teacher") {
        router.push("/student/dashboard");
        return;
      }

      setProfile(prof);

      // Fetch batches assigned to this teacher
      const { data: batchData } = await supabase
        .from("batches")
        .select(`id, code, language, level, schedule, max_students, meeting_link, status, batch_students(count)`)
        .eq("teacher_id", user.id)
        .order("created_at", { ascending: false });

      setBatches(batchData || []);
      setPageLoading(false);
    }
    init();
  }, [router, supabase]);

  const loadBatchStudents = async (batchId: string) => {
    setActiveBatchId(batchId);
    setStudentsLoading(true);
    const { data } = await supabase
      .from("batch_students")
      .select(`student_id, enrolled_at, student:student_id(id, full_name, email, phone)`)
      .eq("batch_id", batchId);
    setBatchStudents((data as unknown as BatchStudent[]) || []);
    setStudentsLoading(false);
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    await supabase.auth.signOut();
    router.push("/signin");
    router.refresh();
  };

  if (pageLoading) {
    return (
      <div className="min-h-screen bg-[#F5F8FF] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-9 h-9 border-[3px] border-[#09265D] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-bold text-[#09265D] uppercase tracking-wider">Loading Instructor Portal…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F8FF] text-slate-800">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200/80 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Logo size="md" />
            <div className="hidden sm:flex items-center gap-2 pl-4 border-l border-slate-200">
              <span className="px-2.5 py-0.5 rounded-full bg-purple-600 text-white text-xs font-bold uppercase tracking-wider">
                Instructor
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 pr-3 border-r border-slate-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs text-slate-600 font-medium">
                <strong className="text-[#09265D]">{profile?.full_name}</strong>
              </span>
            </div>
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-red-600 hover:bg-red-50 border border-slate-200 hover:border-red-200 transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              {loggingOut ? "Signing Out…" : "Sign Out"}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Welcome */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#09265D] tracking-tight">
            Welcome, {profile?.full_name?.split(" ")[0]}! 👋
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Here are your assigned language cohorts and student rosters.
          </p>
        </div>

        {/* KPI strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">My Batches</span>
              <BookOpen className="w-5 h-5 text-[#2458CC]" />
            </div>
            <p className="text-3xl font-black text-[#09265D]">{batches.length}</p>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Students</span>
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-3xl font-black text-[#09265D]">
              {batches.reduce((acc, b) => acc + (b.batch_students?.[0]?.count ?? 0), 0)}
            </p>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm col-span-2 sm:col-span-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Language</span>
              <BookOpen className="w-5 h-5 text-amber-500" />
            </div>
            <p className="text-xl font-black text-[#09265D]">{profile?.preferred_language}</p>
          </div>
        </div>

        {/* Batches */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h2 className="text-base font-black text-[#09265D]">My Language Cohorts</h2>
            <p className="text-xs text-slate-500 mt-0.5">Click a cohort to view its student roster.</p>
          </div>

          {batches.length === 0 ? (
            <div className="p-12 text-center text-slate-400 text-sm">
              No batches assigned yet. Contact the admin to get assigned to a cohort.
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {batches.map((batch) => {
                const enrolled = batch.batch_students?.[0]?.count ?? 0;
                const isActive = activeBatchId === batch.id;
                return (
                  <div key={batch.id}>
                    <div
                      className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 cursor-pointer transition-colors"
                      onClick={() => isActive ? setActiveBatchId(null) : loadBatchStudents(batch.id)}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#EBF2FF] to-[#DCE8FF] text-[#2458CC] font-black text-xs flex items-center justify-center shrink-0">
                          {batch.code}
                        </div>
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-extrabold text-[#09265D]">
                              {batch.language} · {batch.level}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold capitalize ${
                                batch.status === "active"
                                  ? "bg-emerald-50 text-emerald-700"
                                  : "bg-amber-50 text-amber-700"
                              }`}
                            >
                              {batch.status}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-slate-500">
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{batch.schedule}</span>
                            <span className="flex items-center gap-1"><Users className="w-3 h-3" />{enrolled}/{batch.max_students}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {batch.meeting_link && (
                          <a
                            href={batch.meeting_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs transition-colors"
                          >
                            <Video className="w-3.5 h-3.5" /> Start Class
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                        <span className="text-xs text-slate-400 font-medium">
                          {isActive ? "▲ Hide" : "▼ Roster"}
                        </span>
                      </div>
                    </div>

                    {/* Expandable student roster */}
                    {isActive && (
                      <div className="px-6 pb-6 bg-slate-50/60">
                        <h3 className="text-xs font-bold text-[#09265D] uppercase tracking-wider mb-3 pt-4">
                          <Calendar className="w-3.5 h-3.5 inline mr-1" />
                          Student Roster — {batch.code}
                        </h3>
                        {studentsLoading ? (
                          <div className="flex items-center gap-2 text-sm text-slate-400 py-4">
                            <Loader2 className="w-4 h-4 animate-spin" /> Loading students…
                          </div>
                        ) : batchStudents.length === 0 ? (
                          <p className="text-xs text-slate-400 py-4">No students enrolled yet.</p>
                        ) : (
                          <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs">
                              <thead>
                                <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider">
                                  <th className="py-2 px-2">#</th>
                                  <th className="py-2 px-2">Name</th>
                                  <th className="py-2 px-2">Email</th>
                                  <th className="py-2 px-2">Phone</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100">
                                {batchStudents.map((entry, idx) => (
                                  <tr key={entry.student_id} className="hover:bg-white/80 transition-colors">
                                    <td className="py-2.5 px-2 text-slate-400 font-bold">{idx + 1}</td>
                                    <td className="py-2.5 px-2 font-bold text-[#09265D]">{entry.student?.full_name}</td>
                                    <td className="py-2.5 px-2 text-slate-600">{entry.student?.email}</td>
                                    <td className="py-2.5 px-2 text-slate-500">{entry.student?.phone || "—"}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
