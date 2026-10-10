"use client";

import { Lead, LeadMessage, LeadFile, LeadActivity, LeadStatus, ProjectStage, RequestFormData } from "./types";
import { INITIAL_MOCK_LEADS, INITIAL_MOCK_MESSAGES, INITIAL_MOCK_FILES, INITIAL_MOCK_ACTIVITIES } from "./mock-data";
import { generateRefId } from "./utils";

const STORAGE_KEY_LEADS = "apnaweb_leads_v2";
const STORAGE_KEY_MESSAGES = "apnaweb_messages_v2";
const STORAGE_KEY_FILES = "apnaweb_files_v2";
const STORAGE_KEY_ACTIVITIES = "apnaweb_activities_v2";

export function getStoredLeads(): Lead[] {
  if (typeof window === "undefined") return INITIAL_MOCK_LEADS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_LEADS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_LEADS, JSON.stringify(INITIAL_MOCK_LEADS));
      return INITIAL_MOCK_LEADS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_MOCK_LEADS;
  }
}

export function saveStoredLeads(leads: Lead[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY_LEADS, JSON.stringify(leads));
  } catch (e) {
    console.error("Failed to save leads to storage", e);
  }
}

export function getStoredMessages(leadId: string): LeadMessage[] {
  if (typeof window === "undefined") return INITIAL_MOCK_MESSAGES.filter(m => m.lead_id === leadId);
  try {
    const raw = localStorage.getItem(STORAGE_KEY_MESSAGES);
    const allMsgs: LeadMessage[] = raw ? JSON.parse(raw) : INITIAL_MOCK_MESSAGES;
    return allMsgs.filter(m => m.lead_id === leadId);
  } catch {
    return INITIAL_MOCK_MESSAGES.filter(m => m.lead_id === leadId);
  }
}

export function saveNewMessage(msg: Omit<LeadMessage, "id" | "created_at">): LeadMessage {
  const newMsg: LeadMessage = {
    ...msg,
    id: `msg-${Date.now()}`,
    created_at: new Date().toISOString(),
  };

  if (typeof window !== "undefined") {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_MESSAGES);
      const allMsgs: LeadMessage[] = raw ? JSON.parse(raw) : INITIAL_MOCK_MESSAGES;
      allMsgs.push(newMsg);
      localStorage.setItem(STORAGE_KEY_MESSAGES, JSON.stringify(allMsgs));
    } catch (e) {
      console.error("Failed to save message", e);
    }
  }

  return newMsg;
}

export function createLeadFromForm(data: RequestFormData): Lead {
  const refId = generateRefId();
  const newLead: Lead = {
    id: `lead-${Date.now()}`,
    ref_id: refId,
    full_name: data.full_name,
    whatsapp_number: data.whatsapp_number,
    email: data.email || "",
    city: data.city,
    business_name: data.business_name,
    business_type: data.business_type,
    has_website: data.has_website,
    existing_website_url: data.existing_website_url || "",
    needs: data.needs || [],
    budget_range: data.budget_range,
    preferred_call_time: data.preferred_call_time,
    customer_message: data.customer_message || "",
    status: "New",
    stage: "Received",
    assigned_to: "Unassigned",
    internal_notes: "New request received via 3-step lead intake form.",
    is_spam: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const currentLeads = getStoredLeads();
  const updated = [newLead, ...currentLeads];
  saveStoredLeads(updated);

  // Add initial activity
  saveActivity({
    lead_id: newLead.id,
    action_title: "Request Submitted",
    action_detail: `3-step enquiry received from ${data.full_name} (${data.city}) for ${data.business_name}`,
    actor_name: "Customer",
  });

  return newLead;
}

export function updateLeadStatus(id: string, newStatus: LeadStatus, newStage?: ProjectStage): Lead[] {
  const leads = getStoredLeads();
  const updated = leads.map(lead => {
    if (lead.id === id) {
      let stage = newStage || lead.stage;
      // Auto-map status to project stage if stage not specified
      if (!newStage) {
        if (newStatus === "New") stage = "Received";
        if (newStatus === "Under Review") stage = "Under Review";
        if (newStatus === "Call Scheduled") stage = "Call Scheduled";
        if (newStatus === "Proposal Sent") stage = "Proposal Sent";
        if (newStatus === "Won") stage = "In Progress";
        if (newStatus === "Lost") stage = "Received";
      }

      const updatedLead = {
        ...lead,
        status: newStatus,
        stage: stage,
        updated_at: new Date().toISOString(),
      };

      saveActivity({
        lead_id: lead.id,
        action_title: `Status updated to ${newStatus}`,
        action_detail: `Pipeline stage set to ${stage}`,
        actor_name: "Admin",
      });

      return updatedLead;
    }
    return lead;
  });

  saveStoredLeads(updated);
  return updated;
}

export function updateLeadDetails(id: string, updates: Partial<Lead>): Lead[] {
  const leads = getStoredLeads();
  const updated = leads.map(lead => {
    if (lead.id === id) {
      const updatedLead = {
        ...lead,
        ...updates,
        updated_at: new Date().toISOString(),
      };

      saveActivity({
        lead_id: lead.id,
        action_title: "Lead details updated",
        action_detail: updates.internal_notes ? "Internal notes updated" : "Contact / Business details updated",
        actor_name: "Admin",
      });

      return updatedLead;
    }
    return lead;
  });

  saveStoredLeads(updated);
  return updated;
}

export function saveActivity(act: Omit<LeadActivity, "id" | "created_at">) {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ACTIVITIES);
    const activities: LeadActivity[] = raw ? JSON.parse(raw) : INITIAL_MOCK_ACTIVITIES;
    activities.unshift({
      ...act,
      id: `act-${Date.now()}`,
      created_at: new Date().toISOString(),
    });
    localStorage.setItem(STORAGE_KEY_ACTIVITIES, JSON.stringify(activities));
  } catch (e) {
    console.error("Failed to save activity", e);
  }
}

export function getLeadActivities(leadId: string): LeadActivity[] {
  if (typeof window === "undefined") return INITIAL_MOCK_ACTIVITIES.filter(a => a.lead_id === leadId);
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ACTIVITIES);
    const all: LeadActivity[] = raw ? JSON.parse(raw) : INITIAL_MOCK_ACTIVITIES;
    return all.filter(a => a.lead_id === leadId);
  } catch {
    return INITIAL_MOCK_ACTIVITIES.filter(a => a.lead_id === leadId);
  }
}
