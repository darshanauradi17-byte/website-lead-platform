"use client";

import React, { useState } from "react";
import { ExternalLink, Check, Filter, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export function PortfolioTeaser() {
  const [activeTab, setActiveTab] = useState<string>("All");

  const portfolioItems = [
    {
      title: "Patel Super Market",
      city: "Satellite, Ahmedabad",
      category: "Kirana & Retail",
      features: ["WhatsApp Cart", "Product List", "Google Maps Pin"],
      stats: "35+ Daily WhatsApp Orders",
      url: "https://apnaweb.in/demo/kirana",
      bgClass: "from-amber-900/10 to-brand-500/5",
    },
    {
      title: "Glamour Unisex Salon",
      city: "Bandra West, Mumbai",
      category: "Salon & Beauty",
      features: ["Online Slot Booking", "Service Menu", "Style Gallery"],
      stats: "120+ Monthly Appointments",
      url: "https://apnaweb.in/demo/salon",
      bgClass: "from-purple-900/10 to-brand-500/5",
    },
    {
      title: "Verma Medicos & Care",
      city: "Hazratganj, Lucknow",
      category: "Medical & Pharmacy",
      features: ["Prescription Photo Upload", "Medicine Search", "WhatsApp Direct"],
      stats: "Fast Local Home Delivery",
      url: "https://apnaweb.in/demo/pharmacy",
      bgClass: "from-sky-900/10 to-brand-500/5",
    },
    {
      title: "SpiceCraft Artisan Cafe",
      city: "MI Road, Jaipur",
      category: "Restaurant & Cafe",
      features: ["QR Digital Menu", "Table Booking", "Instagram Feed"],
      stats: "2.4x Dine-in Guests",
      url: "https://apnaweb.in/demo/cafe",
      bgClass: "from-orange-900/10 to-brand-500/5",
    },
    {
      title: "Iron Pump Fitness Club",
      city: "Sector 29, Gurugram",
      category: "Gym & Fitness",
      features: ["Membership Plans", "Trainer Slots", "WhatsApp Trial Pass"],
      stats: "45 New Gym Members / Mo",
      url: "https://apnaweb.in/demo/gym",
      bgClass: "from-emerald-900/10 to-brand-500/5",
    },
    {
      title: "Care Dental & Implant Clinic",
      city: "Kothrud, Pune",
      category: "Clinic & Hospital",
      features: ["OPD Schedule", "OPD Booking", "Doctor Bio"],
      stats: "Verified Google Reviews",
      url: "https://apnaweb.in/demo/clinic",
      bgClass: "from-teal-900/10 to-brand-500/5",
    },
  ];

  const categories = ["All", "Kirana & Retail", "Salon & Beauty", "Medical & Pharmacy", "Restaurant & Cafe", "Gym & Fitness"];

  const filteredItems = activeTab === "All"
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeTab);

  return (
    <section className="py-20 bg-warm-50 border-b border-warm-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-500 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
              Live Showcase
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-warm-900 tracking-tight">
              Real websites built for Indian local business owners.
            </h2>
            <p className="text-warm-600 text-base">
              Filter by business category to explore live features, layouts, and real results.
            </p>
          </div>

          <Link href="/portfolio">
            <button className="gradient-button px-4 py-2 rounded-xl text-white font-bold text-sm inline-flex items-center gap-1.5 shrink-0">
              <span>View Full Portfolio Showcase</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === cat
                  ? "gradient-button text-white shadow-sm"
                  : "bg-white text-warm-700 hover:bg-warm-100 border border-warm-200/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Portfolio Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <Card key={idx} hoverable className="flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                {/* Header Badge & City */}
                <div className="flex justify-between items-start">
                  <div>
                    <Badge variant="default" className="mb-2 bg-brand-50 text-brand-700 border-brand-200">
                      {item.category}
                    </Badge>
                    <h3 className="font-display font-bold text-xl text-warm-900">{item.title}</h3>
                    <p className="text-xs text-warm-500 font-medium">{item.city}</p>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-1.5 pt-2 border-t border-warm-100">
                  {item.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2 text-xs text-warm-700 font-medium">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Result & Link */}
              <div className="pt-4 border-t border-warm-200/60 flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                  ⚡ {item.stats}
                </span>
                <span className="text-xs font-bold text-brand-600 flex items-center gap-1">
                  <span>Demo View</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </span>
              </div>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
}
