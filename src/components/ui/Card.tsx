import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  hoverable = false,
  ...props
}) => {
  return (
    <div
      className={cn(
        "bg-white rounded-2xl border border-warm-200/80 shadow-card p-6 transition-all duration-200",
        hoverable && "hover:-translate-y-1 hover:shadow-lifted hover:border-brand-500/30 cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
