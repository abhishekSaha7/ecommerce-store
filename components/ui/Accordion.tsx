"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function AccordionItem({ title, children, defaultOpen = false }: AccordionItemProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  return (
    <div className="border-b border-border py-4">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-1 text-left text-sm font-medium tracking-wide transition-colors hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        aria-expanded={isOpen}
      >
        <span className="uppercase text-xs tracking-wider">{title}</span>
        <ChevronDown
          className={cn("h-4 w-4 transition-transform duration-200 text-muted-foreground", isOpen && "rotate-180")}
        />
      </button>
      {isOpen && (
        <div className="mt-3 text-xs text-muted-foreground leading-relaxed animate-accordion-down">
          {children}
        </div>
      )}
    </div>
  );
}
