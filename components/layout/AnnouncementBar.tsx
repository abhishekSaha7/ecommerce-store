"use client";

import { useState } from "react";
import { X, Sparkles } from "lucide-react";

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-primary text-primary-foreground text-[11px] uppercase tracking-widest py-2 px-4 flex items-center justify-between border-b border-border/20 transition-all duration-300">
      <div className="flex-1 flex items-center justify-center space-x-2 text-center">
        <Sparkles className="w-3 h-3 text-gold-400 animate-pulse hidden sm:inline" />
        <span>
          Complimentary White-Glove Shipping on Orders Over $250 — Use code <strong className="underline text-gold-400">NOVA10</strong> for 10% off
        </span>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="text-primary-foreground/70 hover:text-primary-foreground p-1 transition-colors"
        aria-label="Dismiss announcement"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
