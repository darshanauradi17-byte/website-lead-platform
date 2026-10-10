import React from "react";
import Link from "next/link";
import { Check, ShieldCheck, Zap, ArrowRight, MessageSquare, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "Services & Pricing — ApnaWeb Local Business Web Studio",
  description: "Transparent website packages for local shop owners. 100% data ownership, free domain & hosting, zero hidden fees.",
};

export default function ServicesPage() {
  const comparisonMatrix = [
    { feature: "Custom Design for Your Business Category", starter: "✓ Yes", pro: "✓ Yes", custom: "✓ Custom Layout" },
    { feature: "WhatsApp Direct Order / Enquiry Button", starter: "✓ Yes", pro: "✓ Yes + Cart Sync", custom: "✓ Automated Bot API" },
    { feature: "Google Maps Location & SEO Verification", starter: "✓ Yes", pro: "✓ Yes + Reviews", custom: "✓ Multi-branch SEO" },
    { feature: "Mobile Speed Optimization (< 1 second)", starter: "✓ Yes", pro: "✓ Yes", custom: "✓ Yes" },
    { feature: "Free Domain (.in / .com for 1 Year)", starter: "✓ Included", pro: "✓ Included", custom: "✓ Multi-Domain" },
    { feature: "Free High-Speed Hosting (1 Year)", starter: "✓ Included", pro: "✓ Included", custom: "✓ Dedicated Host" },
    { feature: "Appointment Booking / Slot Selector", starter: "—", pro: "✓ Yes", custom: "✓ Staff Calendar" },
    { feature: "QR Code Digital Menu / Catalogue", starter: "—", pro: "✓ Included", custom: "✓ POS Sync" },
    { feature: "Customer Portal & Live Lead Tracker", starter: "✓ Included", pro: "✓ Included", custom: "✓ Multi-user Admin" },
    { feature: "Guaranteed Delivery SLA", starter: "5 Days", pro: "7 Days", custom: "Custom Schedule" },
  ];

  return (
    <main className="py-16 space-y-16 bg-canvas-light">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-500 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
          Services & Pricing Matrix
        </span>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-warm-900 tracking-tight">
          Everything included for your shop website.
        </h1>
        <p className="text-warm-600 text-base leading-relaxed">
          No hidden maintenance fees or complicated subscriptions. Clear upfront pricing crafted for Indian business owners.
        </p>
      </div>

      {/* Feature Comparison Table */}
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-white rounded-3xl border border-warm-300 shadow-card overflow-hidden">
          <div className="p-6 bg-warm-900 text-white flex justify-between items-center">
            <h3 className="font-display font-bold text-xl text-white">Full Feature Comparison Matrix</h3>
            <span className="text-xs text-amber-400 font-bold">2-Day Response SLA Guaranteed</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-warm-100 text-warm-900 font-bold uppercase tracking-wider border-b border-warm-200">
                <tr>
                  <th className="p-4">Feature / Specification</th>
                  <th className="p-4">Starter (₹8,999)</th>
                  <th className="p-4 text-brand-600">Pro Growth (₹16,499)</th>
                  <th className="p-4">Custom Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-warm-100 font-medium text-warm-800">
                {comparisonMatrix.map((row, idx) => (
                  <tr key={idx} className="hover:bg-warm-50/80 transition-colors">
                    <td className="p-4 font-semibold text-warm-900">{row.feature}</td>
                    <td className="p-4">{row.starter}</td>
                    <td className="p-4 font-bold text-brand-700 bg-brand-50/40">{row.pro}</td>
                    <td className="p-4">{row.custom}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Bottom Callout */}
      <div className="max-w-3xl mx-auto text-center px-4 space-y-6">
        <h3 className="font-display font-bold text-2xl text-warm-900">
          Ready to get your store online this week?
        </h3>
        <div className="flex justify-center gap-4">
          <Link href="/get-website">
            <Button size="lg" className="font-bold">
              <span>Start Step 1: Fill Request Form</span>
              <ArrowRight className="w-5 h-5 ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
