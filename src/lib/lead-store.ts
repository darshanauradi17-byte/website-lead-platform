"use client";

/**
 * Client-side data layer for the lead platform.
 *
 * All functions talk to the Next.js API routes (src/app/api/**), which use the
 * server-only Supabase service-role client. Nothing is persisted in
 * localStorage anymore — Supabase is the single source of truth.
 *
 * Admin functions send the bearer token from admin login (POST /api/admin/login).
 */

import { Lead, LeadMessage, LeadStatus, ProjectStage, RequestFormData } from "./types";

const ADMIN_TOKEN_KEY = "apnaweb_admin_token";

// ---------------------------------------------------------------------------
// Admin token helpers (stateless HMAC token issued by /api/admin/login)
// ---------------------------------------------------------------------------

export function getAdminToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(ADMIN_TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setAdminToken(token: string | null) {
  if (typeof window === "undefined") return;
  try {
    if (token) {
      localStorage.setItem(ADMIN_TOKEN_KEY, token);
    } else {
      localStorage.removeItem(ADMIN_TOKEN_KEY);
    }
  } catch (e) {
    console.error("Failed to persist admin token", e);
  }
}

// ---------------------------------------------------------------------------
// Shared fetch wrapper
// ---------------------------------------------------------------------------

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function apiFetch<T>(path: string, options: RequestInit = {}, withAuth = false): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...((options.headers as Record<string, string>) || {}),
  };

  if (withAuth) {
    const token = getAdminToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(path, { ...options, headers });

  let payload: { success?: boolean; message?: string } & Record<string, unknown>;
  try {
    payload = await response.json();
  } catch {
    throw new ApiError(`Request failed (${response.status})`, response.status);
  }

  if (!response.ok) {
    // An expired/invalid admin token means the dashboard session is over.
    if (response.status === 401 && withAuth) {
      setAdminToken(null);
    }
    throw new ApiError(payload.message || `Request failed (${response.status})`, response.status);
  }

  return payload as T;
}

// ---------------------------------------------------------------------------
// Admin auth
// ---------------------------------------------------------------------------

export async function adminLogin(username: string, password: string): Promise<{ token: string; name: string }> {
  const payload = await apiFetch<{ token: string; name: string }>("/api/admin/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });

  setAdminToken(payload.token);
  return payload;
}

export function adminLogout() {
  // Tokens are stateless; dropping the token locally ends the session.
  setAdminToken(null);
}

// ---------------------------------------------------------------------------
// Leads (admin)
// ---------------------------------------------------------------------------

export async function getStoredLeads(): Promise<Lead[]> {
  const payload = await apiFetch<{ leads: Lead[] }>("/api/leads", {}, true);
  return payload.leads || [];
}

export async function createLeadFromForm(data: RequestFormData): Promise<Lead> {
  const payload = await apiFetch<{ lead: Lead }>("/api/leads", {
    method: "POST",
    body: JSON.stringify(data),
  });

  return payload.lead;
}


export async function updateLeadStatus(id: string, newStatus: LeadStatus, newStage?: ProjectStage): Promise<Lead[]> {
  await apiFetch<{ lead: Lead }>(`/api/leads/${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: JSON.stringify({ status: newStatus, ...(newStage ? { stage: newStage } : {}) }),
  }, true);

  // Return the fresh list so callers can replace their state in one step.
  return getStoredLeads();
}

export async function updateLeadDetails(id: string, updates: Partial<Lead>): Promise<Lead[]> {
  await apiFetch<{ lead: Lead }>(`/api/leads/${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: JSON.stringify(updates),
  }, true);

  return getStoredLeads();
}

// ---------------------------------------------------------------------------
// Customer portal (public, lookup via ref ID / WhatsApp number)
// ---------------------------------------------------------------------------

export async function lookupLead(query: string): Promise<Lead | null> {
  try {
    const payload = await apiFetch<{ lead: Lead }>(
      `/api/leads/lookup?q=${encodeURIComponent(query)}`
    );
    return payload.lead || null;
  } catch (e) {
    if (e instanceof ApiError && e.status === 404) return null;
    throw e;
  }
}

export async function updatePortalLeadNotes(id: string, refId: string, customerMessage: string): Promise<Lead> {
  const payload = await apiFetch<{ lead: Lead }>("/api/portal/lead", {
    method: "PATCH",
    body: JSON.stringify({ id, ref_id: refId, customer_message: customerMessage }),
  });

  return payload.lead;
}

// ---------------------------------------------------------------------------
// Messages
// ---------------------------------------------------------------------------

export async function getStoredMessages(leadId: string): Promise<LeadMessage[]> {
  const payload = await apiFetch<{ messages: LeadMessage[] }>(
    `/api/leads/${encodeURIComponent(leadId)}/messages`
  );
  return payload.messages || [];
}

export async function saveNewMessage(msg: {
  lead_id: string;
  sender_role: "admin" | "customer";
  sender_name: string;
  message_text: string;
  is_read?: boolean;
}): Promise<LeadMessage> {
  const payload = await apiFetch<{ message: LeadMessage }>(
    `/api/leads/${encodeURIComponent(msg.lead_id)}/messages`,
    {
      method: "POST",
      body: JSON.stringify({ sender_name: msg.sender_name, message_text: msg.message_text }),
    }
  );

  return payload.message;
}
