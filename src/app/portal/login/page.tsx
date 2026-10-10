"use client";

import React, { Suspense } from "react";
import { CustomerPortal } from "@/components/dashboard/CustomerPortal";

export default function PortalPage() {
  return (
    <main className="py-12 bg-canvas-light min-h-[85vh] px-4">
      <Suspense fallback={<div className="text-center py-20 text-xs font-semibold text-warm-500">Loading Customer Portal...</div>}>
        <CustomerPortal />
      </Suspense>
    </main>
  );
}

