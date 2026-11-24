import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";
import { createAdminClient } from "@/lib/supabase/admin";
import { verifyAdminToken, ADMIN_COOKIE_NAME } from "@/lib/auth/adminSession";
import { sendTeacherCredentialsEmail } from "@/lib/email/mailer";

function generatePassword(length = 12): string {
  const chars = "ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789@#!";
  return Array.from(crypto.randomBytes(length))
    .map((b) => chars[b % chars.length])
    .join("");
}

export async function POST(request: Request) {
  // Guard: only logged-in admin can call this
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  const session = verifyAdminToken(token);
  if (!session.valid) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { fullName, email, phone, language } = await request.json();
    if (!fullName || !email) {
      return NextResponse.json({ error: "Full name and email are required." }, { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const password = generatePassword();
    const supabase = createAdminClient();

    // 1. Create Supabase auth user
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: normalizedEmail,
      password,
      email_confirm: true,
      user_metadata: {
        full_name: fullName.trim(),
        phone: phone || "",
        preferred_language: language || "French",
      },
    });

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 });
    }

    // 2. Upsert profile with role = teacher
    const { error: profileError } = await supabase.from("profiles").upsert({
      id: authData.user.id,
      full_name: fullName.trim(),
      email: normalizedEmail,
      phone: phone || null,
      preferred_language: language || "French",
      role: "teacher",
    });

    if (profileError) {
      console.error("Profile upsert error:", profileError);
    }

    // 3. Email credentials to the teacher
    try {
      await sendTeacherCredentialsEmail(normalizedEmail, fullName.trim(), password);
    } catch (mailErr) {
      console.error("Failed to send teacher credentials email:", mailErr);
    }

    return NextResponse.json({
      success: true,
      teacher: {
        id: authData.user.id,
        email: normalizedEmail,
        fullName: fullName.trim(),
      },
    });
  } catch (err) {
    console.error("create-teacher error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
