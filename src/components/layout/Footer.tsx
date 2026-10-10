import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, MessageSquare, CheckCircle2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-warm-900 text-warm-100 pt-16 pb-12 border-t border-warm-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand & Purpose */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-500 text-white flex items-center justify-center font-display font-bold text-xl shadow-md">
                A
              </div>
              <span className="font-display font-bold text-2xl text-white tracking-tight">
                Apna<span className="text-brand-400">Web</span>
              </span>
            </div>
            <p className="text-sm text-warm-300 leading-relaxed">
              We build fast, honest websites for local Indian business owners — shopkeepers, salons, doctors, restaurants & fitness clubs. No high agencies fees, no confusing tech jargon.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-warm-400">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>100% Data Ownership & Local Support</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-base text-white mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-sm text-warm-300">
              <li>
                <Link href="/" className="hover:text-white transition-colors">Home Page</Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">Services & Pricing</Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-white transition-colors">Work Showcase</Link>
              </li>
              <li>
                <Link href="/get-website" className="hover:text-white transition-colors">Get My Website (3 Steps)</Link>
              </li>
              <li>
                <Link href="/portal/login" className="hover:text-white transition-colors">Client Tracking Login</Link>
              </li>
            </ul>
          </div>

          {/* Business Categories */}
          <div>
            <h4 className="font-display font-bold text-base text-white mb-4">Who We Build For</h4>
            <ul className="space-y-2.5 text-sm text-warm-300">
              <li>Kirana & Grocery Stores</li>
              <li>Salons, Spas & Beauty Parlours</li>
              <li>Pharmacies & Diagnostic Care</li>
              <li>Restaurants, Cafes & Bakeries</li>
              <li>Gyms & Fitness Centers</li>
              <li>Doctors & Polyclinics</li>
            </ul>
          </div>

          {/* Direct Contact */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-base text-white mb-2">Direct Contact</h4>
            <p className="text-xs text-warm-400">We respond to every enquiry within 2 working days guaranteed.</p>
            <div className="space-y-2.5 text-sm text-warm-200">
              <a href="https://wa.me/919825012345" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 hover:text-emerald-400 transition-colors">
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp: +91 98250 12345</span>
              </a>
              <a href="tel:+919825012345" className="flex items-center gap-2.5 hover:text-white transition-colors">
                <Phone className="w-4 h-4 text-brand-400" />
                <span>Call: +91 98250 12345</span>
              </a>
              <div className="flex items-center gap-2.5 text-warm-300">
                <Mail className="w-4 h-4 text-brand-400" />
                <span>hello@apnaweb.in</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-warm-400 pt-1">
                <MapPin className="w-4 h-4 text-warm-400 shrink-0 mt-0.5" />
                <span>Navrangpura, Ahmedabad, Gujarat 380009</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-warm-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-warm-400">
          <p>© {new Date().getFullYear()} ApnaWeb Technologies. Crafted for Indian Local Businesses.</p>
          <div className="flex items-center gap-6">
            <Link href="/admin/login" className="hover:text-warm-200 transition-colors">Admin Portal</Link>
            <span>•</span>
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
