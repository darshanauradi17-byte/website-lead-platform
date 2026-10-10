import React from "react";
import { MessageSquare, Phone, Mail, MapPin, Clock, Instagram, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "Contact Us — ApnaWeb Studio",
  description: "Get in touch with ApnaWeb for website inquiries. Guaranteed callback within 2 working days.",
};

export default function ContactPage() {
  return (
    <main className="py-16 bg-canvas-light min-h-[85vh]">
      <div className="max-w-5xl mx-auto px-4 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-500 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
            Contact & Support
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-warm-900 tracking-tight">
            We're here to help your store grow.
          </h1>
          <p className="text-warm-600 text-base">
            Guaranteed callback within 2 working days. Reach us on WhatsApp, Phone, or Instagram directly.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <a
            href="https://wa.me/919825012345"
            target="_blank"
            rel="noopener noreferrer"
            className="p-8 rounded-3xl bg-white border border-warm-300 shadow-card hover:shadow-lifted transition-all flex items-start gap-5"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Instant Chat</span>
              <h3 className="font-display font-bold text-xl text-warm-900">WhatsApp Support</h3>
              <p className="text-xs text-warm-600">+91 98250 12345</p>
              <p className="text-[11px] text-warm-400 pt-1">Mon – Sat, 10 AM to 7 PM IST</p>
            </div>
          </a>

          <a
            href="tel:+919825012345"
            className="p-8 rounded-3xl bg-white border border-warm-300 shadow-card hover:shadow-lifted transition-all flex items-start gap-5"
          >
            <div className="w-12 h-12 rounded-2xl bg-brand-100 text-brand-700 flex items-center justify-center shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-bold text-brand-700 uppercase tracking-wider">Direct Call</span>
              <h3 className="font-display font-bold text-xl text-warm-900">Phone Helpline</h3>
              <p className="text-xs text-warm-600">+91 98250 12345</p>
              <p className="text-[11px] text-warm-400 pt-1">Guaranteed 2-Day Callback SLA</p>
            </div>
          </a>

          <a
            href="mailto:hello@apnaweb.in"
            className="p-8 rounded-3xl bg-white border border-warm-300 shadow-card hover:shadow-lifted transition-all flex items-start gap-5"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <Mail className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">Official Email</span>
              <h3 className="font-display font-bold text-xl text-warm-900">Email Inquiries</h3>
              <p className="text-xs text-warm-600">hello@apnaweb.in</p>
              <p className="text-[11px] text-warm-400 pt-1">Detailed proposal & quotation support</p>
            </div>
          </a>

          <a
            href="https://www.instagram.com/darshan_auradi_06/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-8 rounded-3xl bg-white border border-warm-300 shadow-card hover:shadow-lifted transition-all flex items-start gap-5"
          >
            <div className="w-12 h-12 rounded-2xl bg-pink-100 text-pink-700 flex items-center justify-center shrink-0">
              <Instagram className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-bold text-pink-700 uppercase tracking-wider">Social Profile</span>
              <h3 className="font-display font-bold text-xl text-warm-900">Founder Instagram</h3>
              <p className="text-xs text-warm-600">@darshan_auradi_06</p>
              <p className="text-[11px] text-warm-400 pt-1">Follow behind-the-scenes web builds</p>
            </div>
          </a>

        </div>

        {/* Office Location Banner */}
        <div className="p-8 rounded-3xl bg-warm-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-lifted">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-amber-400 font-bold uppercase tracking-wider">
              <MapPin className="w-4 h-4" />
              <span>Studio Address</span>
            </div>
            <h3 className="font-display font-bold text-2xl text-white">Navrangpura, Ahmedabad, Gujarat</h3>
            <p className="text-xs text-warm-300">ApnaWeb Studio • Operating across Ahmedabad, Mumbai, Lucknow, Jaipur & Pan-India.</p>
          </div>

          <Link href="/get-website">
            <Button size="lg" className="font-bold shrink-0">
              <span>Submit Website Request →</span>
            </Button>
          </Link>
        </div>

      </div>
    </main>
  );
}

