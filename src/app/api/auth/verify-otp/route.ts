import { NextResponse } from "next/server";
import crypto from "crypto";
import { createAdminClient } from "@/lib/supabase/admin";

function hashOtp(email: string, otp: string) {
  return crypto
    .createHash("sha256")
    .update(`${email}:${otp}:${process.env.SUPABASE_SERVICE_ROLE_KEY}`)
    .digest("hex");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const fullName = String(body.fullName || "").trim();
    const email = String(body.email || "").trim().toLowerCase();
    const phone = String(body.phone || "").trim();
    const preferredLanguage = String(body.preferredLanguage || "French").trim();
    const password = String(body.password || "");
    const otp = String(body.otp || "").trim();

    if (!/^\d{6}$/.test(otp)) {
      return NextResponse.json(
        { error: "Please enter a valid 6-digit verification code." },
        { status: 400 }
      );
    }

    const supabaseAdmin = createAdminClient();

    // 1. Fetch stored OTP record
    const { data: record, error: fetchError } = await supabaseAdmin
      .from("email_otps")
      .select("*")
      .eq("email", email)
      .maybeSingle();

    if (fetchError || !record) {
      return NextResponse.json(
        { error: "No active verification request found. Please request a new code." },
        { status: 400 }
      );
    }

    // 2. Check expiration and brute-force attempt limit
    if (new Date(record.expires_at).getTime() < Date.now()) {
      await supabaseAdmin.from("email_otps").delete().eq("email", email);
      return NextResponse.json(
        { error: "This verification code has expired. Please request a new one." },
        { status: 400 }
      );
    }

    if (record.attempts >= 5) {
      await supabaseAdmin.from("email_otps").delete().eq("email", email);
      return NextResponse.json(
        { error: "Too many incorrect attempts. Please request a new verification code." },
        { status: 429 }
      );
    }

    // 3. Constant-time hash comparison
    const expectedBuffer = Buffer.from(record.otp_hash, "hex");
    const providedBuffer = Buffer.from(hashOtp(email, otp), "hex");
    const isValid =
      expectedBuffer.length === providedBuffer.length &&
      crypto.timingSafeEqual(expectedBuffer, providedBuffer);

    if (!isValid) {
      await supabaseAdmin
        .from("email_otps")
        .update({ attempts: record.attempts + 1 })
        .eq("email", email);

      return NextResponse.json(
        { error: "Incorrect verification code. Please try again." },
        { status: 400 }
      );
    }

    // 4. Consume OTP and create confirmed Supabase user (triggers public.profiles insert)
    await supabaseAdmin.from("email_otps").delete().eq("email", email);

    const { error: createError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        full_name: fullName,
        phone,
        preferred_language: preferredLanguage,
      },
    });

    if (createError) {
      return NextResponse.json(
        { error: createError.message },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("verify-otp error:", err);
    return NextResponse.json(
      { error: "Account verification failed. Please try again." },
      { status: 500 }
    );
  }
}