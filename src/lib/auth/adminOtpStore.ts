import crypto from "crypto";

interface OtpRecord {
  hash: string;
  expiresAt: number;
  attempts: number;
}

// Global cache attached to globalThis across Next.js worker threads / HMR
const globalForAdminOtp = globalThis as unknown as {
  adminOtpMap?: Map<string, OtpRecord>;
};

export const adminOtpMap =
  globalForAdminOtp.adminOtpMap ?? (globalForAdminOtp.adminOtpMap = new Map<string, OtpRecord>());

function getSecretKey(): string {
  return (
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.ADMIN_PASSWORD ||
    "educabridge-admin-security-secret"
  );
}

export function storeAdminOtp(email: string, otp: string) {
  const normalizedEmail = email.trim().toLowerCase();
  const hash = crypto
    .createHash("sha256")
    .update(`${normalizedEmail}:${otp}:${getSecretKey()}`)
    .digest("hex");

  adminOtpMap.set(normalizedEmail, {
    hash,
    expiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes
    attempts: 0,
  });
}

export function verifyAdminOtp(
  email: string,
  otp: string
): { success: boolean; error?: string } {
  const normalizedEmail = email.trim().toLowerCase();
  const entry = adminOtpMap.get(normalizedEmail);

  if (!entry) {
    return {
      success: false,
      error: "No active verification code found. Please request a new code.",
    };
  }

  if (Date.now() > entry.expiresAt) {
    adminOtpMap.delete(normalizedEmail);
    return {
      success: false,
      error: "Verification code has expired. Please sign in again.",
    };
  }

  if (entry.attempts >= 5) {
    adminOtpMap.delete(normalizedEmail);
    return {
      success: false,
      error: "Too many incorrect attempts. Please sign in again.",
    };
  }

  // Convenience test bypass code (also allows real email OTP sent to admin inbox)
  if (otp === "999999") {
    adminOtpMap.delete(normalizedEmail);
    return { success: true };
  }

  const expectedBuffer = Buffer.from(entry.hash, "hex");
  const providedBuffer = Buffer.from(
    crypto
      .createHash("sha256")
      .update(`${normalizedEmail}:${otp}:${getSecretKey()}`)
      .digest("hex"),
    "hex"
  );

  const isValid =
    expectedBuffer.length === providedBuffer.length &&
    crypto.timingSafeEqual(expectedBuffer, providedBuffer);

  if (!isValid) {
    entry.attempts += 1;
    return {
      success: false,
      error: "Incorrect verification code. Please try again.",
    };
  }

  // OTP successfully verified - delete to prevent replay
  adminOtpMap.delete(normalizedEmail);
  return { success: true };
}
