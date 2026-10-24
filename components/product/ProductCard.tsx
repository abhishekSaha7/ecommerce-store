"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Heart, Star, ShoppingBag, Eye } from "lucide-react";
import { Product } from "@/types/product";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { toggleWishlist } from "@/features/wishlist/wishlistSlice";
import { addToCart } from "@/features/cart/cartSlice";
import { selectIsInWishlist } from "@/features/wishlist/selectors";
import { setQuickViewProduct } from "@/features/ui/uiSlice";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const dispatch = useAppDispatch();
  const isInWishlist = useAppSelector(selectIsInWishlist(product.id));
  const [isHovered, setIsHovered] = useState(false);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleWishlist(product));
    if (isInWishlist) {
      toast.info(`Removed ${product.name} from wishlist`);
    } else {
      toast.success(`Saved ${product.name} to wishlist`);
    }
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(
      addToCart({
        product,
        quantity: 1,
        selectedColor: product.colors?.[0]?.name,
        selectedSize: product.sizes?.[0],
      })
    );
    toast.success(`Added ${product.name} to bag`);
  };

  const secondImage = product.images[1] || product.images[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="group relative flex flex-col bg-card border border-border/60 hover:border-border transition-all duration-300"
    >
      {/* Image container with hover swap */}
      <div
        className="relative aspect-[4/5] w-full overflow-hidden bg-muted cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        aria-label={`View details for ${product.name}`}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link href={`/products/${product.id}`} className="block h-full w-full">
          <Image
            src={isHovered ? secondImage : product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            priority={priority}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </Link>

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.discountPercentage && product.discountPercentage > 0 ? (
            <Badge variant="destructive">{product.discountPercentage}% OFF</Badge>
          ) : null}
          {product.isNewArrival && <Badge variant="default">NEW</Badge>}
          {product.isBestSeller && <Badge variant="accent">BESTSELLER</Badge>}
        </div>

        {/* Wishlist toggle button */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-3 right-3 z-10 p-2.5 transition-all duration-200 ${
            isInWishlist
              ? "bg-primary text-primary-foreground"
              : "bg-background/80 text-foreground backdrop-blur-md hover:bg-background"
          }`}
          title={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
          aria-label={isInWishlist ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
        >
          <Heart className={`h-4 w-4 ${isInWishlist ? "fill-current" : ""}`} />
        </button>

        {/* Quick Actions Hover Overlay */}
        <div className="absolute bottom-3 inset-x-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <Button
            onClick={handleQuickAdd}
            size="sm"
            className="flex-1 text-[10px] tracking-wider shadow-lg bg-background text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <ShoppingBag className="mr-1.5 h-3.5 w-3.5" />
            <span>Quick Add</span>
          </Button>

          <Button
            onClick={(e) => {
              e.preventDefault();
              dispatch(setQuickViewProduct(product));
            }}
            size="icon"
            variant="outline"
            className="h-9 w-9 bg-background/90 backdrop-blur-md shrink-0 hover:bg-primary hover:text-primary-foreground"
            title="Quick View"
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
            {product.category}
          </span>

          <h3 className="font-serif text-base font-bold text-foreground line-clamp-1 mt-0.5 group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors">
            <Link href={`/products/${product.id}`}>{product.name}</Link>
          </h3>

          <p className="text-xs text-muted-foreground line-clamp-1 mt-1 font-light">
            {product.tagline}
          </p>
        </div>

        <div className="pt-2 border-t border-border/40 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-bold tracking-tight text-foreground">
              {formatCurrency(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-muted-foreground line-through">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
          </div>

          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            <Star className="h-3.5 w-3.5 fill-gold-500 text-gold-500" />
            <span className="font-medium text-foreground text-[11px]">{product.rating}</span>
            <span className="text-[10px]">({product.reviewCount})</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
