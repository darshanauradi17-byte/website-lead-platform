import { NextRequest } from "next/server";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/server";
import { apiError, apiOk, clientIp, isRateLimited, sanitizeLeadForPortal } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

// ---------------------------------------------------------------------------
// PATCH /api/portal/lead — customer edits their own requirement notes.
// Requires the lead UUID AND matching ref_id (both shown on their tracking
// page), so no customer accounts are needed (per project rules).
// ---------------------------------------------------------------------------
export async function PATCH(request: NextRequest) {
  if (!isSupabaseConfigured()) {
    return apiError(
      "Server is not connected to the database yet. Set your Supabase keys in .env.local (see .env.example).",
      503
    );
  }

  const ip = clientIp(request);
  if (isRateLimited(`portal-update:${ip}`, 10, 15 * 60 * 1000)) {
    return apiError("Too many update requests. Please wait a few minutes.", 429);
  }

  let body: { id?: string; ref_id?: string; customer_message?: string };
  try {
    body = await request.json();
  } catch {
    return apiError("Invalid request body.", 400);
  }

  const id = String(body.id || "").trim();
  const ref_id = String(body.ref_id || "").trim();
  const customer_message = String(body.customer_message || "").trim();

  if (!id || !ref_id) {
    return apiError("Lead id and reference ID are required.", 400);
  }
  if (customer_message.length > 2000) {
    return apiError("Message is too long (max 2000 characters).", 400);
  }

  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("leads")
    .update({ customer_message: customer_message || null, updated_at: new Date().toISOString() })
    .eq("id", id)
    .ilike("ref_id", ref_id)
    .select()
    .single();

  if (error || !data) {
    console.error("Portal update failed:", error);
    return apiError("Could not update your request. Check your Reference ID.", 404);
  }

  return apiOk({ lead: sanitizeLeadForPortal(data) });
}
