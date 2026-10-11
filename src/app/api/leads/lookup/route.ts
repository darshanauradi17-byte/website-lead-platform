import { NextRequest } from "next/server";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/server";
import { apiError, apiOk, sanitizeLeadForPortal } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

// ---------------------------------------------------------------------------
// GET /api/leads/lookup?q=<ref_id or whatsapp number>
// Public customer tracking: returns only portal-safe lead fields.
// ---------------------------------------------------------------------------
export async function GET(request: NextRequest) {
  if (!isSupabaseConfigured()) {
    return apiError(
      "Server is not connected to the database yet. Set your Supabase keys in .env.local (see .env.example).",
      503
    );
  }

  const q = (request.nextUrl.searchParams.get("q") || "").trim();
  if (!q) {
    return apiError("Please provide a reference ID or WhatsApp number.", 400);
  }

  const supabase = getSupabaseAdmin();
  const digits = q.replace(/\D/g, "");

  // 1) Try exact ref_id match (case-insensitive).
  let { data, error } = await supabase
    .from("leads")
    .select("*")
    .ilike("ref_id", q)
    .limit(1);

  // 2) Fall back to WhatsApp number match on the 10-digit tail.
  if (!error && (!data || data.length === 0) && digits.length >= 10) {
    const tail = digits.slice(-10);
    ({ data, error } = await supabase
      .from("leads")
      .select("*")
      .or(`whatsapp_number.ilike.%${tail.slice(0, 5)} ${tail.slice(5)}%,whatsapp_number.ilike.%${tail}%`)
      .order("created_at", { ascending: false })
      .limit(1));
  }

  if (error) {
    console.error("Lead lookup failed:", error);
    return apiError("Lookup failed. Please try again.", 500);
  }

  if (!data || data.length === 0) {
    return apiError(`No project request found for "${q}".`, 404);
  }

  return apiOk({ lead: sanitizeLeadForPortal(data[0]) });
}
