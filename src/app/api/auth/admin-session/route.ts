import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAdminToken, ADMIN_COOKIE_NAME } from "@/lib/auth/adminSession";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

    const session = verifyAdminToken(token);
    if (!session.valid) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    return NextResponse.json({
      authenticated: true,
      email: session.email,
      role: "admin",
    });
  } catch (err) {
    console.error("admin-session check error:", err);
    return NextResponse.json({ authenticated: false }, { status: 500 });
  }
}
