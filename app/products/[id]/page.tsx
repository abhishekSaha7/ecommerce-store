"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getProductById, getRelatedProducts } from "@/lib/api/products";
import { formatCurrency } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { addToCart as addToCartAction } from "@/features/cart/cartSlice";
import { toggleWishlist } from "@/features/wishlist/wishlistSlice";
import { selectIsInWishlist } from "@/features/wishlist/selectors";
import { addRecentlyViewed } from "@/features/recently-viewed/recentlyViewedSlice";
import { selectRecentlyViewedItems } from "@/features/recently-viewed/selectors";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { AccordionItem } from "@/components/ui/Accordion";
import { Skeleton } from "@/components/ui/Skeleton";
import {
  Star,
  Heart,
  ShoppingBag,
  Truck,
  ShieldCheck,
  RotateCcw,
  Minus,
  Plus,
  Check,
} from "lucide-react";
import { toast } from "sonner";

export default function ProductDetailsPage() {
  const params = useParams();
  const productId = (params?.id as string) || "";
  const dispatch = useAppDispatch();

  const isInWishlist = useAppSelector(selectIsInWishlist(productId));
  const recentlyViewed = useAppSelector(selectRecentlyViewedItems);

  // Query product details via TanStack Query
  const { data: product, isLoading, isError } = useQuery({
    queryKey: ["productDetails", productId],
    queryFn: () => getProductById(productId),
  });

  // Query related products
  const { data: relatedProducts = [] } = useQuery({
    queryKey: ["relatedProducts", productId],
    queryFn: () => getRelatedProducts(productId, 4),
    enabled: !!product,
  });

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);

  // Set default color and size when product loads & dispatch recently viewed
  useEffect(() => {
    if (product) {
      if (product.colors && product.colors.length > 0) {
        setSelectedColor(product.colors[0].name);
      }
      if (product.sizes && product.sizes.length > 0) {
        setSelectedSize(product.sizes[0]);
      }
      dispatch(addRecentlyViewed(product));
    }
  }, [product, dispatch]);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-7 space-y-4">
            <Skeleton className="aspect-square w-full" />
            <div className="grid grid-cols-3 gap-4">
              <Skeleton className="aspect-square" />
              <Skeleton className="aspect-square" />
              <Skeleton className="aspect-square" />
            </div>
          </div>
          <div className="md:col-span-5 space-y-6">
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="mx-auto max-w-xl py-24 px-4 text-center space-y-4">
        <h1 className="font-serif text-3xl font-bold uppercase tracking-wider text-muted-foreground">
          Product Not Found
        </h1>
        <p className="text-xs text-muted-foreground">
          The product you are attempting to view does not exist or has been removed from the catalog.
        </p>
        <Link href="/shop">
          <Button variant="outline" className="mt-4">
            Return to Catalog
          </Button>
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch(
      addToCartAction({
        product,
        quantity,
        selectedColor,
        selectedSize,
      })
    );
    toast.success(`Added ${quantity}x ${product.name} to bag`);
  };

  const handleWishlist = () => {
    dispatch(toggleWishlist(product));
    if (isInWishlist) {
      toast.info(`Removed ${product.name} from wishlist`);
    } else {
      toast.success(`Saved ${product.name} to wishlist`);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Breadcrumb Navigation */}
      <nav className="text-xs uppercase tracking-wider text-muted-foreground flex items-center space-x-2">
        <Link href="/" className="hover:text-foreground">Home</Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-foreground">Shop</Link>
        <span>/</span>
        <Link href={`/shop?category=${product.category}`} className="hover:text-foreground capitalize">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-foreground font-semibold truncate max-w-[200px]">{product.name}</span>
      </nav>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
        {/* Left Column: Image Gallery */}
        <div className="md:col-span-7 space-y-4">
          {/* Main Selected Image */}
          <div className="relative aspect-square w-full bg-card border border-border overflow-hidden">
            <Image
              src={product.images[selectedImage] || product.images[0]}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 55vw"
              className="object-cover transition-all duration-300"
            />
            {product.discountPercentage && product.discountPercentage > 0 && (
              <Badge variant="destructive" className="absolute top-4 left-4 z-10">
                {product.discountPercentage}% OFF
              </Badge>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative aspect-square border transition-all ${
                    selectedImage === idx ? "border-foreground ring-1 ring-foreground" : "border-border opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image src={img} alt={`${product.name} preview ${idx}`} fill sizes="100px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Metadata & Buy Controls */}
        <div className="md:col-span-5 space-y-8">
          <div>
            <span className="text-xs uppercase tracking-widest text-gold-600 dark:text-gold-400 font-bold">
              {product.category}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-foreground mt-1">
              {product.name}
            </h1>
            <p className="text-xs text-muted-foreground mt-2 font-light leading-relaxed">
              {product.tagline}
            </p>
          </div>

          {/* Price & Rating */}
          <div className="flex items-center justify-between border-y border-border py-4">
            <div className="flex items-center space-x-3">
              <span className="text-2xl font-bold text-foreground">
                {formatCurrency(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-sm text-muted-foreground line-through">
                  {formatCurrency(product.originalPrice)}
                </span>
              )}
            </div>

            <div className="flex items-center space-x-1.5 text-xs text-muted-foreground">
              <Star className="h-4 w-4 fill-gold-500 text-gold-500" />
              <span className="font-bold text-foreground text-sm">{product.rating}</span>
              <span>({product.reviewCount} customer reviews)</span>
            </div>
          </div>

          {/* Color Selector */}
          {product.colors && product.colors.length > 0 && (
            <div className="space-y-3">
              <label className="text-xs uppercase tracking-wider font-semibold text-muted-foreground block">
                Finish / Color: <strong className="text-foreground">{selectedColor}</strong>
              </label>
              <div className="flex items-center space-x-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`h-9 w-9 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedColor === color.name
                        ? "border-foreground ring-2 ring-foreground ring-offset-2 dark:ring-offset-background"
                        : "border-transparent opacity-80 hover:opacity-100"
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                    aria-label={`Select ${color.name}`}
                  >
                    {selectedColor === color.name && (
                      <Check className="h-4 w-4 text-white drop-shadow-md" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selector */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="space-y-3">
              <label className="text-xs uppercase tracking-wider font-semibold text-muted-foreground block">
                Select Option / Size:
              </label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 text-xs uppercase tracking-wider border transition-colors ${
                      selectedSize === size
                        ? "bg-primary text-primary-foreground border-primary font-semibold"
                        : "border-border text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & Buy Buttons */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center space-x-4">
              {/* Quantity Counter */}
              <div className="flex items-center border border-border h-12">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 text-muted-foreground hover:text-foreground"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 font-semibold text-sm">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 text-muted-foreground hover:text-foreground"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              {/* Add to Bag CTA */}
              <Button
                onClick={handleAddToCart}
                size="lg"
                className="flex-1 h-12 flex items-center justify-center space-x-2"
              >
                <ShoppingBag className="h-4 w-4" />
                <span>Add to Shopping Bag</span>
              </Button>

              {/* Wishlist button */}
              <Button
                onClick={handleWishlist}
                variant="outline"
                size="icon"
                className="h-12 w-12 shrink-0"
                title={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart className={`h-5 w-5 ${isInWishlist ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
            </div>
          </div>

          {/* Delivery & Warranty Badges */}
          <div className="grid grid-cols-3 gap-2 border-t border-border pt-6 text-[11px] text-muted-foreground text-center">
            <div className="flex flex-col items-center space-y-1">
              <Truck className="h-4 w-4 text-gold-500" />
              <span>Complimentary Freight</span>
            </div>
            <div className="flex flex-col items-center space-y-1 border-x border-border">
              <ShieldCheck className="h-4 w-4 text-gold-500" />
              <span>5-Year Warranty</span>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <RotateCcw className="h-4 w-4 text-gold-500" />
              <span>30-Day Returns</span>
            </div>
          </div>

          {/* Accordion Specs & Info */}
          <div className="border-t border-border pt-4">
            <AccordionItem title="Product Description" defaultOpen={true}>
              <p className="leading-relaxed">{product.description}</p>
            </AccordionItem>

            <AccordionItem title="Materials & Specifications">
              <ul className="space-y-2">
                {product.specifications.map((spec, i) => (
                  <li key={i} className="flex justify-between border-b border-border/40 pb-1">
                    <span className="text-muted-foreground">{spec.label}:</span>
                    <span className="font-semibold text-foreground">{spec.value}</span>
                  </li>
                ))}
              </ul>
            </AccordionItem>

            <AccordionItem title="Shipping & White-Glove Delivery">
              <p>{product.shippingInfo}</p>
            </AccordionItem>

            <AccordionItem title="Returns & 30-Day Trial">
              <p>{product.returnsInfo}</p>
            </AccordionItem>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <section className="border-t border-border pt-16 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-border pb-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
              Verified Feedback
            </span>
            <h2 className="font-serif text-3xl font-bold text-foreground mt-1">Customer Reviews</h2>
          </div>
          <div className="flex items-center space-x-2 text-sm mt-2 md:mt-0">
            <Star className="h-4 w-4 fill-gold-500 text-gold-500" />
            <span className="font-bold text-foreground">{product.rating} / 5.0</span>
            <span className="text-muted-foreground">({product.reviewCount} total ratings)</span>
          </div>
        </div>

        {product.reviews && product.reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {product.reviews.map((rev) => (
              <div key={rev.id} className="bg-card border border-border p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm">{rev.reviewerName}</span>
                  <span className="text-xs text-muted-foreground">{rev.date}</span>
                </div>
                <div className="flex items-center space-x-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 ${
                        i < rev.rating ? "fill-gold-500 text-gold-500" : "text-border"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{rev.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-muted-foreground py-4">No written reviews submitted yet.</p>
        )}
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-border pt-16 space-y-8">
          <h2 className="font-serif text-3xl font-bold text-foreground">You May Also Appreciate</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}

      {/* Recently Viewed Products */}
      {recentlyViewed.filter((item) => item.id !== productId).length > 0 && (
        <section className="border-t border-border pt-16 space-y-8">
          <h2 className="font-serif text-2xl font-bold text-foreground">Recently Viewed</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentlyViewed
              .filter((item) => item.id !== productId)
              .slice(0, 4)
              .map((rec) => (
                <ProductCard key={rec.id} product={rec} />
              ))}
          </div>
        </section>
      )}
    </div>
  );
}
