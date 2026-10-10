import React from "react";
import { MultiStepForm } from "@/components/form/MultiStepForm";
import { ShieldCheck, Clock, CheckCircle } from "lucide-react";

export const metadata = {
  title: "Get My Website (3 Steps) — ApnaWeb",
  description: "Fill our quick 3-step form in 2 minutes. Guaranteed callback within 2 working days with custom website designs for your shop.",
};

export default function GetWebsitePage() {
  return (
    <main className="py-16 bg-canvas-light min-h-[85vh]">
      <div className="max-w-4xl mx-auto px-4 space-y-8">
        
        {/* Page Title */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
            <Clock className="w-3.5 h-3.5 text-emerald-600" />
            <span>Guaranteed Contact Within 2 Working Days</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-warm-900 tracking-tight">
            Get My Shop Website
          </h1>
          <p className="text-warm-600 text-base max-w-xl mx-auto">
            Takes under 2 minutes. Tell us about your business & requirements. No upfront payment required.
          </p>
        </div>

        {/* 3-Step MultiStep Form */}
        <MultiStepForm />

        {/* Trust Badges Footer */}
        <div className="pt-4 text-center grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-semibold text-warm-600 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>100% Data Privacy</span>
          </div>
          <div className="flex items-center justify-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>WhatsApp Direct Callback</span>
          </div>
          <div className="flex items-center justify-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>No High Agency Fees</span>
          </div>
        </div>

      </div>
    </main>
  );
}
