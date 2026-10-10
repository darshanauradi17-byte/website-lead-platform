"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "How fast will you contact me after I submit the form?",
      a: "Guaranteed within 2 working days (usually within 4–6 hours). Our web specialist calls you on WhatsApp/Phone to understand your shop requirements and show sample designs.",
    },
    {
      q: "Do I need technical knowledge to manage my website?",
      a: "Not at all! You receive customer orders directly on WhatsApp, and customer appointments on SMS/WhatsApp. For any content changes, our 30-day free support handles it for you.",
    },
    {
      q: "Are domain and hosting included in the price?",
      a: "Yes! Every website package includes a free .in or .com domain name for 1 year, high-speed SSL secured hosting, and Google Maps business location verification.",
    },
    {
      q: "Do I own my website and domain data?",
      a: "100% yes. Unlike monthly rent website platforms, you own all domain credentials, website code, and customer lead data.",
    },
    {
      q: "What if I already have a domain name?",
      a: "We connect your existing domain name to your new fast website at zero additional cost.",
    },
    {
      q: "How do I track my website project progress?",
      a: "You receive a unique Reference ID (e.g. APW-KIRANA) upon form submission. Log into your Customer Dashboard anytime to track live status (Received → Under Review → Call Scheduled → Proposal → In Progress → Delivered) and chat with our team.",
    },
  ];

  return (
    <section className="py-20 bg-canvas-light">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-14 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-500 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
            Frequently Asked Questions
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-warm-900 tracking-tight">
            Clear answers to common questions.
          </h2>
        </div>

        {/* FAQ Accordions */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-warm-200 shadow-xs overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="gradient-button w-full p-6 text-left font-display font-bold text-lg text-white flex justify-between items-center gap-4"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-white/70 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-white" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 pt-0 text-warm-600 text-sm leading-relaxed border-t border-warm-100">
                    <p className="pt-3">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Help Banner */}
        <div className="mt-12 text-center p-6 bg-warm-100 rounded-2xl border border-warm-300/80">
          <p className="text-sm font-semibold text-warm-800">Have a specific question not answered here?</p>
          <div className="mt-2 flex items-center justify-center gap-4 text-xs font-bold">
            <a href="https://wa.me/919825012345" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline">
              WhatsApp Us: +91 98250 12345
            </a>
            <span className="text-warm-400">•</span>
            <Link href="/contact" className="text-brand-600 hover:underline">
              Contact Page →
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
