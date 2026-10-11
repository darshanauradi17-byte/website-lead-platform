import { NextResponse } from "next/server";
import { Lead } from "./types";

/**
 * Shared helpers for the Next.js API routes that connect the frontend
 * to the Supabase backend.
 */

export const LEAD_STATUSES = [
  "New",
  "Under Review",
  "Call Scheduled",
  "Proposal Sent",
  "Won",
  "Lost",
] as const;

export const PROJECT_STAGES = [
  "Received",
  "Under Review",
  "Call Scheduled",
  "Proposal Sent",
  "In Progress",
  "Delivered",
] as const;

export const BUSINESS_CATEGORIES = [
  "Kirana & Retail",
  "Salon & Beauty",
  "Medical & Pharmacy",
  "Restaurant & Cafe",
  "Gym & Fitness",
  "Clinic & Hospital",
  "Garments & Fashion",
  "Services & Repairs",
  "Other",
] as const;

export function apiError(message: string, status: number) {
  return NextResponse.json({ success: false, message }, { status });
}

export function apiOk(data: Record<string, unknown> = {}) {
  return NextResponse.json({ success: true, ...data });
}

/** Maps a status change to the matching project stage (same rules the old localStorage store used). */
export function mapStatusToStage(status: string): string {
  switch (status) {
    case "New":
      return "Received";
    case "Under Review":
      return "Under Review";
    case "Call Scheduled":
      return "Call Scheduled";
    case "Proposal Sent":
      return "Proposal Sent";
    case "Won":
      return "In Progress";
    case "Lost":
      return "Received";
    default:
      return "Received";
  }
}

/**
 * Strips owner-only fields before returning a lead to the public customer portal.
 * (RULES.md: do not expose private owner-dashboard information.)
 */
export function sanitizeLeadForPortal(row: Record<string, unknown>): Lead {
  return {
    id: String(row.id),
    ref_id: String(row.ref_id || ""),
    full_name: String(row.full_name || ""),
    whatsapp_number: String(row.whatsapp_number || ""),
    email: (row.email as string) || "",
    city: String(row.city || ""),
    business_name: String(row.business_name || ""),
    business_type: row.business_type as Lead["business_type"],
    has_website: Boolean(row.has_website),
    existing_website_url: (row.existing_website_url as string) || "",
    needs: (row.needs as string[]) || [],
    budget_range: String(row.budget_range || ""),
    preferred_call_time: String(row.preferred_call_time || ""),
    customer_message: (row.customer_message as string) || "",
    status: row.status as Lead["status"],
    stage: row.stage as Lead["stage"],
    assigned_to: "",
    internal_notes: "",
    is_spam: false,
    created_at: String(row.created_at || ""),
    updated_at: String(row.updated_at || ""),
  };
}

/** Normalizes an Indian phone number to its last 10 digits, or returns null if invalid. */
export function normalizeIndianPhone(raw: string): string | null {
  const digits = String(raw || "").replace(/\D/g, "");
  const ten = digits.length === 12 && digits.startsWith("91") ? digits.slice(2) : digits;
  if (/^[6-9]\d{9}$/.test(ten)) return ten;
  return null;
}

// ---------------------------------------------------------------------------
// Tiny in-memory rate limiter (per server instance). No extra dependency.
// ---------------------------------------------------------------------------

const buckets = new Map<string, number[]>();

export function isRateLimited(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const hits = (buckets.get(key) || []).filter((t) => now - t < windowMs);

  if (hits.length >= limit) {
    buckets.set(key, hits);
    return true;
  }

  hits.push(now);
  buckets.set(key, hits);

  if (buckets.size > 1000) {
    for (const [k, v] of buckets) {
      if (v.every((t) => now - t >= windowMs)) buckets.delete(k);
    }
  }

  return false;
}

export function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") || "unknown";
}
