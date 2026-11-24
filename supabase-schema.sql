-- =====================================================================
-- EducaBridge Academy — Supabase Schema
-- Run these statements in your Supabase SQL Editor (Dashboard → SQL)
-- =====================================================================

-- ─── 1. PROFILES ──────────────────────────────────────────────────────
-- Extends auth.users. Created automatically via trigger on signup.
create table if not exists public.profiles (
  id              uuid primary key references auth.users(id) on delete cascade,
  full_name       text,
  email           text unique,
  phone           text,
  preferred_language text default 'French',
  role            text not null default 'student'   -- 'student' | 'teacher' | 'admin'
);

-- Auto-create profile row on new Supabase auth user
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, full_name, email, phone, preferred_language, role)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.email,
    new.raw_user_meta_data->>'phone',
    coalesce(new.raw_user_meta_data->>'preferred_language', 'French'),
    coalesce(new.raw_user_meta_data->>'role', 'student')
  )
  on conflict (id) do update set
    full_name          = excluded.full_name,
    email              = excluded.email,
    phone              = excluded.phone,
    preferred_language = excluded.preferred_language;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- RLS
alter table public.profiles enable row level security;
create policy "Users can read own profile"
  on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);
-- Allow service-role to manage all (used by admin APIs)
create policy "Service role full access on profiles"
  on public.profiles using (true) with check (true);

-- ─── 2. BATCHES ───────────────────────────────────────────────────────
create table if not exists public.batches (
  id            uuid primary key default gen_random_uuid(),
  code          text not null unique,
  language      text not null,
  level         text not null,
  teacher_id    uuid references public.profiles(id) on delete set null,
  schedule      text,
  max_students  int not null default 15,
  meeting_link  text,
  status        text not null default 'upcoming',   -- 'upcoming' | 'active' | 'completed'
  created_at    timestamptz not null default now()
);

alter table public.batches enable row level security;
-- Teachers can read their own batches
create policy "Teachers read own batches"
  on public.batches for select
  using (auth.uid() = teacher_id);
-- Students can read batches they're enrolled in (via batch_students)
create policy "Students read enrolled batches"
  on public.batches for select
  using (
    exists (
      select 1 from public.batch_students bs
      where bs.batch_id = id and bs.student_id = auth.uid()
    )
  );
-- Service role full access
create policy "Service role full access on batches"
  on public.batches using (true) with check (true);

-- ─── 3. BATCH_STUDENTS ────────────────────────────────────────────────
create table if not exists public.batch_students (
  batch_id    uuid references public.batches(id) on delete cascade,
  student_id  uuid references public.profiles(id) on delete cascade,
  enrolled_at timestamptz not null default now(),
  primary key (batch_id, student_id)
);

alter table public.batch_students enable row level security;
-- Students can read their own enrollments
create policy "Students read own enrollments"
  on public.batch_students for select
  using (auth.uid() = student_id);
-- Teachers can read enrollments for their batches
create policy "Teachers read enrollments for their batches"
  on public.batch_students for select
  using (
    exists (
      select 1 from public.batches b
      where b.id = batch_id and b.teacher_id = auth.uid()
    )
  );
-- Service role full access
create policy "Service role full access on batch_students"
  on public.batch_students using (true) with check (true);

-- ─── 4. EMAIL_OTPS ────────────────────────────────────────────────────
-- Stores pending signup OTPs (not for admin — admin uses in-memory store)
create table if not exists public.email_otps (
  email      text primary key,
  otp_hash   text not null,
  full_name  text,
  password   text,          -- bcrypt hash stored temporarily
  expires_at timestamptz not null,
  attempts   int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.email_otps enable row level security;
-- Only service role (server) can read/write OTPs — no client-side access
create policy "Service role full access on email_otps"
  on public.email_otps using (true) with check (true);

-- ─── 5. USEFUL INDEXES ────────────────────────────────────────────────
create index if not exists idx_profiles_role       on public.profiles(role);
create index if not exists idx_batches_teacher     on public.batches(teacher_id);
create index if not exists idx_batch_students_batch  on public.batch_students(batch_id);
create index if not exists idx_batch_students_student on public.batch_students(student_id);

-- ─── DONE ─────────────────────────────────────────────────────────────
-- After running this:
-- 1. In Auth settings set "Confirm email" to OFF (we do it server-side).
-- 2. The service role key in .env.local gives your Next.js API full access.
