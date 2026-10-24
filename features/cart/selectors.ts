import { RootState } from "@/lib/store/store";
import { SHIPPING_CONFIG } from "@/lib/constants";

export const selectCartItems = (state: RootState) => state.cart.items;

export const selectCartItemCount = (state: RootState) =>
  state.cart.items.reduce((acc, item) => acc + item.quantity, 0);

export const selectCartSubtotal = (state: RootState) =>
  state.cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

export const selectCartDiscount = (state: RootState) => {
  const subtotal = selectCartSubtotal(state);
  return (subtotal * state.cart.discountPercentage) / 100;
};

export const selectCartShippingFee = (state: RootState) => {
  const subtotal = selectCartSubtotal(state);
  if (subtotal === 0 || subtotal >= SHIPPING_CONFIG.FREE_SHIPPING_THRESHOLD) {
    return 0;
  }
  return SHIPPING_CONFIG.STANDARD_SHIPPING_FEE;
};

export const selectFreeShippingRemaining = (state: RootState) => {
  const subtotal = selectCartSubtotal(state);
  return Math.max(0, SHIPPING_CONFIG.FREE_SHIPPING_THRESHOLD - subtotal);
};

export const selectCartEstimatedTax = (state: RootState) => {
  const subtotal = selectCartSubtotal(state);
  const discount = selectCartDiscount(state);
  return Math.round((subtotal - discount) * SHIPPING_CONFIG.TAX_RATE * 100) / 100;
};

export const selectCartGrandTotal = (state: RootState) => {
  const subtotal = selectCartSubtotal(state);
  const discount = selectCartDiscount(state);
  const shipping = selectCartShippingFee(state);
  const tax = selectCartEstimatedTax(state);
  return Math.max(0, subtotal - discount + shipping + tax);
};

export const selectPromoCode = (state: RootState) => state.cart.promoCode;
export const selectDiscountPercentage = (state: RootState) => state.cart.discountPercentage;
