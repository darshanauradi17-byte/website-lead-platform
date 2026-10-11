import crypto from "crypto";

/**
 * Minimal stateless admin session tokens for the owner dashboard.
 *
 * A token is "<base64url(payload)>.<base64url(hmac-sha256(payload)>" where
 * payload = { name, exp }. Verified with a constant-time comparison, so no
 * server-side session store is needed and tokens survive restarts.
 *
 * Credentials come from environment variables (never hard-coded):
 *   ADMIN_USER (default "admin") / ADMIN_PASS (default "admin123" — change it!)
 *   ADMIN_SESSION_SECRET (optional; falls back to ADMIN_PASS)
 */

const TOKEN_TTL_MS = 1000 * 60 * 60 * 12; // 12 hours

export interface AdminTokenPayload {
  name: string;
  exp: number;
}

function getSecret(): string {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASS || "apnaweb-dev-secret";
}

function b64url(input: string | Buffer): string {
  return Buffer.from(input).toString("base64url");
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

export function verifyAdminCredentials(username: string, password: string): boolean {
  const expectedUser = process.env.ADMIN_USER || "admin";
  const expectedPass = process.env.ADMIN_PASS || "admin123";

  return safeEqual(username, expectedUser) && safeEqual(password, expectedPass);
}

export function signAdminToken(name: string): string {
  const payload: AdminTokenPayload = {
    name,
    exp: Date.now() + TOKEN_TTL_MS,
  };

  const payloadB64 = b64url(JSON.stringify(payload));
  const signature = crypto.createHmac("sha256", getSecret()).update(payloadB64).digest("base64url");

  return `${payloadB64}.${signature}`;
}

export function verifyAdminToken(token: string | null | undefined): AdminTokenPayload | null {
  if (!token) return null;

  const parts = token.split(".");
  if (parts.length !== 2) return null;

  const [payloadB64, signature] = parts;
  const expectedSignature = crypto.createHmac("sha256", getSecret()).update(payloadB64).digest("base64url");

  if (!safeEqual(signature, expectedSignature)) return null;

  try {
    const payload = JSON.parse(Buffer.from(payloadB64, "base64url").toString("utf8")) as AdminTokenPayload;
    if (!payload.exp || typeof payload.exp !== "number" || payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

export function getBearerToken(request: Request): string | null {
  const authHeader = request.headers.get("authorization") || "";
  return authHeader.startsWith("Bearer ") ? authHeader.substring(7) : null;
}

/** Returns the admin payload or null. Use in API routes that require admin auth. */
export function requireAdmin(request: Request): AdminTokenPayload | null {
  return verifyAdminToken(getBearerToken(request));
}
