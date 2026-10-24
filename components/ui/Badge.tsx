import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "accent" | "destructive";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const base =
    "inline-flex items-center border px-2.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase transition-colors focus:outline-none focus:ring-1 focus:ring-ring";

  const variants = {
    default: "border-transparent bg-primary text-primary-foreground",
    secondary: "border-transparent bg-secondary text-secondary-foreground",
    outline: "border-border text-foreground",
    accent: "border-transparent bg-gold-500/10 text-gold-600 dark:text-gold-400 border-gold-500/20",
    destructive: "border-transparent bg-destructive/10 text-destructive border-destructive/20",
  };

  return <div className={cn(base, variants[variant], className)} {...props} />;
}
