"use client";

import { X, SlidersHorizontal } from "lucide-react";
import { ShopFilters } from "./ShopFilters";
import { ProductCategory } from "@/types/product";
import { Button } from "@/components/ui/Button";

interface MobileFilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategory: string;
  onSelectCategory: (category: ProductCategory | "all") => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  minPrice: string;
  maxPrice: string;
  onPriceChange: (min: string, max: string) => void;
  minRating: number;
  onRatingChange: (rating: number) => void;
  inStockOnly: boolean;
  onInStockChange: (inStock: boolean) => void;
  onReset: () => void;
  totalResults: number;
}

export function MobileFilterSheet({
  isOpen,
  onClose,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  minPrice,
  maxPrice,
  onPriceChange,
  minRating,
  onRatingChange,
  inStockOnly,
  onInStockChange,
  onReset,
  totalResults,
}: MobileFilterSheetProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div className="relative flex w-full max-w-xs flex-1 flex-col bg-background p-6 shadow-2xl border-r border-border transition-transform duration-300 overflow-y-auto">
        <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
          <div className="flex items-center space-x-2">
            <SlidersHorizontal className="h-4 w-4" />
            <h3 className="font-serif text-lg font-bold">Filter Catalog</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-muted-foreground hover:text-foreground"
            aria-label="Close filter menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <ShopFilters
          selectedCategory={selectedCategory}
          onSelectCategory={onSelectCategory}
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          minPrice={minPrice}
          maxPrice={maxPrice}
          onPriceChange={onPriceChange}
          minRating={minRating}
          onRatingChange={onRatingChange}
          inStockOnly={inStockOnly}
          onInStockChange={onInStockChange}
          onReset={onReset}
        />

        <div className="mt-8 border-t border-border pt-4">
          <Button onClick={onClose} className="w-full">
            View {totalResults} Results
          </Button>
        </div>
      </div>
    </div>
  );
}
