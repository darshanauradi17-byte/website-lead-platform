"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X, PhoneCall, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services & Pricing" },
    { href: "/portfolio", label: "Work Showcase" },
    { href: "/contact", label: "Contact Us" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-canvas-light/90 backdrop-blur-md border-b border-warm-200/80 transition-all">
      {/* Top Banner Notice */}
      <div className="bg-warm-900 text-warm-100 text-xs py-2 px-4 text-center font-medium flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>Guaranteed 2-Working Day Contact SLA &nbsp;•&nbsp; Built Specifically for Indian Local Businesses</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-brand-500 text-white flex items-center justify-center font-display font-bold text-xl shadow-tactile group-hover:bg-brand-600 transition-colors">
            A
          </div>
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-xl tracking-tight text-warm-900 leading-none">
              Apna<span className="text-brand-500">Web</span>
            </span>
            <span className="text-[10px] font-semibold tracking-wider text-warm-500 uppercase mt-0.5">
              Local Web Studio
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold transition-colors relative py-1 ${
                  isActive
                    ? "text-brand-500"
                    : "text-warm-700 hover:text-warm-900"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-500 rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/portal/login" className="text-xs font-semibold text-warm-700 hover:text-warm-900 px-3 py-2">
            Client Login
          </Link>
          <Link href="/admin/login" className="text-xs font-semibold text-warm-500 hover:text-warm-800 px-2 py-2">
            Admin
          </Link>
          <Link href="/get-website">
            <Button size="md" className="font-bold shadow-tactile">
              <span>Get My Website</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden gradient-button p-2 rounded-lg text-white"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-canvas-light border-b border-warm-200 px-4 pt-3 pb-6 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-semibold text-warm-800 hover:bg-warm-100"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-warm-200 flex flex-col gap-2">
            <Link href="/portal/login" onClick={() => setIsOpen(false)}>
              <Button variant="outline" className="w-full justify-center">
                Track My Project / Client Login
              </Button>
            </Link>
            <Link href="/get-website" onClick={() => setIsOpen(false)}>
              <Button className="w-full justify-center">
                Get My Website (3 Steps)
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
