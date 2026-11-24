"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Users,
  Video,
  Plus,
  Mail,
  Search,
  LogOut,
  BookOpen,
  ShieldCheck,
  Server,
  UserPlus,
  X,
  RefreshCw,
  Phone,
  Globe2,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import Logo from "@/components/layout/Logo";

interface AdminSession {
  authenticated: boolean;
  email?: string;
}

interface Teacher {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  preferred_language?: string;
}

interface Student {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  preferred_language?: string;
}

interface Batch {
  id: string;
  code: string;
  language: string;
  level: string;
  teacher_id?: string;
  teacher?: { id: string; full_name: string; email: string } | null;
  schedule: string;
  max_students: number;
  meeting_link?: string;
  status: string;
  batch_students?: { count: number }[];
}

export default function AdminDashboardPage() {
  const router = useRouter();

  const [session, setSession] = useState<AdminSession | null>(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"batches" | "teachers" | "students" | "system">("batches");
  const [loggingOut, setLoggingOut] = useState(false);

  // Data state
  const [batches, setBatches] = useState<Batch[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [dataLoading, setDataLoading] = useState(false);

  // Batch search
  const [batchSearch, setBatchSearch] = useState("");
  const [langFilter, setLangFilter] = useState("All");

  // Modals
  const [showBatchModal, setShowBatchModal] = useState(false);
  const [showTeacherModal, setShowTeacherModal] = useState(false);
  const [showAddStudentModal, setShowAddStudentModal] = useState<string | null>(null); // batchId
  const [showBatchStudentsModal, setShowBatchStudentsModal] = useState<string | null>(null); // batchId
  const [batchStudentsList, setBatchStudentsList] = useState<
    { student_id: string; enrolled_at: string; student: Student }[]
  >([]);

  // Feedback
  const [modalError, setModalError] = useState<string | null>(null);
  const [modalSuccess, setModalSuccess] = useState<string | null>(null);
  const [modalLoading, setModalLoading] = useState(false);

  // Create batch form
  const [newBatch, setNewBatch] = useState({
    language: "French",
    level: "A1 Beginner",
    teacherId: "",
    schedule: "Mon–Fri, 6:00 PM – 7:30 PM IST",
    maxStudents: 15,
    meetingLink: "",
  });

  // Create teacher form
  const [newTeacher, setNewTeacher] = useState({
    fullName: "",
    email: "",
    phone: "",
    language: "French",
  });

  // Add student to batch
  const [addStudentId, setAddStudentId] = useState("");

  const fetchAll = useCallback(async () => {
    setDataLoading(true);
    try {
      const [bRes, tRes, sRes] = await Promise.all([
        fetch("/api/admin/create-batch"),
        fetch("/api/admin/list-teachers"),
        fetch("/api/admin/list-students"),
      ]);
      const [bData, tData, sData] = await Promise.all([bRes.json(), tRes.json(), sRes.json()]);
      if (bData.batches) setBatches(bData.batches);
      if (tData.teachers) setTeachers(tData.teachers);
      if (sData.students) setStudents(sData.students);
    } catch (err) {
      console.error("fetchAll error:", err);
    } finally {
      setDataLoading(false);
    }
  }, []);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/admin-session");
        const data = await res.json();
        if (!res.ok || !data.authenticated) {
          router.push("/signin");
        } else {
          setSession({ authenticated: true, email: data.email });
          fetchAll();
        }
      } catch {
        router.push("/signin");
      } finally {
        setPageLoading(false);
      }
    }
    checkAuth();
  }, [router, fetchAll]);

  const handleAdminLogout = async () => {
    setLoggingOut(true);
    await fetch("/api/auth/admin-logout", { method: "POST" });
    router.push("/signin");
    router.refresh();
  };

  // ── Create Batch ──────────────────────────────────────────────────────────
  const handleCreateBatch = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalError(null);
    setModalSuccess(null);
    setModalLoading(true);
    const res = await fetch("/api/admin/create-batch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBatch),
    });
    const data = await res.json();
    setModalLoading(false);
    if (!res.ok) { setModalError(data.error); return; }
    setModalSuccess(`Batch ${data.batch?.code} created!`);
    fetchAll();
    setTimeout(() => { setShowBatchModal(false); setModalSuccess(null); setNewBatch({ language: "French", level: "A1 Beginner", teacherId: "", schedule: "Mon–Fri, 6:00 PM – 7:30 PM IST", maxStudents: 15, meetingLink: "" }); }, 1200);
  };

  // ── Create Teacher ────────────────────────────────────────────────────────
  const handleCreateTeacher = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalError(null);
    setModalSuccess(null);
    setModalLoading(true);
    const res = await fetch("/api/admin/create-teacher", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTeacher),
    });
    const data = await res.json();
    setModalLoading(false);
    if (!res.ok) { setModalError(data.error); return; }
    setModalSuccess(`Teacher added! Credentials sent to ${newTeacher.email}.`);
    fetchAll();
    setTimeout(() => { setShowTeacherModal(false); setModalSuccess(null); setNewTeacher({ fullName: "", email: "", phone: "", language: "French" }); }, 1800);
  };

  // ── Add Student to Batch ──────────────────────────────────────────────────
  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!showAddStudentModal || !addStudentId) return;
    setModalError(null);
    setModalSuccess(null);
    setModalLoading(true);
    const res = await fetch("/api/admin/batch-students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ batchId: showAddStudentModal, studentId: addStudentId }),
    });
    const data = await res.json();
    setModalLoading(false);
    if (!res.ok) { setModalError(data.error); return; }
    setModalSuccess("Student added to batch!");
    fetchAll();
    setAddStudentId("");
    setTimeout(() => setModalSuccess(null), 1500);
  };

  // ── View batch students ───────────────────────────────────────────────────
  const openBatchStudents = async (batchId: string) => {
    setShowBatchStudentsModal(batchId);
    const res = await fetch(`/api/admin/batch-students?batchId=${batchId}`);
    const data = await res.json();
    setBatchStudentsList(data.students || []);
  };

  const removeStudentFromBatch = async (batchId: string, studentId: string) => {
    await fetch("/api/admin/batch-students", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ batchId, studentId }),
    });
    openBatchStudents(batchId);
    fetchAll();
  };

  const filteredBatches = batches.filter((b) => {
    const matchLang = langFilter === "All" || b.language === langFilter;
    const q = batchSearch.toLowerCase();
    const matchQ =
      !q ||
      b.code.toLowerCase().includes(q) ||
      b.level.toLowerCase().includes(q) ||
      (b.teacher?.full_name || "").toLowerCase().includes(q);
    return matchLang && matchQ;
  });

  const studentCount = batches.reduce((acc, b) => acc + (b.batch_students?.[0]?.count ?? 0), 0);

  if (pageLoading) {
    return (
      <div className="min-h-screen bg-[#F5F8FF] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-9 h-9 border-[3px] border-[#09265D] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-bold text-[#09265D] uppercase tracking-wider">Verifying Admin Session…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F8FF] text-slate-800">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Logo size="md" />
            <div className="hidden sm:flex items-center gap-2 pl-4 border-l border-slate-200">
              <span className="px-2.5 py-0.5 rounded-full bg-[#09265D] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-300" />
                Admin Suite
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2.5 pr-3 border-r border-slate-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs text-slate-600 font-medium">
                Admin: <strong className="text-[#09265D]">{session?.email}</strong>
              </span>
            </div>
            <button
              onClick={fetchAll}
              disabled={dataLoading}
              title="Refresh data"
              className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:text-[#09265D] hover:bg-slate-50 transition-all cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${dataLoading ? "animate-spin" : ""}`} />
            </button>
            <button
              onClick={handleAdminLogout}
              disabled={loggingOut}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-red-600 hover:bg-red-50 border border-slate-200 hover:border-red-200 transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>{loggingOut ? "Signing Out…" : "Sign Out"}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#09265D] tracking-tight">
              Academy Operations & Control
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Manage live batches, instructors, and student enrollments.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => { setModalError(null); setModalSuccess(null); setShowTeacherModal(true); }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-[#09265D] font-bold text-xs sm:text-sm border border-slate-200 shadow-sm transition-all cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              <span>Add Teacher</span>
            </button>
            <button
              onClick={() => { setModalError(null); setModalSuccess(null); setShowBatchModal(true); }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#2458CC] hover:bg-[#1b45a6] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>New Batch</span>
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Active Students", value: studentCount, sub: `${students.length} registered`, icon: Users, color: "blue" },
            { label: "Live Batches", value: batches.length, sub: "10–15 / cohort", icon: BookOpen, color: "emerald" },
            { label: "Instructors", value: teachers.length, sub: "Assigned faculty", icon: UserPlus, color: "purple" },
            { label: "Today's Sessions", value: batches.filter(b => b.status === "active").length, sub: "Mon–Fri", icon: Video, color: "amber" },
          ].map(({ label, value, sub, icon: Icon, color }) => (
            <div key={label} className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{label}</span>
                <div className={`w-8 h-8 rounded-lg bg-${color}-50 text-${color}-600 flex items-center justify-center`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <p className="text-3xl font-black text-[#09265D]">{value}</p>
              <p className="text-xs text-slate-500 mt-1">{sub}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 border-b border-slate-200 pb-0 overflow-x-auto">
          {(["batches", "teachers", "students", "system"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap border-b-2 ${
                activeTab === tab
                  ? "border-[#2458CC] text-[#2458CC] bg-blue-50/50"
                  : "border-transparent text-slate-600 hover:text-[#09265D] hover:bg-slate-50"
              }`}
            >
              {tab === "batches" && `Batches (${batches.length})`}
              {tab === "teachers" && `Teachers (${teachers.length})`}
              {tab === "students" && `Students (${students.length})`}
              {tab === "system" && "System"}
            </button>
          ))}
        </div>

        {/* ── BATCHES TAB ────────────────────────────────────────────────────── */}
        {activeTab === "batches" && (
          <div className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm p-6 space-y-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="flex flex-wrap gap-1.5">
                {["All", "French", "German", "Spanish", "English"].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLangFilter(lang)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      langFilter === lang
                        ? "bg-blue-50 text-[#2458CC] border border-blue-200"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search code, teacher, level…"
                  value={batchSearch}
                  onChange={(e) => setBatchSearch(e.target.value)}
                  className="pl-8 pr-4 py-1.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#2458CC] w-full sm:w-56"
                />
              </div>
            </div>

            {dataLoading ? (
              <div className="py-12 text-center text-slate-400 text-sm flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" /> Loading batches…
              </div>
            ) : filteredBatches.length === 0 ? (
              <div className="py-12 text-center text-slate-400 text-sm">
                No batches found. Click <strong>New Batch</strong> to create one.
              </div>
            ) : (
              <div className="divide-y divide-slate-100 border-t border-slate-100">
                {filteredBatches.map((batch) => {
                  const enrolled = batch.batch_students?.[0]?.count ?? 0;
                  return (
                    <div
                      key={batch.id}
                      className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 rounded-xl px-2 transition-colors"
                    >
                      <div className="flex items-start gap-3.5">
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#EBF2FF] to-[#DCE8FF] text-[#2458CC] font-black text-xs flex items-center justify-center shrink-0">
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
                                  : batch.status === "completed"
                                  ? "bg-slate-100 text-slate-500"
                                  : "bg-amber-50 text-amber-700"
                              }`}
                            >
                              {batch.status}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500">
                            {batch.teacher ? (
                              <>👤 {batch.teacher.full_name} · </>
                            ) : (
                              <span className="text-amber-500">No teacher assigned · </span>
                            )}
                            {batch.schedule}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <div className="text-right mr-1">
                          <span className="text-xs font-bold text-[#09265D]">
                            {enrolled}/{batch.max_students}
                          </span>
                          <div className="w-20 bg-slate-100 h-1.5 rounded-full mt-1 overflow-hidden">
                            <div
                              className="bg-[#2458CC] h-full rounded-full"
                              style={{ width: `${Math.min((enrolled / batch.max_students) * 100, 100)}%` }}
                            />
                          </div>
                        </div>
                        <button
                          onClick={() => { setModalError(null); setModalSuccess(null); setAddStudentId(""); setShowAddStudentModal(batch.id); }}
                          className="px-2.5 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#2458CC] font-bold text-xs transition-colors"
                        >
                          + Student
                        </button>
                        <button
                          onClick={() => openBatchStudents(batch.id)}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
                        >
                          View
                        </button>
                        {batch.meeting_link && (
                          <a
                            href={batch.meeting_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs transition-colors flex items-center gap-1"
                          >
                            <Video className="w-3 h-3" /> Link
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ── TEACHERS TAB ───────────────────────────────────────────────────── */}
        {activeTab === "teachers" && (
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-black text-[#09265D]">Registered Instructors</h2>
              <button
                onClick={() => { setModalError(null); setModalSuccess(null); setShowTeacherModal(true); }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#2458CC] text-white hover:bg-[#1b45a6] transition-all cursor-pointer"
              >
                <UserPlus className="w-3.5 h-3.5" /> Add Instructor
              </button>
            </div>
            {dataLoading ? (
              <div className="py-12 text-center text-slate-400 text-sm flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" /> Loading…
              </div>
            ) : teachers.length === 0 ? (
              <div className="py-12 text-center text-slate-400 text-sm">No instructors yet. Add one above.</div>
            ) : (
              <div className="divide-y divide-slate-100">
                {teachers.map((t) => (
                  <div key={t.id} className="py-4 flex items-center gap-4 hover:bg-slate-50/50 px-2 rounded-xl transition-colors">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#09265D] to-[#2458CC] text-white font-black text-sm flex items-center justify-center shrink-0">
                      {t.full_name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-[#09265D]">{t.full_name}</p>
                      <p className="text-xs text-slate-500 truncate">{t.email}</p>
                    </div>
                    <div className="hidden sm:flex items-center gap-3 text-xs text-slate-500">
                      {t.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{t.phone}</span>}
                      {t.preferred_language && <span className="flex items-center gap-1"><Globe2 className="w-3 h-3" />{t.preferred_language}</span>}
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 text-[10px] font-bold">Instructor</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── STUDENTS TAB ───────────────────────────────────────────────────── */}
        {activeTab === "students" && (
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm space-y-4">
            <h2 className="text-base font-black text-[#09265D]">Registered Students ({students.length})</h2>
            {dataLoading ? (
              <div className="py-12 text-center text-slate-400 text-sm flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" /> Loading…
              </div>
            ) : students.length === 0 ? (
              <div className="py-12 text-center text-slate-400 text-sm">No students registered yet.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider">
                      <th className="py-3 px-2">Name</th>
                      <th className="py-3 px-2">Email</th>
                      <th className="py-3 px-2">Phone</th>
                      <th className="py-3 px-2">Language</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {students.map((s) => (
                      <tr key={s.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3 px-2 font-bold text-[#09265D]">{s.full_name}</td>
                        <td className="py-3 px-2 text-slate-600">{s.email}</td>
                        <td className="py-3 px-2 text-slate-500">{s.phone || "—"}</td>
                        <td className="py-3 px-2 font-semibold text-[#2458CC]">{s.preferred_language || "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ── SYSTEM TAB ─────────────────────────────────────────────────────── */}
        {activeTab === "system" && (
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
            <h2 className="text-lg font-black text-[#09265D]">System Configuration & Security</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: ShieldCheck, color: "text-emerald-600", title: "Admin 2FA Authentication", badge: "Active", badgeColor: "bg-emerald-50 text-emerald-700", desc: `Admin logins require password + 6-digit OTP dispatched to ${session?.email}.` },
                { icon: Mail, color: "text-[#2458CC]", title: "SMTP Mail Transport", badge: "Operational", badgeColor: "bg-emerald-50 text-emerald-700", desc: "Gmail SSL (Port 465) for OTPs and teacher welcome emails." },
                { icon: Server, color: "text-purple-600", title: "Supabase PostgreSQL", badge: "Connected", badgeColor: "bg-emerald-50 text-emerald-700", desc: "Profiles, batches, batch_students, and email_otps tables with RLS." },
                { icon: Users, color: "text-amber-600", title: "Small-Cohort Cap", badge: "10–15", badgeColor: "bg-blue-50 text-[#2458CC]", desc: "Every batch is capped at 15 students to guarantee live speaking practice." },
              ].map(({ icon: Icon, color, title, badge, badgeColor, desc }) => (
                <div key={title} className="p-5 rounded-2xl border border-slate-200/90 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-5 h-5 ${color}`} />
                      <h3 className="text-sm font-extrabold text-[#09265D]">{title}</h3>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${badgeColor}`}>{badge}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* ══════════════════════════════════════════
          MODAL: Create Batch
      ══════════════════════════════════════════ */}
      {showBatchModal && (
        <Modal title="Create Live Language Cohort" onClose={() => setShowBatchModal(false)}>
          <form onSubmit={handleCreateBatch} className="space-y-3.5">
            <ModalFeedback error={modalError} success={modalSuccess} />
            <FormRow label="Language">
              <select value={newBatch.language} onChange={(e) => setNewBatch({ ...newBatch, language: e.target.value })} className={selectCls}>
                {["French", "German", "Spanish", "English"].map((l) => <option key={l}>{l}</option>)}
              </select>
            </FormRow>
            <FormRow label="Level / Exam Track">
              <input required value={newBatch.level} onChange={(e) => setNewBatch({ ...newBatch, level: e.target.value })} placeholder="e.g. A1 Beginner, DELF B1" className={inputCls} />
            </FormRow>
            <FormRow label="Assign Teacher (optional)">
              <select value={newBatch.teacherId} onChange={(e) => setNewBatch({ ...newBatch, teacherId: e.target.value })} className={selectCls}>
                <option value="">— Unassigned —</option>
                {teachers.map((t) => <option key={t.id} value={t.id}>{t.full_name}</option>)}
              </select>
            </FormRow>
            <FormRow label="Schedule">
              <input value={newBatch.schedule} onChange={(e) => setNewBatch({ ...newBatch, schedule: e.target.value })} className={inputCls} />
            </FormRow>
            <div className="grid grid-cols-2 gap-3">
              <FormRow label="Cohort Cap">
                <input type="number" min={5} max={20} value={newBatch.maxStudents} onChange={(e) => setNewBatch({ ...newBatch, maxStudents: Number(e.target.value) })} className={inputCls} />
              </FormRow>
              <FormRow label="Meeting Link">
                <input placeholder="https://meet.google.com/…" value={newBatch.meetingLink} onChange={(e) => setNewBatch({ ...newBatch, meetingLink: e.target.value })} className={inputCls} />
              </FormRow>
            </div>
            <ModalActions onCancel={() => setShowBatchModal(false)} loading={modalLoading} label="Create Batch" />
          </form>
        </Modal>
      )}

      {/* ══════════════════════════════════════════
          MODAL: Add Teacher
      ══════════════════════════════════════════ */}
      {showTeacherModal && (
        <Modal title="Add New Instructor" onClose={() => setShowTeacherModal(false)}>
          <form onSubmit={handleCreateTeacher} className="space-y-3.5">
            <ModalFeedback error={modalError} success={modalSuccess} />
            <p className="text-xs text-slate-500">Login credentials will be auto-generated and emailed to the instructor.</p>
            <FormRow label="Full Name">
              <input required value={newTeacher.fullName} onChange={(e) => setNewTeacher({ ...newTeacher, fullName: e.target.value })} placeholder="e.g. Mme. Claire Dubois" className={inputCls} />
            </FormRow>
            <FormRow label="Email Address">
              <input required type="email" value={newTeacher.email} onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })} placeholder="teacher@example.com" className={inputCls} />
            </FormRow>
            <FormRow label="Phone (optional)">
              <input value={newTeacher.phone} onChange={(e) => setNewTeacher({ ...newTeacher, phone: e.target.value })} placeholder="+91 98xxx xxxxx" className={inputCls} />
            </FormRow>
            <FormRow label="Teaching Language">
              <select value={newTeacher.language} onChange={(e) => setNewTeacher({ ...newTeacher, language: e.target.value })} className={selectCls}>
                {["French", "German", "Spanish", "English"].map((l) => <option key={l}>{l}</option>)}
              </select>
            </FormRow>
            <ModalActions onCancel={() => setShowTeacherModal(false)} loading={modalLoading} label="Add & Send Credentials" />
          </form>
        </Modal>
      )}

      {/* ══════════════════════════════════════════
          MODAL: Add Student to Batch
      ══════════════════════════════════════════ */}
      {showAddStudentModal && (
        <Modal title="Add Student to Batch" onClose={() => setShowAddStudentModal(null)}>
          <form onSubmit={handleAddStudent} className="space-y-3.5">
            <ModalFeedback error={modalError} success={modalSuccess} />
            <FormRow label="Select Registered Student">
              <select required value={addStudentId} onChange={(e) => setAddStudentId(e.target.value)} className={selectCls}>
                <option value="">— Choose a student —</option>
                {students.map((s) => (
                  <option key={s.id} value={s.id}>{s.full_name} ({s.email})</option>
                ))}
              </select>
            </FormRow>
            <ModalActions onCancel={() => setShowAddStudentModal(null)} loading={modalLoading} label="Add to Batch" />
          </form>
        </Modal>
      )}

      {/* ══════════════════════════════════════════
          MODAL: View Batch Students
      ══════════════════════════════════════════ */}
      {showBatchStudentsModal && (
        <Modal title="Students in This Batch" onClose={() => setShowBatchStudentsModal(null)}>
          {batchStudentsList.length === 0 ? (
            <p className="text-sm text-slate-500 text-center py-8">No students enrolled yet.</p>
          ) : (
            <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
              {batchStudentsList.map((entry) => (
                <div key={entry.student_id} className="flex items-center justify-between py-3 gap-2">
                  <div>
                    <p className="text-sm font-bold text-[#09265D]">{entry.student?.full_name}</p>
                    <p className="text-xs text-slate-500">{entry.student?.email}</p>
                  </div>
                  <button
                    onClick={() => removeStudentFromBatch(showBatchStudentsModal, entry.student_id)}
                    className="text-xs text-red-500 hover:text-red-700 font-bold px-2 py-1 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
          <div className="pt-3 flex justify-end">
            <button onClick={() => setShowBatchStudentsModal(null)} className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer">Close</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── Shared micro-components ────────────────────────────────────────────────
const inputCls = "w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#2458CC]";
const selectCls = "w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#2458CC] bg-white";

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="max-w-md w-full bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <h3 className="text-base font-black text-[#09265D]">{title}</h3>
          <button onClick={onClose} className="w-7 h-7 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 flex items-center justify-center cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function FormRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-bold text-[#09265D] uppercase tracking-wider mb-1">{label}</label>
      {children}
    </div>
  );
}

function ModalActions({ onCancel, loading, label }: { onCancel: () => void; loading: boolean; label: string }) {
  return (
    <div className="pt-2 flex items-center justify-end gap-2">
      <button type="button" onClick={onCancel} className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer">Cancel</button>
      <button type="submit" disabled={loading} className="px-5 py-2 rounded-xl bg-[#2458CC] hover:bg-[#1b45a6] disabled:opacity-50 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5">
        {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
        {loading ? "Saving…" : label}
      </button>
    </div>
  );
}

function ModalFeedback({ error, success }: { error: string | null; success: string | null }) {
  if (!error && !success) return null;
  if (error) return (
    <div className="flex items-start gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
      <span>{error}</span>
    </div>
  );
  return (
    <div className="flex items-start gap-2 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-700">
      <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
      <span>{success}</span>
    </div>
  );
}
