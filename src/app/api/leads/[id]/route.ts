import { NextRequest } from "next/server";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/admin-auth";
import {
  apiError,
  apiOk,
  BUSINESS_CATEGORIES,
  LEAD_STATUSES,
  mapStatusToStage,
  PROJECT_STAGES,
} from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

// Fields the admin dashboard is allowed to update (matches old PATCH route scope).
const UPDATABLE_FIELDS = [
  "full_name",
  "whatsapp_number",
  "email",
  "city",
  "business_name",
  "business_type",
  "has_website",
  "existing_website_url",
  "needs",
  "budget_range",
  "preferred_call_time",
  "customer_message",
  "status",
  "stage",
  "assigned_to",
  "internal_notes",
  "is_spam",
] as const;

// ---------------------------------------------------------------------------
// PATCH /api/leads/:id — admin only: update status / assignment / notes / fields
// ---------------------------------------------------------------------------
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  if (!requireAdmin(request)) {
    return apiError("Unauthorized. Please sign in as admin.", 401);
  }

  if (!isSupabaseConfigured()) {
    return apiError(
      "Server is not connected to the database yet. Set your Supabase keys in .env.local (see .env.example).",
      503
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return apiError("Invalid request body.", 400);
  }

  const updates: Record<string, unknown> = {};
  for (const field of UPDATABLE_FIELDS) {
    if (field in body && body[field] !== undefined) {
      updates[field] = body[field];
    }
  }

  if ("status" in updates && !(LEAD_STATUSES as readonly string[]).includes(String(updates.status))) {
    return apiError("Invalid status value.", 400);
  }
  if ("business_type" in updates && !(BUSINESS_CATEGORIES as readonly string[]).includes(String(updates.business_type))) {
    return apiError("Invalid business type.", 400);
  }
  if ("needs" in updates && !Array.isArray(updates.needs)) {
    return apiError("Needs must be a list.", 400);
  }

  // Auto-map status → project stage when a status is changed without an explicit stage
  // (same behavior as the previous localStorage implementation).
  if ("status" in updates && !("stage" in updates)) {
    updates.stage = mapStatusToStage(String(updates.status));
  }
  if ("stage" in updates && !(PROJECT_STAGES as readonly string[]).includes(String(updates.stage))) {
    return apiError("Invalid project stage.", 400);
  }

  if (Object.keys(updates).length === 0) {
    return apiError("No updatable fields provided.", 400);
  }

  updates.updated_at = new Date().toISOString();

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.from("leads").update(updates).eq("id", params.id).select().single();

  if (error || !data) {
    console.error("Lead update failed:", error);
    return apiError("Lead not found or update failed.", 404);
  }

  // Log the change to the activity trail when status/stage/assignment/notes change.
  const admin = requireAdmin(request);
  const actor = admin?.name || "Admin";
  if ("status" in updates) {
    await supabase.from("lead_activity").insert({
      lead_id: data.id,
      action_title: `Status updated to ${updates.status}`,
      action_detail: `Pipeline stage set to ${updates.stage}`,
      actor_name: actor,
    });
  } else if ("assigned_to" in updates) {
    await supabase.from("lead_activity").insert({
      lead_id: data.id,
      action_title: "Assigned specialist updated",
      action_detail: `Assigned to ${updates.assigned_to}`,
      actor_name: actor,
    });
  } else if ("internal_notes" in updates) {
    await supabase.from("lead_activity").insert({
      lead_id: data.id,
      action_title: "Lead details updated",
      action_detail: "Internal notes updated",
      actor_name: actor,
    });
  }

  return apiOk({ lead: data });
}
