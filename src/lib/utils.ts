import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Lead, SlaStatus } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateRefId(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let random = "";
  for (let i = 0; i < 6; i++) {
    random += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `APW-${random}`;
}

export function calculateSlaStatus(createdAt: string, status: string): SlaStatus {
  if (status === "Won" || status === "Lost" || status === "Proposal Sent") {
    return "on_track";
  }

  const createdTime = new Date(createdAt).getTime();
  const now = Date.now();
  const diffHours = (now - createdTime) / (1000 * 60 * 60);

  if (diffHours >= 48) {
    return "overdue"; // 2-day SLA breached (red)
  } else if (diffHours >= 24) {
    return "warning_24h"; // Over 24 hours (amber)
  }

  return "on_track";
}

export function formatIndianPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length === 10) {
    return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  }
  return phone;
}

export function getWhatsAppLink(phone: string, text: string = ""): string {
  const cleaned = phone.replace(/\D/g, "");
  const num = cleaned.length === 10 ? `91${cleaned}` : cleaned;
  return `https://wa.me/${num}?text=${encodeURIComponent(text)}`;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function exportLeadsToCsv(leads: Lead[]) {
  const headers = [
    "Ref ID",
    "Full Name",
    "Business Name",
    "Business Type",
    "City",
    "WhatsApp Number",
    "Email",
    "Needs",
    "Budget",
    "Status",
    "Stage",
    "Assigned To",
    "Created Date",
  ];

  const rows = leads.map((l) => [
    l.ref_id,
    `"${l.full_name.replace(/"/g, '""')}"`,
    `"${l.business_name.replace(/"/g, '""')}"`,
    l.business_type,
    l.city,
    l.whatsapp_number,
    l.email || "",
    `"${(l.needs || []).join(", ")}"`,
    l.budget_range,
    l.status,
    l.stage,
    l.assigned_to,
    new Date(l.created_at).toISOString(),
  ]);

  const csvContent =
    "data:text/csv;charset=utf-8," +
    [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `ApnaWeb_Leads_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
