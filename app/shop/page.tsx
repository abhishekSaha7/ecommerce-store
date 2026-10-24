"use client";

import { useState, useEffect, useTransition, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/lib/api/products";
import { ProductCategory } from "@/types/product";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ShopFilters } from "@/components/filters/ShopFilters";
import { SortSelect } from "@/components/filters/SortSelect";
import { MobileFilterSheet } from "@/components/filters/MobileFilterSheet";
import { SlidersHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";

function ShopCatalogContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [, startTransition] = useTransition();

  // State derived from URL query params
  const categoryParam = (searchParams.get("category") as ProductCategory | "all") || "all";
  const searchParam = searchParams.get("search") || "";
  const sortParam = searchParams.get("sort") || "featured";
  const pageParam = parseInt(searchParams.get("page") || "1", 10);

  // Local state for debounced inputs
  const [category, setCategory] = useState<ProductCategory | "all">(categoryParam);
  const [searchInput, setSearchInput] = useState(searchParam);
  const [debouncedSearch, setDebouncedSearch] = useState(searchParam);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState(sortParam);
  const [page, setPage] = useState(pageParam);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync category state when URL changes
  useEffect(() => {
    setCategory(categoryParam);
  }, [categoryParam]);

  // Handle 300ms debouncing for search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput);
      setPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // TanStack Query for remote catalog fetching
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [
      "shopProducts",
      category,
      debouncedSearch,
      minPrice,
      maxPrice,
      minRating,
      inStockOnly,
      sortBy,
      page,
    ],
    queryFn: () =>
      getProducts({
        category: category === "all" ? undefined : category,
        search: debouncedSearch,
        minPrice: minPrice ? parseFloat(minPrice) : undefined,
        maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
        minRating: minRating > 0 ? minRating : undefined,
        inStockOnly,
        sortBy: sortBy as any,
        page,
        limit: 8,
      }),
  });

  const products = data?.products || [];
  const total = data?.total || 0;
  const totalPages = data?.totalPages || 1;

  const handleCategorySelect = (cat: ProductCategory | "all") => {
    setCategory(cat);
    setPage(1);
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (cat === "all") params.delete("category");
      else params.set("category", cat);
      params.set("page", "1");
      router.push(`/shop?${params.toString()}`);
    });
  };

  const handleResetFilters = () => {
    setCategory("all");
    setSearchInput("");
    setDebouncedSearch("");
    setMinPrice("");
    setMaxPrice("");
    setMinRating(0);
    setInStockOnly(false);
    setSortBy("featured");
    setPage(1);
    router.push("/shop");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Catalog Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-border pb-6">
        <div>
          <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
            Catalog Overview
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight mt-1 capitalize">
            {category === "all" ? "All Products" : `${category} Collection`}
          </h1>
        </div>

        <div className="mt-4 md:mt-0 flex items-center justify-between md:justify-end gap-4">
          <Button
            onClick={() => setIsMobileFilterOpen(true)}
            variant="outline"
            size="sm"
            className="lg:hidden flex items-center space-x-2"
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span>Filters</span>
          </Button>

          <SortSelect value={sortBy} onChange={(val) => setSortBy(val)} />
        </div>
      </div>

      {/* Catalog Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block lg:col-span-3 border-r border-border pr-6 space-y-8">
          <ShopFilters
            selectedCategory={category}
            onSelectCategory={handleCategorySelect}
            searchQuery={searchInput}
            onSearchChange={setSearchInput}
            minPrice={minPrice}
            maxPrice={maxPrice}
            onPriceChange={(min, max) => {
              setMinPrice(min);
              setMaxPrice(max);
              setPage(1);
            }}
            minRating={minRating}
            onRatingChange={(r) => {
              setMinRating(r);
              setPage(1);
            }}
            inStockOnly={inStockOnly}
            onInStockChange={(stk) => {
              setInStockOnly(stk);
              setPage(1);
            }}
            onReset={handleResetFilters}
          />
        </aside>

        {/* Mobile Filter Sheet */}
        <MobileFilterSheet
          isOpen={isMobileFilterOpen}
          onClose={() => setIsMobileFilterOpen(false)}
          selectedCategory={category}
          onSelectCategory={handleCategorySelect}
          searchQuery={searchInput}
          onSearchChange={setSearchInput}
          minPrice={minPrice}
          maxPrice={maxPrice}
          onPriceChange={(min, max) => {
            setMinPrice(min);
            setMaxPrice(max);
            setPage(1);
          }}
          minRating={minRating}
          onRatingChange={(r) => {
            setMinRating(r);
            setPage(1);
          }}
          inStockOnly={inStockOnly}
          onInStockChange={(stk) => {
            setInStockOnly(stk);
            setPage(1);
          }}
          onReset={handleResetFilters}
          totalResults={total}
        />

        {/* Product Grid Area */}
        <div className="lg:col-span-9 space-y-6">
          {/* Results Summary Bar */}
          <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-border/40 pb-3">
            <span>
              Showing <strong>{products.length}</strong> of <strong>{total}</strong> results
              {debouncedSearch && <span> for &quot;{debouncedSearch}&quot;</span>}
            </span>
          </div>

          <ProductGrid
            products={products}
            isLoading={isLoading}
            isError={isError}
            onRetry={refetch}
          />

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center space-x-2 pt-8 border-t border-border">
              <Button
                variant="outline"
                size="icon"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                aria-label="Previous Page"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <span className="text-xs uppercase tracking-wider px-4">
                Page {page} of {totalPages}
              </span>

              <Button
                variant="outline"
                size="icon"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                aria-label="Next Page"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-8">
          <Skeleton className="h-10 w-48" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="aspect-[4/5] w-full" />
            ))}
          </div>
        </div>
      }
    >
      <ShopCatalogContent />
    </Suspense>
  );
}
