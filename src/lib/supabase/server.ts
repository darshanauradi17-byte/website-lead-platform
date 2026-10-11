import { createClient, SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client (service role).
 *
 * Uses SUPABASE_SERVICE_ROLE_KEY which must NEVER be exposed to the browser.
 * All customer-facing and admin access goes through our Next.js API routes
 * (src/app/api/**), which validate input and admin auth before touching the DB.
 */

const PLACEHOLDER_MARKERS = ["your-supabase-project", "your-supabase-anon-key", "your-supabase-service-role-key"];

export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) return false;
  if (PLACEHOLDER_MARKERS.some((marker) => url.includes(marker) || serviceKey.includes(marker))) return false;

  return true;
}

export function getSupabaseAdmin(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey || PLACEHOLDER_MARKERS.some((m) => url.includes(m) || serviceKey.includes(m))) {
    throw new Error(
      "Supabase is not configured. Copy .env.example to .env.local and set NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY and SUPABASE_SERVICE_ROLE_KEY with your project values."
    );
  }

  return createClient(url, serviceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
