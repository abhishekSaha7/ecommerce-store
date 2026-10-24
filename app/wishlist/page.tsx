"use client";

import Link from "next/link";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { removeFromWishlist, clearWishlist } from "@/features/wishlist/wishlistSlice";
import { selectWishlistItems } from "@/features/wishlist/selectors";
import { addToCart } from "@/features/cart/cartSlice";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Heart, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { toast } from "sonner";

export default function WishlistPage() {
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector(selectWishlistItems);

  if (wishlistItems.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 text-center space-y-6">
        <Heart className="mx-auto h-16 w-16 text-muted-foreground/30" />
        <h1 className="font-serif text-3xl font-bold tracking-tight">Your Wishlist is Empty</h1>
        <p className="text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">
          Save your favorite architectural furniture, audio pieces, and home accessories to access them anytime.
        </p>
        <Link href="/shop">
          <Button size="lg" className="mt-4 flex items-center justify-center space-x-2 mx-auto">
            <span>Explore Catalog</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    );
  }

  const handleMoveToCart = (product: typeof wishlistItems[0]) => {
    dispatch(
      addToCart({
        product,
        quantity: 1,
        selectedColor: product.colors?.[0]?.name,
        selectedSize: product.sizes?.[0],
      })
    );
    dispatch(removeFromWishlist(product.id));
    toast.success(`Moved ${product.name} to shopping bag`);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-border pb-6">
        <div>
          <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
            Saved Objects
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight mt-1">
            Your Wishlist ({wishlistItems.length})
          </h1>
        </div>
        <button
          onClick={() => {
            dispatch(clearWishlist());
            toast.info("Wishlist cleared");
          }}
          className="text-xs uppercase tracking-wider text-muted-foreground hover:text-destructive mt-4 sm:mt-0 transition-colors"
        >
          Clear All Saved Items
        </button>
      </div>

      {/* Grid of Wishlist Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlistItems.map((product) => (
          <div key={product.id} className="group relative flex flex-col bg-card border border-border">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted">
              <Link href={`/products/${product.id}`}>
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </Link>
              <button
                onClick={() => {
                  dispatch(removeFromWishlist(product.id));
                  toast.info(`Removed ${product.name} from wishlist`);
                }}
                className="absolute top-3 right-3 p-2 bg-background/80 text-muted-foreground hover:text-destructive backdrop-blur-sm"
                title="Remove from wishlist"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
                  {product.category}
                </span>
                <h3 className="font-serif text-base font-bold text-foreground line-clamp-1 mt-0.5">
                  <Link href={`/products/${product.id}`}>{product.name}</Link>
                </h3>
                <p className="text-xs font-semibold text-foreground mt-1">
                  {formatCurrency(product.price)}
                </p>
              </div>

              <Button
                onClick={() => handleMoveToCart(product)}
                size="sm"
                className="w-full flex items-center justify-center space-x-2"
              >
                <ShoppingBag className="h-3.5 w-3.5" />
                <span>Move to Bag</span>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
