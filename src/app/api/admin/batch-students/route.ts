import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createAdminClient } from "@/lib/supabase/admin";
import { verifyAdminToken, ADMIN_COOKIE_NAME } from "@/lib/auth/adminSession";

// Add student to batch
export async function POST(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  const session = verifyAdminToken(token);
  if (!session.valid) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { batchId, studentId } = await request.json();
    if (!batchId || !studentId) {
      return NextResponse.json({ error: "batchId and studentId are required." }, { status: 400 });
    }

    const supabase = createAdminClient();

    // Check capacity
    const { count, error: countError } = await supabase
      .from("batch_students")
      .select("*", { count: "exact", head: true })
      .eq("batch_id", batchId);

    if (countError) {
      return NextResponse.json({ error: countError.message }, { status: 500 });
    }

    const { data: batch, error: batchError } = await supabase
      .from("batches")
      .select("max_students, code")
      .eq("id", batchId)
      .single();

    if (batchError || !batch) {
      return NextResponse.json({ error: "Batch not found." }, { status: 404 });
    }

    if ((count ?? 0) >= batch.max_students) {
      return NextResponse.json({ error: `Batch ${batch.code} is full (max ${batch.max_students}).` }, { status: 409 });
    }

    const { error: insertError } = await supabase
      .from("batch_students")
      .insert({ batch_id: batchId, student_id: studentId });

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("batch-students POST error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}

// Remove student from batch
export async function DELETE(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  const session = verifyAdminToken(token);
  if (!session.valid) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { batchId, studentId } = await request.json();
    const supabase = createAdminClient();

    const { error } = await supabase
      .from("batch_students")
      .delete()
      .eq("batch_id", batchId)
      .eq("student_id", studentId);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("batch-students DELETE error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}

// List students in a batch
export async function GET(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  const session = verifyAdminToken(token);
  if (!session.valid) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const batchId = searchParams.get("batchId");
  if (!batchId) {
    return NextResponse.json({ error: "batchId is required." }, { status: 400 });
  }

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("batch_students")
      .select(`
        student_id,
        enrolled_at,
        student:student_id ( id, full_name, email, phone, preferred_language )
      `)
      .eq("batch_id", batchId);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ students: data || [] });
  } catch (err) {
    console.error("batch-students GET error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
