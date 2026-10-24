"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
  applyPromoCode,
  removePromoCode,
} from "@/features/cart/cartSlice";
import {
  selectCartItems,
  selectCartSubtotal,
  selectCartDiscount,
  selectCartShippingFee,
  selectFreeShippingRemaining,
  selectCartEstimatedTax,
  selectCartGrandTotal,
  selectPromoCode,
} from "@/features/cart/selectors";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, Tag, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export default function CartPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const subtotal = useAppSelector(selectCartSubtotal);
  const discount = useAppSelector(selectCartDiscount);
  const shipping = useAppSelector(selectCartShippingFee);
  const tax = useAppSelector(selectCartEstimatedTax);
  const remainingForFreeShipping = useAppSelector(selectFreeShippingRemaining);
  const grandTotal = useAppSelector(selectCartGrandTotal);
  const activePromo = useAppSelector(selectPromoCode);

  const [promoInput, setPromoInput] = useState("");

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    dispatch(applyPromoCode(promoInput));
    if (promoInput.trim().toUpperCase() === "NOVA10" || promoInput.trim().toUpperCase() === "WELCOME20") {
      toast.success(`Promo code ${promoInput.toUpperCase()} applied!`);
    } else {
      toast.error("Invalid promo code. Try 'NOVA10'");
    }
    setPromoInput("");
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 text-center space-y-6">
        <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground/30" />
        <h1 className="font-serif text-3xl font-bold tracking-tight">Your Bag is Empty</h1>
        <p className="text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">
          You currently have no items in your shopping bag. Explore our curated collections of architectural furniture, acoustic audio, and refined essentials.
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

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-border pb-6">
        <div>
          <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
            Shopping Cart
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight mt-1">Your Order Bag</h1>
        </div>
        <button
          onClick={() => {
            dispatch(clearCart());
            toast.info("Shopping bag cleared");
          }}
          className="text-xs uppercase tracking-wider text-muted-foreground hover:text-destructive mt-4 sm:mt-0 transition-colors"
        >
          Clear Entire Bag
        </button>
      </div>

      {/* Main Cart Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Itemized List */}
        <div className="lg:col-span-8 space-y-6">
          {/* Free Shipping Indicator */}
          <div className="bg-muted/40 border border-border p-4 text-xs space-y-2">
            {remainingForFreeShipping > 0 ? (
              <p>
                Add <strong>{formatCurrency(remainingForFreeShipping)}</strong> more to qualify for <span className="text-gold-500 font-bold uppercase">Free White-Glove Freight</span>
              </p>
            ) : (
              <p className="text-gold-500 font-bold uppercase tracking-wider">
                ✓ Free White-Glove Express Shipping Unlocked!
              </p>
            )}
            <div className="h-1.5 w-full bg-border overflow-hidden">
              <div
                className="h-full bg-gold-500 transition-all duration-300"
                style={{ width: `${Math.min(100, (subtotal / 250) * 100)}%` }}
              />
            </div>
          </div>

          {/* Table Header */}
          <div className="hidden sm:grid grid-cols-12 text-xs uppercase tracking-wider text-muted-foreground border-b border-border pb-2">
            <span className="col-span-6">Product</span>
            <span className="col-span-3 text-center">Quantity</span>
            <span className="col-span-3 text-right">Total</span>
          </div>

          {/* Items */}
          <div className="divide-y divide-border">
            {items.map((item, idx) => (
              <div
                key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}-${idx}`}
                className="py-6 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center"
              >
                {/* Item Details */}
                <div className="sm:col-span-6 flex space-x-4">
                  <div className="relative h-28 w-24 bg-muted shrink-0 overflow-hidden border border-border">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      sizes="100px"
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-1 text-xs">
                    <span className="text-[10px] uppercase text-muted-foreground tracking-widest font-semibold">
                      {item.product.category}
                    </span>
                    <h3 className="font-serif text-base font-bold text-foreground">
                      <Link href={`/products/${item.product.id}`} className="hover:underline">
                        {item.product.name}
                      </Link>
                    </h3>
                    <p className="text-muted-foreground">{formatCurrency(item.product.price)} each</p>
                    {(item.selectedColor || item.selectedSize) && (
                      <div className="text-[11px] text-muted-foreground pt-1">
                        {item.selectedColor && <span>Finish: {item.selectedColor} </span>}
                        {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                      </div>
                    )}
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="sm:col-span-3 flex items-center justify-start sm:justify-center">
                  <div className="flex items-center border border-border">
                    <button
                      onClick={() =>
                        dispatch(
                          updateQuantity({
                            productId: item.product.id,
                            quantity: item.quantity - 1,
                            selectedColor: item.selectedColor,
                            selectedSize: item.selectedSize,
                          })
                        )
                      }
                      className="p-2 text-muted-foreground hover:text-foreground"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="px-4 text-xs font-semibold">{item.quantity}</span>
                    <button
                      onClick={() =>
                        dispatch(
                          updateQuantity({
                            productId: item.product.id,
                            quantity: item.quantity + 1,
                            selectedColor: item.selectedColor,
                            selectedSize: item.selectedSize,
                          })
                        )
                      }
                      className="p-2 text-muted-foreground hover:text-foreground"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {/* Total & Remove */}
                <div className="sm:col-span-3 flex items-center justify-between sm:justify-end space-x-4">
                  <span className="font-bold text-sm">
                    {formatCurrency(item.product.price * item.quantity)}
                  </span>
                  <button
                    onClick={() => {
                      dispatch(
                        removeFromCart({
                          productId: item.product.id,
                          selectedColor: item.selectedColor,
                          selectedSize: item.selectedSize,
                        })
                      );
                      toast.info(`Removed ${item.product.name} from bag`);
                    }}
                    className="p-1 text-muted-foreground hover:text-destructive"
                    aria-label="Remove item"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4">
            <Link href="/shop" className="inline-flex items-center text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground">
              <ArrowLeft className="mr-2 h-3.5 w-3.5" />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>

        {/* Right Column: Order Summary Card */}
        <div className="lg:col-span-4 bg-card border border-border p-6 space-y-6">
          <h2 className="font-serif text-xl font-bold tracking-wide">Order Summary</h2>

          {/* Promo Form */}
          <form onSubmit={handleApplyPromo} className="flex gap-2">
            <div className="relative flex-1">
              <Tag className="absolute left-3 top-3 h-3.5 w-3.5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Promo Code"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                className="w-full bg-muted border border-border pl-9 pr-3 py-2 text-xs uppercase tracking-wider focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>
            <Button type="submit" variant="outline" size="sm">
              Apply
            </Button>
          </form>

          {activePromo && (
            <div className="flex items-center justify-between text-xs bg-gold-500/10 p-2 text-gold-600 dark:text-gold-400">
              <span>Code <strong>{activePromo}</strong> applied</span>
              <button
                onClick={() => dispatch(removePromoCode())}
                className="underline text-[10px] uppercase font-semibold"
              >
                Remove
              </button>
            </div>
          )}

          {/* Financial Breakdown */}
          <div className="space-y-3 text-xs border-t border-border pt-4">
            <div className="flex justify-between text-muted-foreground">
              <span>Bag Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-gold-600 dark:text-gold-400 font-medium">
                <span>Promo Discount</span>
                <span>-{formatCurrency(discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-muted-foreground">
              <span>Estimated Freight Shipping</span>
              <span>{shipping === 0 ? "FREE" : formatCurrency(shipping)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Estimated Sales Tax (8%)</span>
              <span>{formatCurrency(tax)}</span>
            </div>
            <div className="flex justify-between text-base font-bold border-t border-border pt-3 text-foreground">
              <span>Grand Total</span>
              <span>{formatCurrency(grandTotal)}</span>
            </div>
          </div>

          <Link href="/checkout" className="block pt-2">
            <Button size="lg" className="w-full flex items-center justify-center space-x-2">
              <span>Proceed to Checkout</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
