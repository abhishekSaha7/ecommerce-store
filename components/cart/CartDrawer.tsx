"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Tag } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setCartDrawerOpen } from "@/features/ui/uiSlice";
import {
  removeFromCart,
  updateQuantity,
  applyPromoCode,
  removePromoCode,
} from "@/features/cart/cartSlice";
import {
  selectCartItems,
  selectCartItemCount,
  selectCartSubtotal,
  selectCartDiscount,
  selectCartShippingFee,
  selectFreeShippingRemaining,
  selectCartGrandTotal,
  selectPromoCode,
} from "@/features/cart/selectors";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";

export function CartDrawer() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.ui.isCartDrawerOpen);
  const items = useAppSelector(selectCartItems);
  const itemCount = useAppSelector(selectCartItemCount);
  const subtotal = useAppSelector(selectCartSubtotal);
  const discount = useAppSelector(selectCartDiscount);
  const shipping = useAppSelector(selectCartShippingFee);
  const remainingForFreeShipping = useAppSelector(selectFreeShippingRemaining);
  const grandTotal = useAppSelector(selectCartGrandTotal);
  const activePromo = useAppSelector(selectPromoCode);

  const [promoInput, setPromoInput] = useState("");

  if (!isOpen) return null;

  const closeDrawer = () => dispatch(setCartDrawerOpen(false));

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

  const freeShippingProgress = Math.min(100, (subtotal / 250) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm transition-opacity"
        onClick={closeDrawer}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md bg-card text-card-foreground border-l border-border shadow-2xl flex flex-col">
          {/* Drawer Header */}
          <div className="flex items-center justify-between border-b border-border p-6">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="h-5 w-5" />
              <h2 className="font-serif text-xl font-bold tracking-wider">Shopping Bag</h2>
              <span className="text-xs text-muted-foreground font-sans">({itemCount})</span>
            </div>
            <button
              onClick={closeDrawer}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close cart drawer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="bg-muted/50 p-4 border-b border-border text-center text-xs">
            {remainingForFreeShipping > 0 ? (
              <p>
                Add <strong className="text-foreground">{formatCurrency(remainingForFreeShipping)}</strong> more to unlock <span className="text-gold-500 uppercase font-semibold">Free Express Shipping</span>
              </p>
            ) : (
              <p className="text-gold-500 font-semibold uppercase tracking-wider">
                ✓ You qualify for free express white-glove delivery!
              </p>
            )}
            <div className="mt-2 h-1.5 w-full bg-border overflow-hidden">
              <div
                className="h-full bg-gold-500 transition-all duration-300"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground/40" />
                <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                  Your bag is currently empty
                </p>
                <Button onClick={closeDrawer} variant="outline" className="mt-4">
                  Explore Catalog
                </Button>
              </div>
            ) : (
              items.map((item, idx) => (
                <div
                  key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}-${idx}`}
                  className="flex space-x-4 border-b border-border/50 pb-4"
                >
                  <div className="relative h-24 w-20 bg-muted shrink-0 overflow-hidden">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between text-xs">
                    <div>
                      <div className="flex justify-between font-medium">
                        <Link
                          href={`/products/${item.product.id}`}
                          onClick={closeDrawer}
                          className="hover:underline line-clamp-1 text-sm font-serif font-bold"
                        >
                          {item.product.name}
                        </Link>
                        <span className="font-semibold text-sm">
                          {formatCurrency(item.product.price * item.quantity)}
                        </span>
                      </div>

                      <p className="text-[11px] text-muted-foreground capitalize mt-0.5">
                        Category: {item.product.category}
                      </p>

                      {(item.selectedColor || item.selectedSize) && (
                        <div className="text-[11px] text-muted-foreground mt-1 space-x-2">
                          {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                          {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                        </div>
                      )}
                    </div>

                    {/* Quantity Controls & Remove */}
                    <div className="flex items-center justify-between mt-3">
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
                          className="p-1.5 hover:bg-muted text-muted-foreground transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="px-3 text-xs font-semibold">{item.quantity}</span>
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
                          className="p-1.5 hover:bg-muted text-muted-foreground transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => {
                          dispatch(
                            removeFromCart({
                              productId: item.product.id,
                              selectedColor: item.selectedColor,
                              selectedSize: item.selectedSize,
                            })
                          );
                          toast.info(`${item.product.name} removed from bag`);
                        }}
                        className="text-muted-foreground hover:text-destructive p-1 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer */}
          {items.length > 0 && (
            <div className="border-t border-border p-6 bg-card space-y-4">
              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-3 h-3.5 w-3.5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Promo code (e.g. NOVA10)"
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

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-gold-600 dark:text-gold-400 font-medium">
                    <span>Discount</span>
                    <span>-{formatCurrency(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-muted-foreground">
                  <span>Estimated Shipping</span>
                  <span>{shipping === 0 ? "FREE" : formatCurrency(shipping)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold pt-2 border-t border-border text-foreground">
                  <span>Total</span>
                  <span>{formatCurrency(grandTotal)}</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="space-y-2 pt-2">
                <Link href="/checkout" onClick={closeDrawer} className="block">
                  <Button className="w-full flex items-center justify-center space-x-2">
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>

                <Link href="/cart" onClick={closeDrawer} className="block">
                  <Button variant="outline" className="w-full">
                    View Full Bag Page
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
