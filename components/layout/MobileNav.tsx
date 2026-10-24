"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, ShoppingBag, Heart, User, Search, ArrowRight } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setMobileNavOpen, setCartDrawerOpen } from "@/features/ui/uiSlice";
import { selectWishlistItemCount } from "@/features/wishlist/selectors";
import { selectCartItemCount } from "@/features/cart/selectors";
import { CATEGORIES } from "@/lib/constants";
import { Button } from "@/components/ui/Button";

export function MobileNav() {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const isOpen = useAppSelector((state) => state.ui.isMobileNavOpen);
  const wishlistCount = useAppSelector(selectWishlistItemCount);
  const cartCount = useAppSelector(selectCartItemCount);

  if (!isOpen) return null;

  const closeNav = () => dispatch(setMobileNavOpen(false));
  const openCart = () => {
    dispatch(setMobileNavOpen(false));
    dispatch(setCartDrawerOpen(true));
  };

  return (
    <div className="fixed inset-0 z-50 flex lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm transition-opacity"
        onClick={closeNav}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div className="relative flex w-full max-w-xs flex-1 flex-col bg-background p-6 shadow-2xl border-r border-border transition-transform duration-300">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <Link href="/" onClick={closeNav} className="font-serif text-2xl font-bold tracking-wider">
            NOVA
          </Link>
          <button
            onClick={closeNav}
            className="p-2 text-muted-foreground hover:text-foreground"
            aria-label="Close navigation menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Search link */}
        <div className="my-6">
          <Link
            href="/shop"
            onClick={closeNav}
            className="flex items-center justify-between border border-border px-4 py-3 text-xs tracking-wider text-muted-foreground hover:border-foreground"
          >
            <span className="flex items-center space-x-2">
              <Search className="h-4 w-4" />
              <span>Search products...</span>
            </span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Primary nav links */}
        <nav className="space-y-4 text-xs uppercase tracking-widest font-medium">
          <Link
            href="/shop"
            onClick={closeNav}
            className={`block py-2 transition-colors ${
              pathname === "/shop" ? "text-foreground font-semibold" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            All Products
          </Link>

          {/* Categories */}
          <div className="pt-2 pb-2">
            <span className="text-[10px] tracking-widest text-muted-foreground/60 uppercase block mb-2 font-bold">
              Collections
            </span>
            <div className="space-y-2.5 pl-3">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/shop?category=${cat.id}`}
                  onClick={closeNav}
                  className="block text-muted-foreground hover:text-foreground text-[11px] uppercase tracking-wider"
                >
                  {cat.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="border-t border-border pt-4 space-y-3">
            <Link
              href="/wishlist"
              onClick={closeNav}
              className="flex items-center justify-between py-1.5 text-muted-foreground hover:text-foreground"
            >
              <span className="flex items-center space-x-2">
                <Heart className="h-4 w-4" />
                <span>Wishlist</span>
              </span>
              {wishlistCount > 0 && (
                <span className="bg-primary text-primary-foreground text-[10px] px-2 py-0.5 font-sans">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link
              href="/account"
              onClick={closeNav}
              className="flex items-center space-x-2 py-1.5 text-muted-foreground hover:text-foreground"
            >
              <User className="h-4 w-4" />
              <span>Account</span>
            </Link>
          </div>
        </nav>

        {/* Footer CTAs */}
        <div className="mt-auto border-t border-border pt-6 space-y-3">
          <Button onClick={openCart} className="w-full flex items-center justify-center space-x-2">
            <ShoppingBag className="h-4 w-4" />
            <span>View Cart ({cartCount})</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
