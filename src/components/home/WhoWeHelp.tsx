"use client";

import React from "react";
import { Store, Scissors, Stethoscope, Utensils, Dumbbell, Pill, ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";

export function WhoWeHelp() {
  const categories = [
    {
      icon: Store,
      title: "Kirana & Retail Shops",
      examples: "Grocery stores, garments, hardware, sweet shops",
      features: ["WhatsApp direct order cart", "Product catalog with prices", "Google Maps location pin"],
      highlight: "Satellite, Ahmedabad • Patel Super Market",
    },
    {
      icon: Scissors,
      title: "Salons, Spas & Beauty Parlours",
      examples: "Unisex salons, bridal studios, spa centers",
      features: ["Online slot booking", "Service menu & price list", "Instagram haircut gallery"],
      highlight: "Bandra, Mumbai • Glamour Unisex Salon",
    },
    {
      icon: Pill,
      title: "Pharmacies & Medical Stores",
      examples: "Retail chemist, diagnostic centers, wellness stores",
      features: ["Prescription photo upload", "Medicine search request", "Home delivery status"],
      highlight: "Hazratganj, Lucknow • Verma Medicos",
    },
    {
      icon: Utensils,
      title: "Restaurants, Cafes & Bakeries",
      examples: "Dine-in restaurants, takeaway cafes, bakeries",
      features: ["QR code digital menu", "Table reservation", "WhatsApp party order button"],
      highlight: "MI Road, Jaipur • SpiceCraft Cafe",
    },
    {
      icon: Dumbbell,
      title: "Gyms & Fitness Clubs",
      examples: "Unisex gyms, yoga studios, crossfit centers",
      features: ["Membership tier comparison", "Trainer profiles & slots", "WhatsApp trial pass button"],
      highlight: "Sector 29, Gurugram • Iron Pump Gym",
    },
    {
      icon: Stethoscope,
      title: "Doctors & Polyclinics",
      examples: "Dentists, pediatricians, eye clinics, Ayurveda",
      features: ["OPD timing schedule", "Direct appointment form", "Patient review badges"],
      highlight: "Kothrud, Pune • Care Dental Clinic",
    },
  ];

  return (
    <section className="py-20 bg-warm-50 border-y border-warm-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-500 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
            Tailored For Local Business
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-warm-900 tracking-tight">
            We build websites tailored specifically for your business type.
          </h2>
          <p className="text-warm-600 text-base leading-relaxed">
            A corporate website doesn't work for a local store. We include features your customers actually use — like WhatsApp ordering, appointment slots, and prescription uploads.
          </p>
        </div>

        {/* Editorial Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <Card key={idx} hoverable className="flex flex-col justify-between space-y-5 border-warm-300/80">
                <div className="space-y-4">
                  {/* Category Header */}
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-warm-100 text-brand-500 flex items-center justify-center border border-warm-200 shadow-xs">
                      <Icon className="w-5 h-5 stroke-[2]" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-lg text-warm-900">{cat.title}</h3>
                      <p className="text-xs text-warm-500 font-medium">{cat.examples}</p>
                    </div>
                  </div>

                  {/* Feature Checklist */}
                  <ul className="space-y-2 pt-2 border-t border-warm-100">
                    {cat.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2 text-xs font-medium text-warm-700">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Local Real Example Badge */}
                <div className="pt-3 border-t border-warm-200/60 flex items-center justify-between text-[11px] text-warm-600 font-medium">
                  <span>{cat.highlight}</span>
                  <Link href="/get-website" className="text-brand-600 font-bold hover:underline inline-flex items-center gap-1">
                    <span>Build This</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-warm-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-card">
          <div className="space-y-1">
            <h4 className="font-display font-bold text-lg text-white">Don't see your business category above?</h4>
            <p className="text-xs text-warm-300">We build custom solutions for repair services, institutes, hardware stores & more.</p>
          </div>
          <Link href="/get-website">
            <button className="gradient-button px-5 py-2.5 rounded-xl text-white font-bold text-xs shadow-tactile shrink-0">
              Tell Us Your Requirements →
            </button>
          </Link>
        </div>

      </div>
    </section>
  );
}
