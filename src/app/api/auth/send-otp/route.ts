import { NextResponse } from "next/server";
import crypto from "crypto";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendVerificationOtpEmail } from "@/lib/email/mailer";

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
    const password = String(body.password || "");

    if (fullName.length < 2) {
      return NextResponse.json(
        { error: "Please enter your full name." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters long." },
        { status: 400 }
      );
    }

    const supabaseAdmin = createAdminClient();

    // 1. Check if email is already registered
    const { data: exists, error: checkError } = await supabaseAdmin.rpc(
      "email_already_registered",
      { check_email: email }
    );

    if (checkError) {
      return NextResponse.json(
        { error: "Unable to verify email availability." },
        { status: 500 }
      );
    }

    if (exists) {
      return NextResponse.json(
        { error: "An account with this email already exists. Please sign in instead." },
        { status: 409 }
      );
    }

    // 2. Enforce a 30-second cooldown between OTP requests
    const { data: existingOtp } = await supabaseAdmin
      .from("email_otps")
      .select("created_at")
      .eq("email", email)
      .maybeSingle();

    if (existingOtp) {
      const elapsedSeconds =
        (Date.now() - new Date(existingOtp.created_at).getTime()) / 1000;
      if (elapsedSeconds < 30) {
        return NextResponse.json(
          { error: `Please wait ${Math.ceil(30 - elapsedSeconds)}s before requesting a new code.` },
          { status: 429 }
        );
      }
    }

    // 3. Generate cryptographically secure 6-digit OTP and store SHA-256 hash
    const otp = crypto.randomInt(100000, 1000000).toString();
    const otpHash = hashOtp(email, otp);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

    const { error: upsertError } = await supabaseAdmin
      .from("email_otps")
      .upsert(
        {
          email,
          otp_hash: otpHash,
          expires_at: expiresAt,
          attempts: 0,
          created_at: new Date().toISOString(),
        },
        { onConflict: "email" }
      );

    if (upsertError) {
      return NextResponse.json(
        { error: "Failed to generate verification code." },
        { status: 500 }
      );
    }

    // 4. Send email via your own Nodemailer SMTP server
    await sendVerificationOtpEmail(email, fullName, otp);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("send-otp error:", err);
    return NextResponse.json(
      { error: "Failed to send verification email. Please check your email address." },
      { status: 500 }
    );
  }
}