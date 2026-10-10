"use client";

import React from "react";
import { FileText, PhoneCall, Rocket, ArrowRight, ShieldCheck, Clock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function Process() {
  const steps = [
    {
      num: "01",
      icon: FileText,
      title: "Fill the 3-Step Request Form",
      time: "Takes 2 minutes",
      desc: "Tell us about your business name, shop location, website requirements (WhatsApp order, booking, catalogue), and preferred budget.",
      tag: "No upfront payment required",
    },
    {
      num: "02",
      icon: PhoneCall,
      title: "We Contact You in 2 Working Days",
      time: "Guaranteed SLA Call",
      desc: "Our web specialist calls you on WhatsApp/phone to review details, show sample designs for your business type, and send a clear proposal.",
      tag: "2-Day Response SLA",
    },
    {
      num: "03",
      icon: Rocket,
      title: "Review, Track Progress & Launch",
      time: "Live in 5–7 Days",
      desc: "Log into your customer tracking portal to monitor progress, request revisions, and launch your live site with Google Maps verification.",
      tag: "100% Data Ownership",
    },
  ];

  return (
    <section className="py-20 bg-canvas-light relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-500 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
            Simple 3-Step Process
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-warm-900 tracking-tight">
            How we deliver your website without stress.
          </h2>
          <p className="text-warm-600 text-base leading-relaxed">
            No endless meetings or confusing technical jargon. A straightforward process designed for busy shop owners.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-warm-200/90 p-8 shadow-card flex flex-col justify-between relative space-y-6 hover:shadow-lifted transition-all duration-300"
              >
                {/* Number Badge */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-500 font-display font-extrabold text-xl flex items-center justify-center border border-brand-200">
                    {step.num}
                  </div>
                  <span className="text-xs font-bold text-warm-500 bg-warm-100 px-2.5 py-1 rounded-md">
                    {step.time}
                  </span>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="font-display font-bold text-xl text-warm-900 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-warm-600 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {/* Footer Guarantee */}
                <div className="pt-4 border-t border-warm-100 flex items-center gap-2 text-xs font-semibold text-emerald-700">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{step.tag}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="mt-14 text-center">
          <Link href="/get-website">
            <Button size="lg" className="font-bold text-base shadow-lifted">
              <span>Start Step 1: Fill Request Form</span>
              <ArrowRight className="w-5 h-5 ml-1" />
            </Button>
          </Link>
          <p className="text-xs text-warm-500 mt-3 font-medium">
            Zero commitment • Takes under 2 minutes to submit
          </p>
        </div>

      </div>
    </section>
  );
}
