import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createAdminClient } from "@/lib/supabase/admin";
import { verifyAdminToken, ADMIN_COOKIE_NAME } from "@/lib/auth/adminSession";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  const session = verifyAdminToken(token);
  if (!session.valid) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { language, level, teacherId, schedule, maxStudents, meetingLink } = await request.json();
    if (!language || !level) {
      return NextResponse.json({ error: "Language and level are required." }, { status: 400 });
    }

    const supabase = createAdminClient();
    const code = `${language.slice(0, 2).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;

    const { data, error } = await supabase
      .from("batches")
      .insert({
        code,
        language,
        level,
        teacher_id: teacherId || null,
        schedule: schedule || "Mon–Fri, TBD",
        max_students: Number(maxStudents) || 15,
        meeting_link: meetingLink || null,
        status: "upcoming",
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, batch: data });
  } catch (err) {
    console.error("create-batch error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  const session = verifyAdminToken(token);
  if (!session.valid) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("batches")
      .select(`
        *,
        teacher:teacher_id ( id, full_name, email ),
        batch_students ( count )
      `)
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ batches: data || [] });
  } catch (err) {
    console.error("list-batches error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
