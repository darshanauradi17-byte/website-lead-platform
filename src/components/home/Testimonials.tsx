"use client";

import React from "react";
import { Star, Quote, MapPin } from "lucide-react";
import { Card } from "@/components/ui/Card";

export function Testimonials() {
  const reviews = [
    {
      name: "Ramesh Patel",
      business: "Patel Super Market & Kirana",
      location: "Satellite, Ahmedabad",
      type: "Kirana & Grocery",
      quote:
        "Earlier, customers called me on phone and read grocery items line by line. Now they send WhatsApp cart orders directly from our ApnaWeb site. Time saved and monthly orders doubled.",
      rating: 5,
    },
    {
      name: "Pooja Sharma",
      business: "Glamour Unisex Salon & Spa",
      location: "Bandra West, Mumbai",
      type: "Salon & Beauty",
      quote:
        "ApnaWeb built a fast appointment booking site for my salon in 5 days. Our weekend slot bookings increased by 40%. The team called me within 24 hours of filling their form.",
      rating: 5,
    },
    {
      name: "Dr. Alok Verma",
      business: "Verma Medicos & Diagnostic Care",
      location: "Hazratganj, Lucknow",
      type: "Pharmacy & Clinic",
      quote:
        "Senior citizen patients in our area now snap a picture of their doctor prescription and upload it on our site. Home medicine deliveries are streamlined completely.",
      rating: 5,
    },
    {
      name: "Vikram Singh",
      business: "SpiceCraft Artisan Cafe",
      location: "MI Road, Jaipur",
      type: "Restaurant & Cafe",
      quote:
        "The QR digital menu and Instagram aesthetic web design brought so many weekend tourists to our cafe. Very transparent pricing with zero hidden renewal traps.",
      rating: 5,
    },
  ];

  return (
    <section className="py-20 bg-warm-50 border-b border-warm-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-500 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
            Real Business Feedback
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-warm-900 tracking-tight">
            Hear from local business owners like you.
          </h2>
          <p className="text-warm-600 text-base">
            No fake testimonials. Real shop owners from Ahmedabad, Mumbai, Lucknow, and Jaipur.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((rev, idx) => (
            <Card key={idx} className="flex flex-col justify-between space-y-6 border-warm-300/80">
              <div className="space-y-4">
                {/* Rating Stars & Quote Icon */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-warm-300/80 stroke-1" />
                </div>

                {/* Quote Text */}
                <p className="text-warm-800 text-sm leading-relaxed italic">
                  "{rev.quote}"
                </p>
              </div>

              {/* Owner Info */}
              <div className="pt-4 border-t border-warm-100 flex justify-between items-end">
                <div>
                  <div className="font-display font-bold text-base text-warm-900">{rev.name}</div>
                  <div className="text-xs font-semibold text-brand-600">{rev.business}</div>
                </div>
                <div className="text-right text-[11px] text-warm-500 font-medium">
                  <div className="flex items-center gap-1 justify-end">
                    <MapPin className="w-3 h-3 text-warm-400" />
                    <span>{rev.location}</span>
                  </div>
                  <span className="text-warm-400 font-normal">{rev.type}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
}
