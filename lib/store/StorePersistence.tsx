"use client";

import { useEffect } from "react";
import { useAppStore } from "@/lib/store/hooks";
import { loadFromLocalStorage, saveToLocalStorage } from "@/lib/store/storage";
import { hydrateCart } from "@/features/cart/cartSlice";
import { hydrateWishlist } from "@/features/wishlist/wishlistSlice";
import { hydrateRecentlyViewed } from "@/features/recently-viewed/recentlyViewedSlice";
import { CartState } from "@/types/cart";
import { Product } from "@/types/product";

export const STORAGE_KEYS = {
  cart: "nova_cart_v1",
  wishlist: "nova_wishlist_v1",
  recentlyViewed: "nova_recently_viewed_v1",
} as const;

/**
 * Loads persisted client state from localStorage AFTER mount (so the server HTML and the
 * client's first render match), then subscribes to the store to persist further changes.
 */
export function StorePersistence() {
  const store = useAppStore();

  useEffect(() => {
    const storedCart = loadFromLocalStorage<CartState | null>(STORAGE_KEYS.cart, null);
    if (storedCart) store.dispatch(hydrateCart(storedCart));

    const storedWishlist = loadFromLocalStorage<Product[] | null>(STORAGE_KEYS.wishlist, null);
    if (storedWishlist) store.dispatch(hydrateWishlist(storedWishlist));

    const storedRecent = loadFromLocalStorage<Product[] | null>(STORAGE_KEYS.recentlyViewed, null);
    if (storedRecent) store.dispatch(hydrateRecentlyViewed(storedRecent));

    // Subscribe only after hydration so the empty initial state never overwrites saved data.
    let previous = store.getState();
    return store.subscribe(() => {
      const current = store.getState();
      if (current.cart !== previous.cart) saveToLocalStorage(STORAGE_KEYS.cart, current.cart);
      if (current.wishlist !== previous.wishlist) {
        saveToLocalStorage(STORAGE_KEYS.wishlist, current.wishlist.items);
      }
      if (current.recentlyViewed !== previous.recentlyViewed) {
        saveToLocalStorage(STORAGE_KEYS.recentlyViewed, current.recentlyViewed.items);
      }
      previous = current;
    });
  }, [store]);

  return null;
}
