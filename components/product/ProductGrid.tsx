import { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";
import { Skeleton } from "@/components/ui/Skeleton";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  isError?: boolean;
  onRetry?: () => void;
  emptyTitle?: string;
  emptyDescription?: string;
}

export function ProductGrid({
  products,
  isLoading = false,
  isError = false,
  onRetry,
  emptyTitle = "No products found",
  emptyDescription = "Try adjusting your search query or filters to find what you are looking for.",
}: ProductGridProps) {
  // Skeleton Loading Grid
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-4 border border-border/40 p-3">
            <Skeleton className="aspect-[4/5] w-full" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  // Error State
  if (isError) {
    return (
      <div className="py-20 text-center space-y-4 border border-destructive/20 bg-destructive/5 p-8 max-w-lg mx-auto my-12">
        <p className="text-sm font-semibold uppercase tracking-wider text-destructive">
          Unable to load products
        </p>
        <p className="text-xs text-muted-foreground">
          An error occurred while communicating with the remote server. Please try again.
        </p>
        {onRetry && (
          <Button onClick={onRetry} variant="outline" size="sm" className="mt-2">
            <RefreshCw className="mr-2 h-3.5 w-3.5" />
            <span>Retry Connection</span>
          </Button>
        )}
      </div>
    );
  }

  // Empty State
  if (!products || products.length === 0) {
    return (
      <div className="py-24 text-center space-y-4 border border-dashed border-border p-12 my-8">
        <h3 className="font-serif text-xl font-bold uppercase tracking-wider text-muted-foreground">
          {emptyTitle}
        </h3>
        <p className="text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">
          {emptyDescription}
        </p>
      </div>
    );
  }

  // Active Product Grid
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product, idx) => (
        <ProductCard key={product.id} product={product} priority={idx < 4} />
      ))}
    </div>
  );
}
