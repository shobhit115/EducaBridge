import crypto from "crypto";

export const ADMIN_COOKIE_NAME = "educabridge_admin_session";

function getSecretKey(): string {
  return (
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.ADMIN_PASSWORD ||
    "educabridge-admin-cookie-signing-secret"
  );
}

export function createAdminToken(email: string): string {
  const payload = {
    email: email.trim().toLowerCase(),
    role: "admin",
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
  };

  const payloadB64 = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", getSecretKey())
    .update(payloadB64)
    .digest("base64url");

  return `${payloadB64}.${signature}`;
}

export function verifyAdminToken(
  token: string | undefined | null
): { valid: boolean; email?: string } {
  if (!token || !token.includes(".")) {
    return { valid: false };
  }

  const [payloadB64, signature] = token.split(".");
  if (!payloadB64 || !signature) {
    return { valid: false };
  }

  const expectedSignature = crypto
    .createHmac("sha256", getSecretKey())
    .update(payloadB64)
    .digest("base64url");

  if (signature !== expectedSignature) {
    return { valid: false };
  }

  try {
    const payload = JSON.parse(
      Buffer.from(payloadB64, "base64url").toString("utf8")
    );

    if (!payload.exp || Date.now() > payload.exp) {
      return { valid: false };
    }

    if (payload.role !== "admin") {
      return { valid: false };
    }

    return { valid: true, email: payload.email };
  } catch {
    return { valid: false };
  }
}
