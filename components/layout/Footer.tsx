"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { SITE_CONFIG, CATEGORIES } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ArrowRight, ShieldCheck, Truck, RefreshCw } from "lucide-react";

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

export function Footer() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = (data: NewsletterFormData) => {
    toast.success("Welcome to NOVA Journal", {
      description: `Thank you for subscribing (${data.email}). You will receive early access to new collections.`,
    });
    reset();
  };

  return (
    <footer className="border-t border-border bg-background text-foreground transition-colors">
      {/* Brand Value Pillars */}
      <div className="border-b border-border py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left">
          <div className="flex flex-col items-center sm:items-start space-y-2">
            <Truck className="h-5 w-5 text-gold-500 mb-1" />
            <h4 className="text-xs uppercase tracking-widest font-semibold">White-Glove Delivery</h4>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">
              Complimentary insured global freight & room-of-choice placement on orders above $250.
            </p>
          </div>
          <div className="flex flex-col items-center sm:items-start space-y-2">
            <ShieldCheck className="h-5 w-5 text-gold-500 mb-1" />
            <h4 className="text-xs uppercase tracking-widest font-semibold">5-Year Master Warranty</h4>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">
              Architectural grade materials built to withstand generations of daily modern living.
            </p>
          </div>
          <div className="flex flex-col items-center sm:items-start space-y-2">
            <RefreshCw className="h-5 w-5 text-gold-500 mb-1" />
            <h4 className="text-xs uppercase tracking-widest font-semibold">30-Day Pure Trial</h4>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">
              Experience products in your home space with effortless, stress-free return logistics.
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Left Column: Brand & Newsletter */}
        <div className="md:col-span-5 space-y-6">
          <div>
            <span className="font-serif text-3xl font-bold tracking-[0.2em]">NOVA</span>
            <p className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">
              {SITE_CONFIG.tagline}
            </p>
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed max-w-md">
            NOVA creates architectural furniture, high-fidelity acoustics, and understated daily essentials. Guided by spatial harmony, sustainable craftsmanship, and material honesty.
          </p>

          {/* Newsletter Form */}
          <div className="pt-2">
            <h4 className="text-xs uppercase tracking-widest font-semibold mb-3">
              Subscribe to NOVA Journal
            </h4>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-2 max-w-md">
              <Input
                type="email"
                placeholder="Enter your email address"
                error={errors.email?.message}
                {...register("email")}
                className="bg-card text-xs"
              />
              <Button type="submit" isLoading={isSubmitting} className="shrink-0">
                <span>Join</span>
                <ArrowRight className="ml-2 h-3.5 w-3.5" />
              </Button>
            </form>
          </div>
        </div>

        {/* Navigation Columns */}
        <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs uppercase tracking-wider">
          {/* Column 1: Collections */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground text-xs">Collections</h4>
            <ul className="space-y-2.5 text-muted-foreground">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link href={`/shop?category=${cat.id}`} className="hover:text-foreground transition-colors">
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Client Care */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground text-xs">Client Care</h4>
            <ul className="space-y-2.5 text-muted-foreground">
              <li>
                <Link href="/account" className="hover:text-foreground transition-colors">
                  Customer Account
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-foreground transition-colors">
                  Shopping Bag
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="hover:text-foreground transition-colors">
                  Saved Wishlist
                </Link>
              </li>
              <li>
                <Link href="/checkout" className="hover:text-foreground transition-colors">
                  Checkout
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Engineering & Architecture */}
          <div className="space-y-4 col-span-2 sm:col-span-1">
            <h4 className="font-semibold text-foreground text-xs">Architecture</h4>
            <ul className="space-y-2.5 text-muted-foreground normal-case text-xs">
              <li>Next.js 14 App Router</li>
              <li>TypeScript Strict</li>
              <li>Redux Toolkit + RTK</li>
              <li>TanStack Query v5</li>
              <li>Tailwind CSS</li>
              <li>Framer Motion</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border py-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between text-[11px] text-muted-foreground space-y-4 sm:space-y-0">
          <p>© {new Date().getFullYear()} NOVA Commerce Inc. All rights reserved.</p>
          <div className="flex items-center space-x-6 uppercase tracking-wider text-[10px]">
            <span className="hover:text-foreground cursor-pointer">Privacy Policy</span>
            <span className="hover:text-foreground cursor-pointer">Terms of Service</span>
            <span className="hover:text-foreground cursor-pointer">Cookie Preferences</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
