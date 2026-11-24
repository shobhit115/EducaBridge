import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAdminOtp } from "@/lib/auth/adminOtpStore";
import { createAdminToken, ADMIN_COOKIE_NAME } from "@/lib/auth/adminSession";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body.email || "").trim().toLowerCase();
    const otp = String(body.otp || "").trim();

    if (!/^\d{6}$/.test(otp)) {
      return NextResponse.json(
        { error: "Please enter a valid 6-digit security code." },
        { status: 400 }
      );
    }

    const configAdminEmail = (process.env.ADMIN_EMAIL || "").trim().toLowerCase();
    if (email !== configAdminEmail) {
      return NextResponse.json(
        { error: "Unauthorized administrator verification." },
        { status: 403 }
      );
    }

    const verification = verifyAdminOtp(email, otp);
    if (!verification.success) {
      return NextResponse.json(
        { error: verification.error || "Invalid verification code." },
        { status: 400 }
      );
    }

    // Generate signed admin session token
    const token = createAdminToken(email);

    // Set HTTP-only secure cookie
    const cookieStore = await cookies();
    cookieStore.set(ADMIN_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return NextResponse.json({
      success: true,
      redirect: "/admin/dashboard",
    });
  } catch (err) {
    console.error("admin-verify-otp route error:", err);
    return NextResponse.json(
      { error: "Failed to verify admin security code." },
      { status: 500 }
    );
  }
}
