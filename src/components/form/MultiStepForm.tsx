"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, ArrowLeft, ShieldCheck, Phone, CheckCircle2, Clock, Sparkles, Building2, User, MessageSquare, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { BusinessCategory, RequestFormData } from "@/lib/types";
import { createLeadFromForm } from "@/lib/lead-store";
import confetti from "canvas-confetti";
import Link from "next/link";

// Form Validation Schema using Zod
const formSchema = z.object({
  // Step 1
  full_name: z.string().min(2, "Full name is required (at least 2 characters)"),
  whatsapp_number: z.string().min(10, "Please enter a valid 10-digit WhatsApp number"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  city: z.string().min(2, "City / Location is required"),
  website_url_honeypot: z.string().optional(), // Anti-spam honeypot

  // Step 2
  business_name: z.string().min(2, "Business / Store name is required"),
  business_type: z.enum([
    "Kirana & Retail",
    "Salon & Beauty",
    "Medical & Pharmacy",
    "Restaurant & Cafe",
    "Gym & Fitness",
    "Clinic & Hospital",
    "Garments & Fashion",
    "Services & Repairs",
    "Other",
  ] as const),
  has_website: z.boolean().default(false),
  existing_website_url: z.string().optional(),

  // Step 3
  needs: z.array(z.string()).min(1, "Select at least one requirement"),
  budget_range: z.string().min(1, "Please select a budget range"),
  preferred_call_time: z.string().default("Anytime (10 AM - 7 PM)"),
  customer_message: z.string().optional(),
});

export function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [submittedRefId, setSubmittedRefId] = useState<string>("");
  const [rateLimitError, setRateLimitError] = useState<string>("");

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RequestFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: "",
      whatsapp_number: "",
      email: "",
      city: "",
      website_url_honeypot: "",
      business_name: "",
      business_type: "Kirana & Retail",
      has_website: false,
      existing_website_url: "",
      needs: ["WhatsApp Direct", "Google Maps / SEO"],
      budget_range: "₹12,000 - ₹20,000",
      preferred_call_time: "Evening (4 PM - 7 PM)",
      customer_message: "",
    },
  });

  const watchHasWebsite = watch("has_website");
  const watchNeeds = watch("needs") || [];

  const handleNeedToggle = (need: string) => {
    if (watchNeeds.includes(need)) {
      setValue("needs", watchNeeds.filter((n) => n !== need));
    } else {
      setValue("needs", [...watchNeeds, need]);
    }
  };

  const nextStep = async () => {
    let fieldsToValidate: (keyof RequestFormData)[] = [];
    if (currentStep === 1) {
      fieldsToValidate = ["full_name", "whatsapp_number", "city"];
    } else if (currentStep === 2) {
      fieldsToValidate = ["business_name", "business_type"];
    }

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const onSubmit = async (data: RequestFormData) => {
    // 1. Anti-spam Honeypot Check
    if (data.website_url_honeypot && data.website_url_honeypot.trim() !== "") {
      console.warn("Honeypot triggered, silent rejection.");
      setIsSubmitted(true);
      setSubmittedRefId("APW-SPAM");
      return;
    }

    // 2. Client Rate Limiting Check (Max 3 submissions per hour per browser)
    const lastSubmissions = localStorage.getItem("apnaweb_sub_history");
    const history: number[] = lastSubmissions ? JSON.parse(lastSubmissions) : [];
    const oneHourAgo = Date.now() - 3600 * 1000;
    const recentSubmissions = history.filter((time) => time > oneHourAgo);

    if (recentSubmissions.length >= 3) {
      setRateLimitError("Too many form requests submitted from this device. Please wait 1 hour or contact us on WhatsApp directly.");
      return;
    }

    setIsSubmitting(true);
    setRateLimitError("");

    try {
      // Create Lead record in store
      const lead = createLeadFromForm(data);

      // Save rate limit timestamp
      recentSubmissions.push(Date.now());
      localStorage.setItem("apnaweb_sub_history", JSON.stringify(recentSubmissions));

      setSubmittedRefId(lead.ref_id);
      setIsSubmitted(true);

      // Fire festive confetti effect on success
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {
        // ignore if confetti script fails
      }
    } catch (error) {
      console.error("Form submission error", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const businessCategories: BusinessCategory[] = [
    "Kirana & Retail",
    "Salon & Beauty",
    "Medical & Pharmacy",
    "Restaurant & Cafe",
    "Gym & Fitness",
    "Clinic & Hospital",
    "Garments & Fashion",
    "Services & Repairs",
    "Other",
  ];

  const availableNeeds = [
    "WhatsApp Ordering",
    "Appointment Slot Booking",
    "Prescription Photo Upload",
    "QR Digital Menu / Catalogue",
    "Google Maps / Local SEO",
    "Online Card/UPI Payments",
    "Domain & Hosting Included",
  ];

  const budgetOptions = [
    "₹8,000 - ₹12,000",
    "₹12,000 - ₹20,000",
    "₹20,000 - ₹35,000",
    "₹35,000+",
  ];

  if (isSubmitted) {
    return (
      <div className="max-w-xl mx-auto bg-white rounded-3xl p-8 sm:p-10 border-2 border-emerald-200 shadow-lifted text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
          <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Request Received Successfully
          </span>
          <h2 className="font-display text-3xl font-extrabold text-warm-900">
            We'll contact you within 2 working days!
          </h2>
          <p className="text-warm-600 text-sm">
            Thank you for trusting ApnaWeb. Our specialist is reviewing your requirements and will call you on WhatsApp/phone.
          </p>
        </div>

        {/* Reference ID Card */}
        <div className="bg-warm-50 p-4 rounded-2xl border border-warm-200 space-y-1">
          <div className="text-xs font-semibold text-warm-500 uppercase tracking-wider">
            Your Project Reference ID
          </div>
          <div className="font-mono text-2xl font-extrabold text-brand-600 tracking-wider">
            {submittedRefId}
          </div>
          <div className="text-[11px] text-warm-500">
            Keep this ID saved to track your project in your Customer Portal.
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href={`/portal/login?ref=${submittedRefId}`} className="w-full sm:w-auto">
            <Button size="md" className="w-full justify-center font-bold">
              Track My Project Status →
            </Button>
          </Link>
          <a
            href={`https://wa.me/919825012345?text=Hello%20ApnaWeb,%20my%20Reference%20ID%20is%20${submittedRefId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto"
          >
            <Button variant="whatsapp" size="md" className="w-full justify-center">
              Chat Now on WhatsApp
            </Button>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-warm-300 shadow-card overflow-hidden">
      
      {/* Progress Bar Header */}
      <div className="bg-warm-900 text-white p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
            Step {currentStep} of 3
          </span>
          <span className="text-xs text-warm-300 font-medium">
            {currentStep === 1 && "Personal & Location Info"}
            {currentStep === 2 && "Business & Category Details"}
            {currentStep === 3 && "Requirements & Budget"}
          </span>
        </div>

        {/* 3-Step Indicator Bar */}
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`h-2 rounded-full transition-all duration-300 ${
                step <= currentStep ? "bg-brand-500" : "bg-warm-700"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit(onSubmit)} className="p-6 sm:p-8 space-y-6">
        
        {rateLimitError && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
            <span>{rateLimitError}</span>
          </div>
        )}

        {/* Anti-spam Honeypot (Hidden from human eyes) */}
        <div className="hidden" aria-hidden="true">
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register("website_url_honeypot")}
          />
        </div>

        <AnimatePresence mode="wait">
          {/* STEP 1: Personal Details */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-5"
            >
              <div>
                <h3 className="font-display font-bold text-xl text-warm-900">
                  Who should we contact with your demo?
                </h3>
                <p className="text-xs text-warm-500">
                  We'll use your WhatsApp number to send design samples and schedule a call.
                </p>
              </div>

              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-warm-800 uppercase tracking-wider">
                  Your Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-warm-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    placeholder="e.g. Ramesh Patel"
                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-warm-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 text-sm text-warm-900 bg-warm-50/50"
                    {...register("full_name")}
                  />
                </div>
                {errors.full_name && (
                  <p className="text-xs text-red-600">{errors.full_name.message}</p>
                )}
              </div>

              {/* WhatsApp Number */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-warm-800 uppercase tracking-wider">
                  WhatsApp Number *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-emerald-600 absolute left-3.5 top-3.5" />
                  <input
                    type="tel"
                    placeholder="e.g. 9825012345"
                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-warm-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 text-sm text-warm-900 bg-warm-50/50"
                    {...register("whatsapp_number")}
                  />
                </div>
                {errors.whatsapp_number && (
                  <p className="text-xs text-red-600">{errors.whatsapp_number.message}</p>
                )}
              </div>

              {/* Email (Optional) */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-warm-800 uppercase tracking-wider">
                  Email Address <span className="text-warm-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="email"
                  placeholder="e.g. ramesh.patel@gmail.com"
                  className="w-full h-11 px-4 rounded-xl border border-warm-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 text-sm text-warm-900 bg-warm-50/50"
                  {...register("email")}
                />
              </div>

              {/* City / Location */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-warm-800 uppercase tracking-wider">
                  Your City / Area *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Satellite, Ahmedabad or Bandra, Mumbai"
                  className="w-full h-11 px-4 rounded-xl border border-warm-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 text-sm text-warm-900 bg-warm-50/50"
                  {...register("city")}
                />
                {errors.city && (
                  <p className="text-xs text-red-600">{errors.city.message}</p>
                )}
              </div>
            </motion.div>
          )}

          {/* STEP 2: Business Information */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-5"
            >
              <div>
                <h3 className="font-display font-bold text-xl text-warm-900">
                  Tell us about your local business
                </h3>
                <p className="text-xs text-warm-500">
                  This helps us select the right website template and features.
                </p>
              </div>

              {/* Business Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-warm-800 uppercase tracking-wider">
                  Store / Business Name *
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-warm-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    placeholder="e.g. Patel Super Market & Kirana"
                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-warm-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 text-sm text-warm-900 bg-warm-50/50"
                    {...register("business_name")}
                  />
                </div>
                {errors.business_name && (
                  <p className="text-xs text-red-600">{errors.business_name.message}</p>
                )}
              </div>

              {/* Business Type Category */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-warm-800 uppercase tracking-wider">
                  Business Category *
                </label>
                <select
                  className="w-full h-11 px-4 rounded-xl border border-warm-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 text-sm text-warm-900 bg-warm-50/50 font-medium"
                  {...register("business_type")}
                >
                  {businessCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Existing Website Check */}
              <div className="p-4 rounded-2xl border border-warm-200 bg-warm-50/50 space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded text-brand-500 focus:ring-brand-500"
                    checked={watchHasWebsite}
                    onChange={(e) => setValue("has_website", e.target.checked)}
                  />
                  <span className="text-xs font-bold text-warm-800">
                    I already have an existing website (We can redesign it)
                  </span>
                </label>

                {watchHasWebsite && (
                  <input
                    type="url"
                    placeholder="e.g. https://myoldwebsite.com"
                    className="w-full h-10 px-3.5 rounded-lg border border-warm-300 text-xs text-warm-900 bg-white"
                    {...register("existing_website_url")}
                  />
                )}
              </div>
            </motion.div>
          )}

          {/* STEP 3: Needs & Budget */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-5"
            >
              <div>
                <h3 className="font-display font-bold text-xl text-warm-900">
                  What features & budget do you prefer?
                </h3>
                <p className="text-xs text-warm-500">
                  Select what your customers will need on your new site.
                </p>
              </div>

              {/* Needs Checkbox Matrix */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-warm-800 uppercase tracking-wider">
                  Select Features Needed *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {availableNeeds.map((need) => {
                    const isSelected = watchNeeds.includes(need);
                    return (
                      <button
                        type="button"
                        key={need}
                        onClick={() => handleNeedToggle(need)}
                        className={`p-3 rounded-xl border text-left text-xs font-semibold flex items-center justify-between transition-all ${
                          isSelected
                            ? "gradient-button border-transparent text-white shadow-xs"
                            : "bg-warm-50/50 border-warm-200 text-warm-700 hover:border-warm-300"
                        }`}
                      >
                        <span>{need}</span>
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center ${
                            isSelected ? "bg-brand-500 text-white" : "border border-warm-300"
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
                {errors.needs && (
                  <p className="text-xs text-red-600">{errors.needs.message}</p>
                )}
              </div>

              {/* Budget Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-warm-800 uppercase tracking-wider">
                  Preferred Budget Range *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {budgetOptions.map((b) => (
                    <button
                      type="button"
                      key={b}
                      onClick={() => setValue("budget_range", b)}
                      className={`p-2.5 rounded-xl border text-center text-xs font-bold transition-all ${
                        watch("budget_range") === b
                          ? "gradient-button border-transparent text-white shadow-xs"
                          : "bg-white border-warm-200 text-warm-700 hover:bg-warm-100"
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preferred Call Time & Message */}
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-warm-800 uppercase tracking-wider block mb-1">
                    Preferred Callback Time
                  </label>
                  <select
                    className="w-full h-10 px-3 rounded-xl border border-warm-300 text-xs text-warm-900 bg-warm-50/50"
                    {...register("preferred_call_time")}
                  >
                    <option value="Morning (10 AM - 1 PM)">Morning (10 AM - 1 PM)</option>
                    <option value="Afternoon (1 PM - 4 PM)">Afternoon (1 PM - 4 PM)</option>
                    <option value="Evening (4 PM - 7 PM)">Evening (4 PM - 7 PM)</option>
                    <option value="Anytime (10 AM - 7 PM)">Anytime (10 AM - 7 PM)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-warm-800 uppercase tracking-wider block mb-1">
                    Additional Message or Notes <span className="text-warm-400 font-normal">(Optional)</span>
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Tell us any specific shop requirements or features..."
                    className="w-full p-3 rounded-xl border border-warm-300 text-xs text-warm-900 bg-warm-50/50"
                    {...register("customer_message")}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step Buttons Footer */}
        <div className="pt-4 border-t border-warm-200 flex items-center justify-between gap-4">
          {currentStep > 1 ? (
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={prevStep}
              className="font-semibold"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              <span>Back</span>
            </Button>
          ) : (
            <div className="text-xs text-warm-500 font-medium flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>No credit card needed</span>
            </div>
          )}

          {currentStep < 3 ? (
            <Button type="button" size="md" onClick={nextStep} className="font-bold">
              <span>Next: {currentStep === 1 ? "Business Details" : "Requirements"}</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          ) : (
            <Button
              type="submit"
              size="md"
              isLoading={isSubmitting}
              className="font-bold"
            >
              <span>Submit & Get Demo →</span>
            </Button>
          )}
        </div>
      </form>

    </div>
  );
}
