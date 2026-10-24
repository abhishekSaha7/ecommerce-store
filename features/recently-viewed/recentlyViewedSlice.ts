import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types/product";

const MAX_RECENTLY_VIEWED = 8;

interface RecentlyViewedState {
  items: Product[];
}

// Static initial state (same on server and client). Persisted items are loaded after mount.
const initialState: RecentlyViewedState = {
  items: [],
};

export const recentlyViewedSlice = createSlice({
  name: "recentlyViewed",
  initialState,
  reducers: {
    hydrateRecentlyViewed: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload.slice(0, MAX_RECENTLY_VIEWED);
    },
    addRecentlyViewed: (state, action: PayloadAction<Product>) => {
      // Remove duplicate if already present
      const filtered = state.items.filter((item) => item.id !== action.payload.id);
      // Prepend newest item to start of array
      state.items = [action.payload, ...filtered].slice(0, MAX_RECENTLY_VIEWED);
    },
    clearRecentlyViewed: (state) => {
      state.items = [];
    },
  },
});

export const { hydrateRecentlyViewed, addRecentlyViewed, clearRecentlyViewed } =
  recentlyViewedSlice.actions;

export default recentlyViewedSlice.reducer;
