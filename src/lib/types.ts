export type BusinessCategory =
  | 'Kirana & Retail'
  | 'Salon & Beauty'
  | 'Medical & Pharmacy'
  | 'Restaurant & Cafe'
  | 'Gym & Fitness'
  | 'Clinic & Hospital'
  | 'Garments & Fashion'
  | 'Services & Repairs'
  | 'Other';

export type LeadStatus =
  | 'New'
  | 'Under Review'
  | 'Call Scheduled'
  | 'Proposal Sent'
  | 'Won'
  | 'Lost';

export type ProjectStage =
  | 'Received'
  | 'Under Review'
  | 'Call Scheduled'
  | 'Proposal Sent'
  | 'In Progress'
  | 'Delivered';

export interface Lead {
  id: string;
  ref_id: string;
  full_name: string;
  whatsapp_number: string;
  email?: string;
  city: string;
  business_name: string;
  business_type: BusinessCategory;
  has_website: boolean;
  existing_website_url?: string;
  needs: string[];
  budget_range: string;
  preferred_call_time: string;
  customer_message?: string;
  status: LeadStatus;
  stage: ProjectStage;
  assigned_to: string;
  internal_notes?: string;
  is_spam?: boolean;
  created_at: string;
  updated_at: string;
}

export interface LeadMessage {
  id: string;
  lead_id: string;
  sender_role: 'admin' | 'customer';
  sender_name: string;
  message_text: string;
  is_read: boolean;
  created_at: string;
}

export interface LeadFile {
  id: string;
  lead_id: string;
  file_name: string;
  file_url: string;
  file_type: 'proposal' | 'invoice' | 'asset';
  uploaded_by: string;
  created_at: string;
}

export interface LeadActivity {
  id: string;
  lead_id: string;
  action_title: string;
  action_detail?: string;
  actor_name: string;
  created_at: string;
}

export type SlaStatus = 'on_track' | 'warning_24h' | 'overdue';

export interface Step1FormData {
  full_name: string;
  whatsapp_number: string;
  email?: string;
  city: string;
  website_url_honeypot?: string; // Honeypot field for anti-spam
}

export interface Step2FormData {
  business_name: string;
  business_type: BusinessCategory;
  has_website: boolean;
  existing_website_url?: string;
}

export interface Step3FormData {
  needs: string[];
  budget_range: string;
  preferred_call_time: string;
  customer_message?: string;
}

export type RequestFormData = Step1FormData & Step2FormData & Step3FormData;
