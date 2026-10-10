"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, ExternalLink, MessageSquare, Mail, Instagram, ArrowRight, User, Phone, MapPin, Sparkles, Clock, Star, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function PortfolioPage() {
  const [activeTab, setActiveTab] = useState<string>("All");

  const portfolioItems = [
    {
      title: "Patel Super Market & Kirana",
      city: "Satellite Road, Ahmedabad",
      category: "Kirana & Retail",
      features: ["WhatsApp Direct Cart Order", "Product Catalogue", "Google Maps Verification"],
      stats: "35+ Daily WhatsApp Orders",
      url: "https://apnaweb.in/demo/kirana",
      img: "/photos/customer-homepage.png",
    },
    {
      title: "Glamour Unisex Salon & Spa",
      city: "Bandra West, Mumbai",
      category: "Salon & Beauty",
      features: ["Online Slot Booking", "Service Menu & Price List", "Instagram Style Gallery"],
      stats: "120+ Monthly Appointments",
      url: "https://apnaweb.in/demo/salon",
      img: "/photos/owner-dashboard.png",
    },
    {
      title: "Verma Medicos & Care",
      city: "Hazratganj, Lucknow",
      category: "Pharmacy & Care",
      features: ["Prescription Photo Upload", "Medicine Search", "Home Delivery Tracker"],
      stats: "Streamlined Home Delivery",
      url: "https://apnaweb.in/demo/pharmacy",
      img: "/photos/request-workflow.png",
    },
    {
      title: "SpiceCraft Artisan Cafe",
      city: "MI Road, Jaipur",
      category: "Restaurant & Cafe",
      features: ["QR Digital Table Menu", "Online Table Booking", "Instagram Feed"],
      stats: "2.4x Weekend Table Guests",
      url: "https://apnaweb.in/demo/cafe",
      img: "/photos/website-requests-dashboard.png",
    },
    {
      title: "Iron Pump Fitness Club",
      city: "Sector 29, Gurugram",
      category: "Gym & Fitness",
      features: ["Membership Tier Plans", "Trainer Slots", "WhatsApp Trial Pass"],
      stats: "45 New Gym Members / Mo",
      url: "https://apnaweb.in/demo/gym",
      img: "/photos/customer-homepage.png",
    },
    {
      title: "Care Dental & Implant Clinic",
      city: "Kothrud, Pune",
      category: "Clinic & Hospital",
      features: ["OPD Schedule", "OPD Booking Form", "Doctor Bio"],
      stats: "Verified Google Reviews",
      url: "https://apnaweb.in/demo/clinic",
      img: "/photos/owner-dashboard.png",
    },
  ];

  const categories = ["All", "Kirana & Retail", "Salon & Beauty", "Pharmacy & Care", "Restaurant & Cafe", "Gym & Fitness"];

  const filteredItems = activeTab === "All"
    ? portfolioItems
    : portfolioItems.filter((i) => i.category === activeTab);

  return (
    <main className="bg-canvas-light text-warm-900 selection:bg-brand-500 selection:text-white">
      
      {/* HERO SECTION — Elena Voss Style with Photo Placeholder */}
      <section className="pt-16 pb-20 border-b border-warm-200 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column Copy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-bold font-mono">
                <span className="w-2 h-2 rounded-full bg-brand-500 animate-ping" />
                <span>● HIGH-IMPACT WEB DEVELOPMENT & DESIGN</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-warm-900 tracking-tight leading-[1.1]">
                Crafting high-converting websites for{" "}
                <span className="text-brand-500 italic underline decoration-warm-300 decoration-wavy underline-offset-8">
                  Indian local businesses.
                </span>
              </h1>

              <p className="text-warm-600 text-base sm:text-lg leading-relaxed max-w-2xl">
                Hi, I’m <strong>Darshan</strong> — founder of ApnaWeb Studio. I build ultra-fast, modern websites for shopkeepers, salons, pharmacies, cafes & clinics with WhatsApp ordering, Google Maps setup, and zero recurring agency traps.
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <Link href="/get-website">
                  <Button size="lg" className="font-bold shadow-lifted">
                    <span>Fill 3-Step Request Form</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
                <a href="#work">
                  <Button variant="outline" size="lg" className="font-semibold">
                    Explore Case Studies ↓
                  </Button>
                </a>
              </div>

              {/* Quick Stats Row */}
              <div className="pt-6 border-t border-warm-200 grid grid-cols-3 gap-4 text-center sm:text-left">
                <div>
                  <div className="font-display font-extrabold text-2xl text-warm-900">85+</div>
                  <div className="text-xs text-warm-500">Sites Delivered</div>
                </div>
                <div>
                  <div className="font-display font-extrabold text-2xl text-warm-900">2-Day</div>
                  <div className="text-xs text-warm-500">Guaranteed SLA</div>
                </div>
                <div>
                  <div className="font-display font-extrabold text-2xl text-warm-900">4.9/5</div>
                  <div className="text-xs text-warm-500">Owner Rating</div>
                </div>
              </div>
            </div>

            {/* Right Photo Frame Placeholder */}
            <div className="lg:col-span-5 relative">
              <div className="bg-warm-900 text-white p-8 rounded-3xl border-2 border-warm-700 shadow-lifted text-center space-y-6 aspect-[4/5] flex flex-col justify-between items-center relative overflow-hidden">
                <div className="w-full pt-4 flex justify-between items-center text-xs text-amber-400 font-mono">
                  <span>NAV-AHMEDABAD</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                    FOUNDER
                  </span>
                </div>

                {/* Photo Placeholder Inner */}
                <div className="space-y-4 my-auto">
                  <div className="w-20 h-20 rounded-full bg-warm-800 border-2 border-dashed border-brand-400 text-brand-400 flex items-center justify-center mx-auto text-3xl shadow-inner">
                    <User className="w-10 h-10" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-white">Owner Photo Slot</h3>
                    <p className="text-xs text-warm-400 max-w-[220px] mx-auto mt-1">
                      Founder photo frame prepared — you can easily replace this frame with your photo later!
                    </p>
                  </div>
                </div>

                <div className="w-full bg-warm-800/90 border border-warm-700 p-3 rounded-2xl text-xs text-warm-300 flex justify-between items-center">
                  <span>Darshan • ApnaWeb Studio</span>
                  <span className="text-emerald-400 font-bold">Online</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CASE STUDIES GRID */}
      <section id="work" className="py-20 border-b border-warm-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-500 font-mono">
                SELECTED WORKS
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-warm-900">
                Local Business Case Studies
              </h2>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                    activeTab === cat
                      ? "gradient-button text-white shadow-sm"
                      : "bg-white text-warm-700 hover:bg-warm-100 border border-warm-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-warm-300 shadow-card hover:shadow-lifted transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="h-48 bg-warm-100 relative overflow-hidden border-b border-warm-200">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-warm-900/90 text-amber-400 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md backdrop-blur">
                      {item.category}
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    <div>
                      <h3 className="font-display font-bold text-xl text-warm-900">{item.title}</h3>
                      <p className="text-xs text-warm-500 font-medium">{item.city}</p>
                    </div>

                    <ul className="space-y-1.5 pt-2 border-t border-warm-100 text-xs text-warm-700">
                      {item.features.map((f, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center justify-between border-t border-warm-100 mt-4">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                    ⚡ {item.stats}
                  </span>
                  <Link href="/get-website" className="text-xs font-bold text-brand-600 flex items-center gap-1 hover:underline">
                    <span>Live Demo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* DIRECT CONTACT & INSTAGRAM LINK */}
      <section className="py-20 bg-warm-900 text-white">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-8">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 font-mono">
              DIRECT CONTACT
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white">
              Connect Directly with Founder
            </h2>
            <p className="text-warm-300 text-base max-w-xl mx-auto">
              Ready to start your store website? Reach out on WhatsApp, Email or Instagram directly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            <a
              href="https://wa.me/919825012345"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-2xl bg-warm-800 border border-warm-700 hover:border-emerald-500 transition-all flex items-center justify-between"
            >
              <div>
                <div className="font-bold text-white text-base">WhatsApp Direct</div>
                <div className="text-xs text-warm-300">+91 98250 12345</div>
              </div>
              <MessageSquare className="w-6 h-6 text-emerald-400" />
            </a>

            <a
              href="mailto:hello@apnaweb.in"
              className="p-6 rounded-2xl bg-warm-800 border border-warm-700 hover:border-brand-500 transition-all flex items-center justify-between"
            >
              <div>
                <div className="font-bold text-white text-base">Email Us</div>
                <div className="text-xs text-warm-300">hello@apnaweb.in</div>
              </div>
              <Mail className="w-6 h-6 text-brand-400" />
            </a>

            <a
              href="https://www.instagram.com/darshan_auradi_06/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-2xl bg-warm-800 border border-warm-700 hover:border-pink-500 transition-all flex items-center justify-between"
            >
              <div>
                <div className="font-bold text-white text-base">Instagram</div>
                <div className="text-xs text-warm-300">@darshan_auradi_06</div>
              </div>
              <Instagram className="w-6 h-6 text-pink-400" />
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
