import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types/product";
import { loadFromLocalStorage, saveToLocalStorage } from "@/lib/store/storage";

const RECENTLY_VIEWED_KEY = "nova_recently_viewed_v1";
const MAX_RECENTLY_VIEWED = 8;

interface RecentlyViewedState {
  items: Product[];
}

const initialState: RecentlyViewedState = {
  items: loadFromLocalStorage<Product[]>(RECENTLY_VIEWED_KEY, []),
};

export const recentlyViewedSlice = createSlice({
  name: "recentlyViewed",
  initialState,
  reducers: {
    addRecentlyViewed: (state, action: PayloadAction<Product>) => {
      // Remove duplicate if already present
      const filtered = state.items.filter((item) => item.id !== action.payload.id);
      // Prepend newest item to start of array
      state.items = [action.payload, ...filtered].slice(0, MAX_RECENTLY_VIEWED);
      saveToLocalStorage(RECENTLY_VIEWED_KEY, state.items);
    },
    clearRecentlyViewed: (state) => {
      state.items = [];
      saveToLocalStorage(RECENTLY_VIEWED_KEY, []);
    },
  },
});

export const { addRecentlyViewed, clearRecentlyViewed } = recentlyViewedSlice.actions;

export default recentlyViewedSlice.reducer;
