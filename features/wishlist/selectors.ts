import { RootState } from "@/lib/store/store";

export const selectWishlistItems = (state: RootState) => state.wishlist.items;

export const selectWishlistItemCount = (state: RootState) => state.wishlist.items.length;

export const selectIsInWishlist = (productId: string) => (state: RootState) =>
  state.wishlist.items.some((item) => item.id === productId);
