import React from "react";
import Link from "next/link";
import { ArrowLeft, Home, FileText } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="min-h-[75vh] flex items-center justify-center bg-canvas-light px-4 py-16">
      <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-3xl border border-warm-300 shadow-lifted text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-warm-100 text-brand-500 font-display font-extrabold text-2xl flex items-center justify-center mx-auto border border-warm-200">
          404
        </div>

        <div className="space-y-2">
          <h1 className="font-display font-extrabold text-3xl text-warm-900">
            Page Not Found
          </h1>
          <p className="text-xs text-warm-600 leading-relaxed">
            The page you are looking for might have been moved or does not exist.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link href="/" className="w-full">
            <Button size="md" className="w-full justify-center font-bold">
              <Home className="w-4 h-4 mr-1" />
              <span>Back to Home</span>
            </Button>
          </Link>
          <Link href="/get-website" className="w-full">
            <Button variant="outline" size="md" className="w-full justify-center font-semibold">
              <FileText className="w-4 h-4 mr-1" />
              <span>Get Website</span>
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}

