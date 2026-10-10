import React from "react";
import { cn } from "@/lib/utils";

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-xl bg-warm-200/70", className)}
      {...props}
    />
  );
}

export function LeadCardSkeleton() {
  return (
    <div className="p-5 rounded-2xl border border-warm-200/70 bg-white space-y-3">
      <div className="flex justify-between items-center">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
      <Skeleton className="h-5 w-44" />
      <Skeleton className="h-4 w-32" />
      <div className="pt-2 flex gap-2">
        <Skeleton className="h-8 w-20 rounded-lg" />
        <Skeleton className="h-8 w-24 rounded-lg" />
      </div>
    </div>
  );
}
