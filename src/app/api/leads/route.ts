import { NextRequest } from "next/server";
import { randomUUID } from "crypto";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/admin-auth";
import {
  apiError,
  apiOk,
  BUSINESS_CATEGORIES,
  clientIp,
  isRateLimited,
  normalizeIndianPhone,
} from "@/lib/api-helpers";
import { generateRefId } from "@/lib/utils";
import { RequestFormData } from "@/lib/types";

export const dynamic = "force-dynamic";

// ---------------------------------------------------------------------------
// POST /api/leads — public 3-step form submission (customer-facing)
// ---------------------------------------------------------------------------
export async function POST(request: NextRequest) {
  if (!isSupabaseConfigured()) {
    return apiError(
      "Server is not connected to the database yet. Set your Supabase keys in .env.local (see .env.example).",
      503
    );
  }

  const ip = clientIp(request);
  if (isRateLimited(`lead-submit:${ip}`, 5, 60 * 60 * 1000)) {
    return apiError("Too many requests from your device. Please try again in an hour.", 429);
  }

  let body: Partial<RequestFormData> & { website_url_honeypot?: string };
  try {
    body = await request.json();
  } catch {
    return apiError("Invalid request body.", 400);
  }

  // Anti-spam honeypot: accept silently but never store.
  if (body.website_url_honeypot && body.website_url_honeypot.trim() !== "") {
    return apiOk({ lead: { ref_id: "APW-SPAM" } });
  }

  const errors: string[] = [];
  const full_name = String(body.full_name || "").trim();
  const city = String(body.city || "").trim();
  const business_name = String(body.business_name || "").trim();
  const business_type = String(body.business_type || "").trim();
  const budget_range = String(body.budget_range || "").trim();
  const phone = normalizeIndianPhone(String(body.whatsapp_number || ""));
  const needs = Array.isArray(body.needs) ? body.needs.map(String).filter(Boolean) : [];

  if (full_name.length < 2) errors.push("Full name is required.");
  if (!phone) errors.push("A valid Indian 10-digit WhatsApp number is required.");
  if (city.length < 2) errors.push("City is required.");
  if (business_name.length < 2) errors.push("Business name is required.");
  if (!(BUSINESS_CATEGORIES as readonly string[]).includes(business_type)) errors.push("Business type is invalid.");
  if (needs.length === 0) errors.push("Select at least one requirement.");
  if (!budget_range) errors.push("Budget range is required.");

  if (errors.length > 0) {
    return apiError(errors.join(" "), 400);
  }

  // Guarded by the validation above (phone is non-null here).
  const phoneDigits = phone as string;

  const supabase = getSupabaseAdmin();
  const userAgent = (request.headers.get("user-agent") || "").slice(0, 500);

  // Retry a couple of times in the unlikely event of a ref_id collision.
  let created: Record<string, unknown> | null = null;
  let lastError: { code?: string; message?: string } | null = null;

  for (let attempt = 0; attempt < 3 && !created; attempt++) {
    const { data, error } = await supabase
      .from("leads")
      .insert({
        ref_id: generateRefId(),
        full_name,
        whatsapp_number: `+91 ${phoneDigits.slice(0, 5)} ${phoneDigits.slice(5)}`,
        email: String(body.email || "").trim() || null,
        city,
        business_name,
        business_type,
        has_website: Boolean(body.has_website),
        existing_website_url: String(body.existing_website_url || "").trim() || null,
        needs,
        budget_range,
        preferred_call_time: String(body.preferred_call_time || "Anytime (10 AM - 7 PM)"),
        customer_message: String(body.customer_message || "").trim() || null,
        status: "New",
        stage: "Received",
        assigned_to: "Unassigned",
        internal_notes: "New request received via 3-step lead intake form.",
        ip_address: ip === "unknown" ? null : ip,
        user_agent: userAgent || null,
        is_spam: false,
      })
      .select()
      .single();

    if (!error && data) {
      created = data as Record<string, unknown>;
    } else {
      lastError = error;
      if (error?.code !== "23505") break; // only retry on unique (ref_id) collision
    }
  }

  if (!created) {
    console.error("Lead insert failed:", lastError);
    return apiError("Could not save your request. Please try again.", 500);
  }

  // Initial activity log entry (same as the old localStorage store created).
  await supabase.from("lead_activity").insert({
    lead_id: created.id,
    action_title: "Request Submitted",
    action_detail: `3-step enquiry received from ${full_name} (${city}) for ${business_name}`,
    actor_name: "Customer",
  });

  return apiOk({ lead: created });
}

// ---------------------------------------------------------------------------
// GET /api/leads — admin only: full lead list for the dashboard
// ---------------------------------------------------------------------------
export async function GET(request: NextRequest) {
  if (!requireAdmin(request)) {
    return apiError("Unauthorized. Please sign in as admin.", 401);
  }

  if (!isSupabaseConfigured()) {
    return apiError(
      "Server is not connected to the database yet. Set your Supabase keys in .env.local (see .env.example).",
      503
    );
  }

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.from("leads").select("*").order("created_at", { ascending: false });

  if (error) {
    console.error("Lead list failed:", error);
    return apiError("Could not load leads.", 500);
  }

  return apiOk({ leads: data || [] });
}
