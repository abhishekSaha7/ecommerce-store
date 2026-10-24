"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/lib/api/products";
import { getCategories } from "@/lib/api/categories";
import { CATEGORIES } from "@/lib/constants";
import { ProductGrid } from "@/components/product/ProductGrid";
import { SmartPicksSection } from "@/components/product/SmartPicksSection";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Sparkles, Compass, Shield, Award } from "lucide-react";
import { motion } from "framer-motion";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"featured" | "newest" | "bestseller">("featured");

  // Fetch product catalog via TanStack Query
  const { data: catalogData, isLoading: isCatalogLoading, isError, refetch } = useQuery({
    queryKey: ["homeProducts", activeTab],
    queryFn: () =>
      getProducts({
        sortBy: activeTab === "newest" ? "newest" : activeTab === "bestseller" ? "rating" : "featured",
        limit: 8,
      }),
  });

  const { data: categoriesWithCount = [] } = useQuery({
    queryKey: ["categoriesList"],
    queryFn: getCategories,
  });

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-muted/40 border-b border-border">
        {/* Editorial Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2000&q=90"
            alt="NOVA Editorial Interiors"
            fill
            priority
            className="object-cover object-center opacity-35 dark:opacity-20 transition-all duration-1000 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="inline-flex items-center space-x-2 border border-gold-500/30 bg-gold-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold-600 dark:text-gold-400"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Autumn/Winter 2026 Collection</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.1]"
          >
            Thoughtfully designed essentials for modern living.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="mx-auto max-w-2xl text-sm sm:text-base text-muted-foreground font-light leading-relaxed"
          >
            Curated architectural furniture, high-fidelity acoustic soundscapes, and refined personal objects. Engineered with uncompromised material honesty.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link href="/shop">
              <Button size="lg" className="w-full sm:w-auto min-w-[200px] flex items-center justify-center space-x-2">
                <span>Explore Catalog</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/shop?category=furniture">
              <Button size="lg" variant="outline" className="w-full sm:w-auto min-w-[200px]">
                Architectural Seating
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Collections Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-border">
          <div>
            <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
              Curated Worlds
            </span>
            <h2 className="font-serif text-3xl font-bold text-foreground mt-1">Featured Collections</h2>
          </div>
          <Link href="/shop" className="mt-4 md:mt-0 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground inline-flex items-center space-x-1">
            <span>View All Categories</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CATEGORIES.slice(0, 3).map((category) => (
            <Link
              key={category.id}
              href={`/shop?category=${category.id}`}
              className="group relative aspect-[4/5] overflow-hidden bg-muted border border-border"
            >
              <Image
                src={category.image}
                alt={category.label}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 space-y-1">
                <span className="text-[10px] uppercase tracking-widest text-gold-500 font-bold">
                  Collection
                </span>
                <h3 className="font-serif text-2xl font-bold text-foreground group-hover:underline">
                  {category.label}
                </h3>
                <p className="text-xs text-muted-foreground font-light line-clamp-2">
                  {category.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Tabbed Product Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-border">
          <div>
            <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
              Modern Catalog
            </span>
            <h2 className="font-serif text-3xl font-bold text-foreground mt-1">Essential Pieces</h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center space-x-2 mt-4 md:mt-0 text-xs font-semibold uppercase tracking-wider">
            <button
              onClick={() => setActiveTab("featured")}
              className={`px-4 py-2 border transition-colors ${
                activeTab === "featured"
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              Featured
            </button>
            <button
              onClick={() => setActiveTab("newest")}
              className={`px-4 py-2 border transition-colors ${
                activeTab === "newest"
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              New Arrivals
            </button>
            <button
              onClick={() => setActiveTab("bestseller")}
              className={`px-4 py-2 border transition-colors ${
                activeTab === "bestseller"
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              Best Sellers
            </button>
          </div>
        </div>

        <ProductGrid
          products={catalogData?.products || []}
          isLoading={isCatalogLoading}
          isError={isError}
          onRetry={refetch}
        />
      </section>

      {/* Editorial Spotlight Banner */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative bg-card border border-border overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="p-8 sm:p-12 lg:p-16 lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-widest text-gold-500 font-bold">
              Design Philosophy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground leading-tight">
              Architectural purity, tactile warmth, and permanence.
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-light">
              Every NOVA product is born from the conviction that physical objects shape our inner psychological state. We eliminate frivolous detail to reveal the intrinsic beauty of solid walnut, mouth-blown Swedish glass, and Italian vegetable-tanned leathers.
            </p>
            <div className="pt-2">
              <Link href="/shop">
                <Button variant="outline" className="flex items-center space-x-2">
                  <span>Read The Manifesto</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative aspect-square lg:aspect-auto lg:h-full lg:col-span-6 bg-muted">
            <Image
              src="https://images.unsplash.com/photo-1580481072645-022f9a6d1270?auto=format&fit=crop&w=1200&q=85"
              alt="Sculpted chair detail"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Smart Picks Recommendation Section */}
      <SmartPicksSection />
    </div>
  );
}
