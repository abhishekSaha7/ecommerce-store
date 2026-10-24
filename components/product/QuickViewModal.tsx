"use client";

import Image from "next/image";
import Link from "next/link";
import { X, Star, ShoppingBag, Heart, ArrowRight } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setQuickViewProduct } from "@/features/ui/uiSlice";
import { addToCart } from "@/features/cart/cartSlice";
import { toggleWishlist } from "@/features/wishlist/wishlistSlice";
import { selectIsInWishlist } from "@/features/wishlist/selectors";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { toast } from "sonner";

export function QuickViewModal() {
  const dispatch = useAppDispatch();
  const product = useAppSelector((state) => state.ui.quickViewProduct);
  const isInWishlist = useAppSelector(selectIsInWishlist(product?.id || ""));

  if (!product) return null;

  const closeModal = () => dispatch(setQuickViewProduct(null));

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        product,
        quantity: 1,
        selectedColor: product.colors?.[0]?.name,
        selectedSize: product.sizes?.[0],
      })
    );
    toast.success(`Added ${product.name} to bag`);
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm transition-opacity"
        onClick={closeModal}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-3xl overflow-hidden bg-card text-card-foreground border border-border shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 z-20 p-2 text-muted-foreground hover:text-foreground bg-background/80 backdrop-blur-sm"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Image preview */}
          <div className="relative aspect-square bg-muted">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* Right: Details */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="capitalize">
                  {product.category}
                </Badge>
                {product.isFeatured && <Badge variant="accent">FEATURED</Badge>}
              </div>

              <h2 className="font-serif text-2xl font-bold">{product.name}</h2>

              <div className="flex items-center space-x-3 text-sm">
                <span className="text-xl font-bold">{formatCurrency(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    {formatCurrency(product.originalPrice)}
                  </span>
                )}
                <div className="flex items-center space-x-1 text-xs text-muted-foreground border-l border-border pl-3">
                  <Star className="h-3.5 w-3.5 fill-gold-500 text-gold-500" />
                  <span className="font-semibold text-foreground">{product.rating}</span>
                  <span>({product.reviewCount} reviews)</span>
                </div>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                {product.description}
              </p>
            </div>

            {/* CTAs */}
            <div className="space-y-3 pt-4 border-t border-border">
              <div className="flex gap-2">
                <Button onClick={handleAddToCart} className="flex-1 flex items-center justify-center space-x-2">
                  <ShoppingBag className="h-4 w-4" />
                  <span>Add to Bag</span>
                </Button>
                <Button
                  onClick={() => dispatch(toggleWishlist(product))}
                  variant="outline"
                  size="icon"
                  className={isInWishlist ? "text-red-500 border-red-500" : ""}
                >
                  <Heart className={`h-4 w-4 ${isInWishlist ? "fill-current" : ""}`} />
                </Button>
              </div>

              <Link
                href={`/products/${product.id}`}
                onClick={closeModal}
                className="block text-center text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground py-1"
              >
                <span className="inline-flex items-center">
                  <span>View Full Product Specifications</span>
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
