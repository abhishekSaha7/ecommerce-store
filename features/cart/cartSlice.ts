import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartState } from "@/types/cart";
import { Product } from "@/types/product";
import { PROMO_CODES } from "@/lib/constants";

// Static initial state: must be identical on the server and on the client's first
// render to avoid hydration mismatches. Persisted data is loaded after mount via hydrateCart.
const initialState: CartState = {
  items: [],
  promoCode: null,
  discountPercentage: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    hydrateCart: (_state, action: PayloadAction<CartState>) => action.payload,

    addToCart: (
      state,
      action: PayloadAction<{
        product: Product;
        quantity?: number;
        selectedColor?: string;
        selectedSize?: string;
      }>
    ) => {
      const { product, quantity = 1, selectedColor, selectedSize } = action.payload;

      const existingIndex = state.items.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor === selectedColor &&
          item.selectedSize === selectedSize
      );

      if (existingIndex > -1) {
        state.items[existingIndex].quantity += quantity;
      } else {
        state.items.push({
          product,
          quantity,
          selectedColor,
          selectedSize,
        });
      }
    },

    removeFromCart: (
      state,
      action: PayloadAction<{ productId: string; selectedColor?: string; selectedSize?: string }>
    ) => {
      const { productId, selectedColor, selectedSize } = action.payload;
      state.items = state.items.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedColor === selectedColor &&
            item.selectedSize === selectedSize
          )
      );
    },

    updateQuantity: (
      state,
      action: PayloadAction<{
        productId: string;
        quantity: number;
        selectedColor?: string;
        selectedSize?: string;
      }>
    ) => {
      const { productId, quantity, selectedColor, selectedSize } = action.payload;
      if (quantity <= 0) {
        state.items = state.items.filter(
          (item) =>
            !(
              item.product.id === productId &&
              item.selectedColor === selectedColor &&
              item.selectedSize === selectedSize
            )
        );
      } else {
        const item = state.items.find(
          (i) =>
            i.product.id === productId &&
            i.selectedColor === selectedColor &&
            i.selectedSize === selectedSize
        );
        if (item) {
          item.quantity = quantity;
        }
      }
    },

    applyPromoCode: (state, action: PayloadAction<string>) => {
      const code = action.payload.trim().toUpperCase();
      if (PROMO_CODES[code] !== undefined) {
        state.promoCode = code;
        state.discountPercentage = PROMO_CODES[code];
      }
    },

    removePromoCode: (state) => {
      state.promoCode = null;
      state.discountPercentage = 0;
    },

    clearCart: (state) => {
      state.items = [];
      state.promoCode = null;
      state.discountPercentage = 0;
    },
  },
});

export const {
  hydrateCart,
  addToCart,
  removeFromCart,
  updateQuantity,
  applyPromoCode,
  removePromoCode,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
