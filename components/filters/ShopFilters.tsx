"use client";

import { CATEGORIES } from "@/lib/constants";
import { ProductCategory } from "@/types/product";
import { Search, RotateCcw, Check, Star } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

interface ShopFiltersProps {
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
}

export function ShopFilters({
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
}: ShopFiltersProps) {
  return (
    <div className="space-y-8 text-xs">
      {/* Search Input */}
      <div className="space-y-2">
        <h4 className="font-semibold uppercase tracking-wider text-muted-foreground text-[11px]">
          Search Products
        </h4>
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search catalog..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 bg-card text-xs"
          />
        </div>
      </div>

      {/* Category List */}
      <div className="space-y-3 border-t border-border pt-6">
        <h4 className="font-semibold uppercase tracking-wider text-muted-foreground text-[11px]">
          Categories
        </h4>
        <div className="space-y-1">
          <button
            onClick={() => onSelectCategory("all")}
            className={`w-full text-left px-3 py-2 transition-colors flex items-center justify-between ${
              selectedCategory === "all" || !selectedCategory
                ? "bg-primary text-primary-foreground font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span>All Categories</span>
            {selectedCategory === "all" && <Check className="h-3.5 w-3.5" />}
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`w-full text-left px-3 py-2 transition-colors flex items-center justify-between ${
                selectedCategory === cat.id
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span>{cat.label}</span>
              {selectedCategory === cat.id && <Check className="h-3.5 w-3.5" />}
            </button>
          ))}
        </div>
      </div>

      {/* Price Filter */}
      <div className="space-y-3 border-t border-border pt-6">
        <h4 className="font-semibold uppercase tracking-wider text-muted-foreground text-[11px]">
          Price Range ($)
        </h4>
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => onPriceChange(e.target.value, maxPrice)}
            className="text-xs"
          />
          <Input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => onPriceChange(minPrice, e.target.value)}
            className="text-xs"
          />
        </div>
      </div>

      {/* Minimum Rating */}
      <div className="space-y-3 border-t border-border pt-6">
        <h4 className="font-semibold uppercase tracking-wider text-muted-foreground text-[11px]">
          Minimum Rating
        </h4>
        <div className="space-y-1">
          {[0, 4.5, 4.8, 5.0].map((rating) => (
            <button
              key={rating}
              onClick={() => onRatingChange(rating)}
              className={`w-full text-left px-3 py-1.5 transition-colors flex items-center space-x-2 ${
                minRating === rating
                  ? "bg-secondary text-foreground font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Star className="h-3.5 w-3.5 fill-gold-500 text-gold-500" />
              <span>{rating === 0 ? "Any rating" : `${rating}+ Stars`}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Availability Toggle */}
      <div className="space-y-3 border-t border-border pt-6">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => onInStockChange(e.target.checked)}
            className="h-4 w-4 rounded-none border-border text-primary focus:ring-1 focus:ring-ring"
          />
          <span className="text-xs uppercase tracking-wider font-medium text-foreground">
            In Stock Only
          </span>
        </label>
      </div>

      {/* Reset Button */}
      <div className="border-t border-border pt-6">
        <Button onClick={onReset} variant="outline" className="w-full flex items-center justify-center space-x-2">
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Reset All Filters</span>
        </Button>
      </div>
    </div>
  );
}
