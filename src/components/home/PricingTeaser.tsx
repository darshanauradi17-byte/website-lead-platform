"use client";

import React from "react";
import { Check, ShieldCheck, Zap, Sparkles, HelpCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function PricingTeaser() {
  const plans = [
    {
      name: "Local Business Starter",
      subtitle: "For single shops, clinics & local service providers",
      price: "₹8,999",
      period: "one-time design fee",
      popular: false,
      features: [
        "1-Page Fast Business Website",
        "WhatsApp Direct Order / Enquiry Button",
        "Google Maps Location & Local SEO Setup",
        "Mobile Responsive & Fast Loading (< 1s)",
        "Free .in or .com Domain (1 Year)",
        "Free High-Speed Hosting (1 Year)",
        "5–7 Days Guaranteed Delivery",
      ],
      cta: "Choose Starter Plan",
    },
    {
      name: "Catalog & Growth Pro",
      subtitle: "For kirana, salons, pharmacies & busy cafes",
      price: "₹16,499",
      period: "one-time design fee",
      popular: true,
      features: [
        "Up to 5 Pages (Home, Menu/Catalog, About, Contact)",
        "Online Slot Booking / Prescription Upload",
        "WhatsApp Shopping Cart Sync",
        "QR Code Digital Menu / Catalog Setup",
        "Google Business Profile Setup & Reviews",
        "Customer Portal Login & Lead Tracker",
        "Free Domain + Hosting + SSL Security",
        "Priority 2-Day SLA Support",
      ],
      cta: "Choose Pro Growth Plan",
    },
    {
      name: "Custom Enterprise Local",
      subtitle: "For multi-branch stores, hospitals & fitness chains",
      price: "Custom Quote",
      period: "based on requirements",
      popular: false,
      features: [
        "Multi-branch Location Selector",
        "Custom Payment Gateway Integration",
        "Inventory / Staff Schedule Management",
        "Dedicated Account Specialist",
        "WhatsApp API Automated Reminders",
        "Monthly Maintenance & Content Updates",
      ],
      cta: "Discuss Custom Needs",
    },
  ];

  return (
    <section className="py-20 bg-canvas-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-500 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
            Transparent Pricing
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-warm-900 tracking-tight">
            Fair, honest prices. No monthly surprises.
          </h2>
          <p className="text-warm-600 text-base leading-relaxed">
            You own 100% of your website code, domain, and data. We don't lock you into recurring technical fees.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`rounded-3xl p-8 flex flex-col justify-between relative transition-all duration-300 ${
                plan.popular
                  ? "bg-warm-900 text-white shadow-lifted ring-2 ring-brand-500 md:-translate-y-2"
                  : "bg-white text-warm-900 border border-warm-300 shadow-card hover:shadow-lifted"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand-500 text-white text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Most Popular for Indian Stores</span>
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className={`font-display font-bold text-2xl ${plan.popular ? "text-white" : "text-warm-900"}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-xs mt-1 ${plan.popular ? "text-warm-300" : "text-warm-600"}`}>
                    {plan.subtitle}
                  </p>
                </div>

                <div className="py-2 border-y border-warm-200/20">
                  <div className="flex items-baseline gap-2">
                    <span className="font-display font-extrabold text-4xl tracking-tight">{plan.price}</span>
                    <span className={`text-xs ${plan.popular ? "text-warm-300" : "text-warm-500"}`}>{plan.period}</span>
                  </div>
                </div>

                {/* Features Checklist */}
                <ul className="space-y-3 pt-2">
                  {plan.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2.5 text-xs font-medium">
                      <Check className={`w-4 h-4 shrink-0 mt-0.5 ${plan.popular ? "text-emerald-400" : "text-emerald-600"}`} />
                      <span className={plan.popular ? "text-warm-200" : "text-warm-700"}>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="pt-8">
                <Link href="/get-website">
                  <Button
                    variant={plan.popular ? "primary" : "outline"}
                    size="lg"
                    className="w-full justify-center font-bold text-sm"
                  >
                    {plan.cta} →
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Guarantees Box */}
        <div className="mt-12 p-6 rounded-2xl bg-warm-100 border border-warm-300/80 grid grid-cols-1 md:grid-cols-3 gap-6 text-center text-warm-800 text-xs font-semibold">
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span>Guaranteed 2-Working Day Contact</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Zap className="w-5 h-5 text-brand-600" />
            <span>Free Google Maps Listing Setup</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-600" />
            <span>Post-Launch Free Support (30 Days)</span>
          </div>
        </div>

      </div>
    </section>
  );
}
