import { NextRequest } from "next/server";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/server";
import { apiError, apiOk, clientIp, isRateLimited } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

// ---------------------------------------------------------------------------
// GET /api/leads/:id/messages — chat history for the customer portal.
// Access is keyed by the unguessable lead UUID returned by the lookup route.
// ---------------------------------------------------------------------------
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  if (!isSupabaseConfigured()) {
    return apiError(
      "Server is not connected to the database yet. Set your Supabase keys in .env.local (see .env.example).",
      503
    );
  }

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("lead_messages")
    .select("*")
    .eq("lead_id", params.id)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Message list failed:", error);
    return apiError("Could not load messages.", 500);
  }

  return apiOk({ messages: data || [] });
}

// ---------------------------------------------------------------------------
// POST /api/leads/:id/messages — customer sends a message from the portal.
// ---------------------------------------------------------------------------
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  if (!isSupabaseConfigured()) {
    return apiError(
      "Server is not connected to the database yet. Set your Supabase keys in .env.local (see .env.example).",
      503
    );
  }

  const ip = clientIp(request);
  if (isRateLimited(`portal-message:${ip}`, 20, 15 * 60 * 1000)) {
    return apiError("Too many messages. Please wait a few minutes.", 429);
  }

  let body: { sender_name?: string; message_text?: string };
  try {
    body = await request.json();
  } catch {
    return apiError("Invalid request body.", 400);
  }

  const message_text = String(body.message_text || "").trim();
  const sender_name = String(body.sender_name || "").trim() || "Customer";

  if (!message_text) {
    return apiError("Message cannot be empty.", 400);
  }
  if (message_text.length > 2000) {
    return apiError("Message is too long (max 2000 characters).", 400);
  }

  const supabase = getSupabaseAdmin();

  // Verify the lead exists before inserting the message.
  const { data: lead } = await supabase.from("leads").select("id").eq("id", params.id).single();
  if (!lead) {
    return apiError("Lead not found.", 404);
  }

  const { data, error } = await supabase
    .from("lead_messages")
    .insert({
      lead_id: params.id,
      sender_role: "customer",
      sender_name,
      message_text,
      is_read: false,
    })
    .select()
    .single();

  if (error || !data) {
    console.error("Message insert failed:", error);
    return apiError("Could not send message.", 500);
  }

  return apiOk({ message: data });
}
