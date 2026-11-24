import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME } from "@/lib/auth/adminSession";

export async function POST() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(ADMIN_COOKIE_NAME);

    return NextResponse.json({ success: true, redirect: "/signin" });
  } catch (err) {
    console.error("admin-logout error:", err);
    return NextResponse.json(
      { error: "Failed to log out admin session." },
      { status: 500 }
    );
  }
}
