"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Heart, Search, Menu, User } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setCartDrawerOpen, setMobileNavOpen } from "@/features/ui/uiSlice";
import { selectCartItemCount } from "@/features/cart/selectors";
import { selectWishlistItemCount } from "@/features/wishlist/selectors";
import { ThemeToggle } from "@/components/shared/ThemeToggle";

export function Header() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const cartCount = useAppSelector(selectCartItemCount);
  const wishlistCount = useAppSelector(selectWishlistItemCount);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/90 backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Mobile menu toggle & Desktop navigation links */}
        <div className="flex items-center space-x-6 lg:space-x-8">
          <button
            onClick={() => dispatch(setMobileNavOpen(true))}
            className="p-2 text-foreground lg:hidden hover:opacity-75"
            aria-label="Open mobile navigation menu"
          >
            <Menu className="h-6 w-6" />
          </button>

          <nav className="hidden lg:flex items-center space-x-8 text-xs uppercase tracking-widest font-medium">
            <Link
              href="/shop"
              className={`transition-colors hover:text-foreground ${
                pathname === "/shop" ? "text-foreground font-semibold underline underline-offset-8" : "text-muted-foreground"
              }`}
            >
              Catalog
            </Link>
            <Link
              href="/shop?category=furniture"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Furniture
            </Link>
            <Link
              href="/shop?category=audio"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Audio
            </Link>
            <Link
              href="/shop?category=lighting"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Lighting
            </Link>
            <Link
              href="/shop?category=apparel"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Apparel
            </Link>
          </nav>
        </div>

        {/* Center: Brand Logo */}
        <div className="flex justify-center flex-1 lg:flex-initial">
          <Link href="/" className="group flex flex-col items-center">
            <span className="font-serif text-2xl sm:text-3xl font-bold tracking-[0.2em] text-foreground transition-opacity group-hover:opacity-80">
              NOVA
            </span>
            <span className="text-[9px] uppercase tracking-[0.3em] text-muted-foreground hidden sm:block">
              ESSENTIALS
            </span>
          </Link>
        </div>

        {/* Right: Actions (Search, Wishlist, Account, Cart Drawer, Theme) */}
        <div className="flex items-center space-x-3 sm:space-x-5">
          <Link
            href="/shop"
            className="p-2 text-muted-foreground hover:text-foreground transition-colors hidden sm:block"
            title="Search products"
            aria-label="Search products"
          >
            <Search className="h-5 w-5" />
          </Link>

          <Link
            href="/wishlist"
            className="relative p-2 text-muted-foreground hover:text-foreground transition-colors"
            title="Wishlist"
            aria-label={`Wishlist (${wishlistCount} items)`}
          >
            <Heart className="h-5 w-5" />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-gold-500 text-[10px] font-bold text-black">
                {wishlistCount}
              </span>
            )}
          </Link>

          <Link
            href="/account"
            className="p-2 text-muted-foreground hover:text-foreground transition-colors hidden sm:block"
            title="Account"
            aria-label="Customer Account"
          >
            <User className="h-5 w-5" />
          </Link>

          <ThemeToggle />

          <button
            onClick={() => dispatch(setCartDrawerOpen(true))}
            className="relative flex items-center space-x-2 border border-border px-3 py-2 text-xs uppercase tracking-wider font-medium hover:border-foreground transition-colors"
            aria-label={`Open shopping cart drawer with ${cartCount} items`}
          >
            <ShoppingBag className="h-4 w-4 text-foreground" />
            <span className="hidden sm:inline">Bag</span>
            <span className="bg-primary text-primary-foreground text-[11px] px-1.5 py-0.2 font-sans font-bold">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
