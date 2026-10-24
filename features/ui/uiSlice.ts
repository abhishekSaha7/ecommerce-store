import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types/product";

interface UIState {
  isCartDrawerOpen: boolean;
  isMobileNavOpen: boolean;
  isFilterSheetOpen: boolean;
  quickViewProduct: Product | null;
}

const initialState: UIState = {
  isCartDrawerOpen: false,
  isMobileNavOpen: false,
  isFilterSheetOpen: false,
  quickViewProduct: null,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setCartDrawerOpen: (state, action: PayloadAction<boolean>) => {
      state.isCartDrawerOpen = action.payload;
    },
    toggleCartDrawer: (state) => {
      state.isCartDrawerOpen = !state.isCartDrawerOpen;
    },
    setMobileNavOpen: (state, action: PayloadAction<boolean>) => {
      state.isMobileNavOpen = action.payload;
    },
    setFilterSheetOpen: (state, action: PayloadAction<boolean>) => {
      state.isFilterSheetOpen = action.payload;
    },
    setQuickViewProduct: (state, action: PayloadAction<Product | null>) => {
      state.quickViewProduct = action.payload;
    },
  },
});

export const {
  setCartDrawerOpen,
  toggleCartDrawer,
  setMobileNavOpen,
  setFilterSheetOpen,
  setQuickViewProduct,
} = uiSlice.actions;

export default uiSlice.reducer;
