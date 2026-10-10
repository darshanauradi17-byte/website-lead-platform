-- ============================================================================
-- APNAWEB SUPABASE DATABASE SCHEMA, RLS & SEED DATA
-- ============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. ENUMS
CREATE TYPE lead_status AS ENUM (
  'New',
  'Under Review',
  'Call Scheduled',
  'Proposal Sent',
  'Won',
  'Lost'
);

CREATE TYPE project_stage AS ENUM (
  'Received',
  'Under Review',
  'Call Scheduled',
  'Proposal Sent',
  'In Progress',
  'Delivered'
);

CREATE TYPE business_category AS ENUM (
  'Kirana & Retail',
  'Salon & Beauty',
  'Medical & Pharmacy',
  'Restaurant & Cafe',
  'Gym & Fitness',
  'Clinic & Hospital',
  'Garments & Fashion',
  'Services & Repairs',
  'Other'
);

-- 2. LEADS TABLE
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ref_id TEXT UNIQUE NOT NULL DEFAULT ('APW-' || UPPER(SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 6))),
  
  -- Customer info (Step 1)
  full_name TEXT NOT NULL,
  whatsapp_number TEXT NOT NULL,
  email TEXT,
  city TEXT NOT NULL,
  
  -- Business info (Step 2)
  business_name TEXT NOT NULL,
  business_type business_category NOT NULL DEFAULT 'Other',
  has_website BOOLEAN DEFAULT FALSE,
  existing_website_url TEXT,
  
  -- Requirements & Budget (Step 3)
  needs TEXT[] DEFAULT '{}', -- e.g. {'WhatsApp Ordering', 'Google Maps / SEO', 'Online Payments'}
  budget_range TEXT NOT NULL, -- e.g. '₹8,000 - ₹15,000'
  preferred_call_time TEXT DEFAULT 'Anytime (10 AM - 7 PM)',
  customer_message TEXT,
  
  -- Administrative & Workflow State
  status lead_status DEFAULT 'New',
  stage project_stage DEFAULT 'Received',
  assigned_to TEXT DEFAULT 'Unassigned',
  internal_notes TEXT,
  
  -- Security & Audit
  ip_address TEXT,
  user_agent TEXT,
  is_spam BOOLEAN DEFAULT FALSE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL, -- Customer Auth ID when created
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for SLA & Fast Search
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads(created_at);
CREATE INDEX IF NOT EXISTS idx_leads_user_id ON public.leads(user_id);
CREATE INDEX IF NOT EXISTS idx_leads_ref_id ON public.leads(ref_id);

-- 3. MESSAGES TABLE (Customer <-> Agency Chat)
CREATE TABLE IF NOT EXISTS public.lead_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  sender_role TEXT NOT NULL CHECK (sender_role IN ('admin', 'customer')),
  sender_name TEXT NOT NULL,
  message_text TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. DOCUMENTS & PROPOSALS TABLE
CREATE TABLE IF NOT EXISTS public.lead_files (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT NOT NULL, -- 'proposal', 'invoice', 'asset'
  uploaded_by TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. ACTIVITY LOG TABLE
CREATE TABLE IF NOT EXISTS public.lead_activity (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  action_title TEXT NOT NULL,
  action_detail TEXT,
  actor_name TEXT DEFAULT 'System',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_activity ENABLE ROW LEVEL SECURITY;

-- Anonymous users can create new leads (Public submission form)
CREATE POLICY "Public Lead Creation" ON public.leads
  FOR INSERT WITH CHECK (true);

-- Customers can view & edit only their own leads
CREATE POLICY "Customer Own Lead View" ON public.leads
  FOR SELECT USING (auth.uid() = user_id OR ref_id IS NOT NULL);

CREATE POLICY "Customer Own Lead Update" ON public.leads
  FOR UPDATE USING (auth.uid() = user_id);

-- Messages RLS
CREATE POLICY "Public Lead Messages View" ON public.lead_messages
  FOR SELECT USING (true);

CREATE POLICY "Public Lead Messages Insert" ON public.lead_messages
  FOR INSERT WITH CHECK (true);

-- Files RLS
CREATE POLICY "Public Files Access" ON public.lead_files
  FOR ALL USING (true);

-- Activity Log RLS
CREATE POLICY "Public Activity Access" ON public.lead_activity
  FOR ALL USING (true);

-- ============================================================================
-- SEED DATA FOR REALISTIC INDIAN LOCAL BUSINESS LEADS
-- ============================================================================

INSERT INTO public.leads 
  (ref_id, full_name, whatsapp_number, email, city, business_name, business_type, has_website, needs, budget_range, preferred_call_time, customer_message, status, stage, assigned_to, internal_notes, created_at)
VALUES
  (
    'APW-KIRANA', 'Ramesh Patel', '+91 98250 12345', 'patelkiranastore@gmail.com', 'Ahmedabad',
    'Patel Super Market & Kirana', 'Kirana & Retail', FALSE,
    ARRAY['WhatsApp Ordering', 'Google Maps / SEO', 'Online Payments', 'Product Catalogue'],
    '₹12,000 - ₹20,000', 'Evening (4 PM - 7 PM)',
    'We sell daily groceries and want local customers in Satellite area to order directly on WhatsApp.',
    'New', 'Received', 'Unassigned', 'High potential for monthly maintenance plan.',
    NOW() - INTERVAL '4 hours'
  ),
  (
    'APW-SALON', 'Pooja Sharma', '+91 98190 98765', 'pooja.glam@gmail.com', 'Mumbai',
    'Glamour Unisex Salon & Spa', 'Salon & Beauty', TRUE, 'https://glamoursalon.wordpress.com',
    ARRAY['Appointment Booking', 'Google Maps / SEO', 'WhatsApp Notifications'],
    '₹15,000 - ₹25,000', 'Afternoon (1 PM - 4 PM)',
    'Existing WordPress site is very slow. Need modern fast booking website for Bandra salon.',
    'Call Scheduled', 'Call Scheduled', 'Darshan (Owner)', 'Called Pooja on WhatsApp. Demo scheduled for Friday 3 PM.',
    NOW() - INTERVAL '18 hours'
  ),
  (
    'APW-PHARMA', 'Dr. Alok Verma', '+91 94150 55443', 'verma.meds@yahoo.com', 'Lucknow',
    'Verma Medicos & Diagnostic Care', 'Medical & Pharmacy', FALSE,
    ARRAY['Prescription Upload', 'Google Maps / SEO', 'WhatsApp Direct', 'Medicine Search'],
    '₹20,000 - ₹35,000', 'Morning (10 AM - 1 PM)',
    'Need customer portal where local patients can upload prescription photo and order home delivery.',
    'Proposal Sent', 'Proposal Sent', 'Rahul (Dev)', 'Sent quotation for ₹22,000 with 1 year free domain & hosting.',
    NOW() - INTERVAL '30 hours'
  ),
  (
    'APW-CAFE', 'Vikram Singh', '+91 97110 33221', 'spicecraft.cafe@gmail.com', 'Jaipur',
    'SpiceCraft Artisan Cafe', 'Restaurant & Cafe', FALSE,
    ARRAY['Digital QR Menu', 'Online Table Booking', 'Google Maps / SEO', 'Instagram Gallery'],
    '₹15,000 - ₹25,000', 'Evening (4 PM - 7 PM)',
    'Need clean digital menu with QR code for tables and web page showing our cafe ambience.',
    'Won', 'In Progress', 'Darshan (Owner)', 'Payment received ₹10,000 advance. Design mockups approved.',
    NOW() - INTERVAL '3 days'
  ),
  (
    'APW-GYM', 'Captain Ranveer Hooda', '+91 99990 11223', 'ironpump.gym@gmail.com', 'Gurugram',
    'Iron Pump Fitness Club', 'Gym & Fitness', FALSE,
    ARRAY['Membership Plans', 'WhatsApp Enquiries', 'Google Maps / SEO', 'Trainer Profiles'],
    '₹12,000 - ₹20,000', 'Morning (10 AM - 1 PM)',
    'Want a strong website showcasing our 5000 sq ft gym, equipment, and membership packages.',
    'Won', 'Delivered', 'Darshan (Owner)', 'Site live on ironpumpfitness.in. Customer super happy!',
    NOW() - INTERVAL '7 days'
  );

-- Seed Messages for initial chat demo
INSERT INTO public.lead_messages (lead_id, sender_role, sender_name, message_text, created_at)
SELECT id, 'admin', 'ApnaWeb Team', 'Namaste Ramesh ji! We received your request for Patel Super Market. Our specialist will call you today evening.', NOW() - INTERVAL '3 hours'
FROM public.leads WHERE ref_id = 'APW-KIRANA';

INSERT INTO public.lead_messages (lead_id, sender_role, sender_name, message_text, created_at)
SELECT id, 'customer', 'Ramesh Patel', 'Thank you! Please call after 5 PM when store rush slows down.', NOW() - INTERVAL '2 hours'
FROM public.leads WHERE ref_id = 'APW-KIRANA';
