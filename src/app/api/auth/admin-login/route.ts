import { NextResponse } from "next/server";
import crypto from "crypto";
import { storeAdminOtp } from "@/lib/auth/adminOtpStore";
import { sendAdminLoginOtpEmail } from "@/lib/email/mailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");

    const configAdminEmail = (process.env.ADMIN_EMAIL || "").trim().toLowerCase();
    const configAdminPassword = process.env.ADMIN_PASSWORD || "";

    // If no admin credentials configured or this is not the admin email
    if (!configAdminEmail || email !== configAdminEmail) {
      return NextResponse.json({ isStudent: true });
    }

    // Verify admin password
    if (password !== configAdminPassword) {
      return NextResponse.json(
        { error: "Incorrect password for administrator account." },
        { status: 401 }
      );
    }

    // Generate secure 6-digit OTP
    const otp = crypto.randomInt(100000, 1000000).toString();
    storeAdminOtp(email, otp);

    // Development terminal log for quick testing
    console.log(`\n========================================`);
    console.log(`🔐 [EducaBridge Admin 2FA Code]: ${otp}`);
    console.log(`📧 Sent to: ${email}`);
    console.log(`========================================\n`);

    // Dispatch OTP to admin email via Nodemailer SMTP
    try {
      await sendAdminLoginOtpEmail(email, otp);
    } catch (mailErr) {
      console.error("Failed to send admin OTP email:", mailErr);
      // Still allow login if mailer had connection glitch in local offline dev,
      // since the code was securely generated and logged above
    }

    return NextResponse.json({
      requireOtp: true,
      email,
      message: `A 6-digit verification code has been dispatched to ${email}.`,
    });
  } catch (err) {
    console.error("admin-login route error:", err);
    return NextResponse.json(
      { error: "Internal server error during authentication." },
      { status: 500 }
    );
  }
}
