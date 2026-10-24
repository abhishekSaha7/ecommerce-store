import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types/product";
import { loadFromLocalStorage, saveToLocalStorage } from "@/lib/store/storage";

const WISHLIST_STORAGE_KEY = "nova_wishlist_v1";

interface WishlistState {
  items: Product[];
}

const initialState: WishlistState = {
  items: loadFromLocalStorage<Product[]>(WISHLIST_STORAGE_KEY, []),
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleWishlist: (state, action: PayloadAction<Product>) => {
      const exists = state.items.some((item) => item.id === action.payload.id);
      if (exists) {
        state.items = state.items.filter((item) => item.id !== action.payload.id);
      } else {
        state.items.push(action.payload);
      }
      saveToLocalStorage(WISHLIST_STORAGE_KEY, state.items);
    },

    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveToLocalStorage(WISHLIST_STORAGE_KEY, state.items);
    },

    clearWishlist: (state) => {
      state.items = [];
      saveToLocalStorage(WISHLIST_STORAGE_KEY, []);
    },
  },
});

export const { toggleWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
