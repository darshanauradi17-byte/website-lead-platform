import { NextRequest, NextResponse } from "next/server";
import { verifyAdminCredentials, signAdminToken } from "@/lib/admin-auth";
import { apiError, clientIp, isRateLimited } from "@/lib/api-helpers";

export async function POST(request: NextRequest) {
  const ip = clientIp(request);
  if (isRateLimited(`admin-login:${ip}`, 10, 15 * 60 * 1000)) {
    return apiError("Too many login attempts. Please try again later.", 429);
  }

  let body: { username?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return apiError("Invalid request body.", 400);
  }

  const username = String(body.username || "").trim();
  const password = String(body.password || "");

  if (!username || !password) {
    return apiError("Username and password are required.", 400);
  }

  if (!verifyAdminCredentials(username, password)) {
    return apiError("Invalid username or password.", 401);
  }

  const token = signAdminToken(username);

  return NextResponse.json({
    success: true,
    token,
    name: username,
    message: "Login successful.",
  });
}
