import React from "react";
import { cn } from "@/lib/utils";
import { LeadStatus, ProjectStage, SlaStatus } from "@/lib/types";

export interface BadgeProps {
  children?: React.ReactNode;
  variant?: "default" | "status" | "stage" | "sla" | "business";
  status?: LeadStatus;
  stage?: ProjectStage;
  sla?: SlaStatus;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "default",
  status,
  stage,
  sla,
  className,
}) => {
  const getStatusStyles = (s?: LeadStatus) => {
    switch (s) {
      case "New":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Under Review":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "Call Scheduled":
        return "bg-amber-50 text-amber-800 border-amber-200";
      case "Proposal Sent":
        return "bg-sky-50 text-sky-700 border-sky-200";
      case "Won":
        return "bg-emerald-50 text-emerald-800 border-emerald-200";
      case "Lost":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-warm-100 text-warm-700 border-warm-200";
    }
  };

  const getSlaStyles = (slaStatus?: SlaStatus) => {
    switch (slaStatus) {
      case "on_track":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "warning_24h":
        return "bg-amber-50 text-amber-800 border-amber-300 animate-pulse";
      case "overdue":
        return "bg-red-50 text-red-700 border-red-300 font-bold animate-bounce";
      default:
        return "bg-warm-100 text-warm-700 border-warm-200";
    }
  };

  if (variant === "sla" && sla) {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border shadow-xs",
          getSlaStyles(sla),
          className
        )}
      >
        {sla === "on_track" && "✓ Within 24h"}
        {sla === "warning_24h" && "⚠️ 24h+ SLA Alert"}
        {sla === "overdue" && "🚨 OVERDUE (48h+)"}
      </span>
    );
  }

  if (variant === "status" && status) {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border shadow-xs",
          getStatusStyles(status),
          className
        )}
      >
        <span
          className={cn(
            "w-1.5 h-1.5 rounded-full",
            status === "New" && "bg-blue-500",
            status === "Under Review" && "bg-purple-500",
            status === "Call Scheduled" && "bg-amber-500",
            status === "Proposal Sent" && "bg-sky-500",
            status === "Won" && "bg-emerald-500",
            status === "Lost" && "bg-red-500"
          )}
        />
        {children ?? status}
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-warm-100 text-warm-800 border border-warm-200/80",
        className
      )}
    >
      {children ?? (variant === "stage" ? stage : undefined)}
    </span>
  );
};