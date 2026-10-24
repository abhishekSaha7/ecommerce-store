"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchSmartPicks } from "@/lib/api/recommendations";
import { useAppSelector } from "@/lib/store/hooks";
import { selectCartItems } from "@/features/cart/selectors";
import { selectWishlistItems } from "@/features/wishlist/selectors";
import { selectRecentlyViewedItems } from "@/features/recently-viewed/selectors";
import { ProductCard } from "./ProductCard";
import { Sparkles, Info } from "lucide-react";
import { Skeleton } from "@/components/ui/Skeleton";

export function SmartPicksSection() {
  const cartItems = useAppSelector(selectCartItems);
  const wishlistItems = useAppSelector(selectWishlistItems);
  const recentlyViewed = useAppSelector(selectRecentlyViewedItems);

  const cartProductIds = cartItems.map((i) => i.product.id);
  const wishlistProductIds = wishlistItems.map((i) => i.id);
  const recentlyViewedIds = recentlyViewed.map((i) => i.id);

  const { data: recommendations = [], isLoading } = useQuery({
    queryKey: [
      "smartPicks",
      cartProductIds.join(","),
      wishlistProductIds.join(","),
      recentlyViewedIds.join(","),
    ],
    queryFn: () =>
      fetchSmartPicks({
        cartProductIds,
        wishlistProductIds,
        recentlyViewedIds,
      }),
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="aspect-[4/5] w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30 border-y border-border">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-border">
          <div>
            <div className="flex items-center space-x-2 text-gold-600 dark:text-gold-400 mb-1">
              <Sparkles className="h-4 w-4" />
              <span className="text-xs uppercase tracking-widest font-semibold">Client-Side Engine</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">Picked For You</h2>
          </div>

          <div className="mt-2 md:mt-0 flex items-center text-xs text-muted-foreground space-x-1.5">
            <Info className="h-3.5 w-3.5" />
            <span>Tailored deterministically based on your browsing & cart signals</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendations.map(({ product, reason }) => (
            <div key={product.id} className="flex flex-col space-y-2">
              <div className="bg-gold-500/10 border border-gold-500/20 text-gold-600 dark:text-gold-400 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 text-center line-clamp-1">
                ★ {reason}
              </div>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
