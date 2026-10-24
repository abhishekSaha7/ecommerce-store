import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, CartState } from "@/types/cart";
import { Product } from "@/types/product";
import { PROMO_CODES } from "@/lib/constants";
import { loadFromLocalStorage, saveToLocalStorage } from "@/lib/store/storage";

const CART_STORAGE_KEY = "nova_cart_v1";

const initialCartState: CartState = {
  items: [],
  promoCode: null,
  discountPercentage: 0,
};

const initialState: CartState = loadFromLocalStorage<CartState>(CART_STORAGE_KEY, initialCartState);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
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

      saveToLocalStorage(CART_STORAGE_KEY, state);
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

      saveToLocalStorage(CART_STORAGE_KEY, state);
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

      saveToLocalStorage(CART_STORAGE_KEY, state);
    },

    applyPromoCode: (state, action: PayloadAction<string>) => {
      const code = action.payload.trim().toUpperCase();
      if (PROMO_CODES[code] !== undefined) {
        state.promoCode = code;
        state.discountPercentage = PROMO_CODES[code];
      }
      saveToLocalStorage(CART_STORAGE_KEY, state);
    },

    removePromoCode: (state) => {
      state.promoCode = null;
      state.discountPercentage = 0;
      saveToLocalStorage(CART_STORAGE_KEY, state);
    },

    clearCart: (state) => {
      state.items = [];
      state.promoCode = null;
      state.discountPercentage = 0;
      saveToLocalStorage(CART_STORAGE_KEY, state);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  applyPromoCode,
  removePromoCode,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
