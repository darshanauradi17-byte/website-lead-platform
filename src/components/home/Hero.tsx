"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle, Clock, ShieldCheck, Sparkles, PhoneCall, Star, ShoppingBag, Scissors, Stethoscope, UtensilsCrossed, Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/Button";
import gsap from "gsap";

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.8 } });

      tl.fromTo(badgeRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, delay: 0.1 })
        .fromTo(headlineRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1 }, "-=0.5")
        .fromTo(".hero-sub", { y: 20, opacity: 0 }, { y: 0, opacity: 1 }, "-=0.5")
        .fromTo(ctaRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1 }, "-=0.4")
        .fromTo(mockupRef.current, { scale: 0.95, y: 40, opacity: 0 }, { scale: 1, y: 0, opacity: 1 }, "-=0.6");
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden bg-canvas-light">
      {/* Background Subtle Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#E6E2D3_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Asymmetric Copy */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Live Guarantee Badge */}
            <div ref={badgeRef} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-warm-100 border border-warm-300/80 text-warm-800 text-xs font-semibold shadow-xs">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>2-Day SLA Response Guarantee</span>
              <span className="text-warm-400">•</span>
              <span className="text-brand-600 font-bold">100% Indian Business Focused</span>
            </div>

            {/* Main Asymmetric Headline */}
            <h1 ref={headlineRef} className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-warm-900 leading-[1.12] tracking-tight">
              Get a professional website for your local shop or business. <br className="hidden sm:inline" />
              <span className="text-brand-500 underline decoration-warm-300 decoration-wavy decoration-2 underline-offset-8">
                Without heavy agency fees.
              </span>
            </h1>

            {/* Subcopy */}
            <p className="hero-sub text-base sm:text-lg text-warm-600 max-w-2xl leading-relaxed font-normal">
              Whether you run a Kirana store in Satellite, a salon in Bandra, a pharmacy in Lucknow, or a cafe in Jaipur — we build your high-converting website in 5–7 days. Complete with WhatsApp ordering, Google Maps setup, and online catalog.
            </p>

            {/* Key Value Checklist */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs sm:text-sm font-semibold text-warm-800">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>WhatsApp Order Sync</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Google Maps / Local SEO</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero Hidden Charges</span>
              </div>
            </div>

            {/* CTA Group */}
            <div ref={ctaRef} className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link href="/get-website">
                <Button size="lg" className="w-full sm:w-auto font-bold text-base shadow-lifted py-4">
                  <span>Get My Website in 3 Steps</span>
                  <ArrowRight className="w-5 h-5 ml-1" />
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto font-semibold text-base py-4">
                  See Live Local Examples
                </Button>
              </Link>
            </div>

            {/* Trust Proof */}
            <div className="pt-4 flex items-center gap-4 text-xs text-warm-600 border-t border-warm-200/60 max-w-md">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-brand-100 border-2 border-white flex items-center justify-center font-bold text-brand-700 text-xs">R</div>
                <div className="w-8 h-8 rounded-full bg-emerald-100 border-2 border-white flex items-center justify-center font-bold text-emerald-700 text-xs">P</div>
                <div className="w-8 h-8 rounded-full bg-amber-100 border-2 border-white flex items-center justify-center font-bold text-amber-700 text-xs">V</div>
              </div>
              <div>
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="font-bold text-warm-900 ml-1">4.9/5</span>
                </div>
                <span>Trusted by 85+ Indian shopkeepers & clinic owners</span>
              </div>
            </div>

          </div>

          {/* Right Column: Realistic Local Business Mockup Stack */}
          <div ref={mockupRef} className="lg:col-span-5 relative">
            
            {/* Main Realistic Browser Container */}
            <div className="bg-white rounded-2xl border-2 border-warm-300 shadow-lifted overflow-hidden relative">
              
              {/* Chrome Top Bar */}
              <div className="bg-warm-100 border-b border-warm-200 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <div className="bg-white border border-warm-300/80 rounded-md px-3 py-1 text-xs font-mono text-warm-600 flex items-center gap-2 max-w-[200px] truncate">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>patelkiranastore.in</span>
                </div>
                <div className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  LIVE
                </div>
              </div>

              {/* Mock Business Site Content */}
              <div className="p-5 space-y-4 bg-warm-50/50">
                
                {/* Store Banner */}
                <div className="bg-warm-900 text-white rounded-xl p-4 space-y-2 relative overflow-hidden">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-amber-400 font-bold">Ahmedabad Kirana</span>
                      <h3 className="font-display font-bold text-lg text-white">Patel Super Market</h3>
                      <p className="text-xs text-warm-300">Satellite Road, Near Iskcon Temple</p>
                    </div>
                    <ShoppingBag className="w-8 h-8 text-amber-400 stroke-1" />
                  </div>
                  <div className="pt-2 flex items-center gap-2 text-xs text-emerald-400 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    <span>Accepting Home Delivery Orders</span>
                  </div>
                </div>

                {/* Instant Order Button Mockup */}
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-emerald-800 font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                    <span>Order groceries on WhatsApp in 1-Click</span>
                  </div>
                  <span className="bg-emerald-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg">
                    Order Now
                  </span>
                </div>

                {/* Category Grid Mockup */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs font-medium text-warm-700">
                  <div className="bg-white p-2.5 rounded-lg border border-warm-200">
                    <div className="font-bold text-warm-900">Atta & Rice</div>
                    <div className="text-[10px] text-warm-500">In Stock</div>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-warm-200">
                    <div className="font-bold text-warm-900">Oil & Ghee</div>
                    <div className="text-[10px] text-warm-500">Fresh Stock</div>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-warm-200">
                    <div className="font-bold text-warm-900">Daily Dairy</div>
                    <div className="text-[10px] text-warm-500">Amul Direct</div>
                  </div>
                </div>

              </div>

              {/* Bottom Notification Badge */}
              <div className="p-3 bg-warm-100 border-t border-warm-200 text-xs text-warm-700 flex items-center justify-between">
                <span className="font-medium">📍 Google Maps Verified Listing</span>
                <span className="font-bold text-brand-600">Built by ApnaWeb</span>
              </div>

            </div>

            {/* Asymmetric Floating Card Overlays */}
            <div className="absolute -bottom-6 -left-6 bg-white p-3.5 rounded-xl border-2 border-warm-300 shadow-lifted max-w-[210px] hidden sm:flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-warm-900">2-Day Response</div>
                <div className="text-[11px] text-warm-600">Guaranteed callback</div>
              </div>
            </div>

            <div className="absolute -top-6 -right-4 bg-warm-900 text-white p-3 rounded-xl shadow-lg text-xs font-semibold hidden sm:flex items-center gap-2 border border-warm-700">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Includes Free Domain & Hosting</span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
