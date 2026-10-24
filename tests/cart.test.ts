import { describe, it, expect, beforeEach } from "vitest";
import cartReducer, {
  addToCart,
  removeFromCart,
  updateQuantity,
  applyPromoCode,
  clearCart,
} from "@/features/cart/cartSlice";
import {
  selectCartSubtotal,
  selectCartDiscount,
  selectCartShippingFee,
  selectCartGrandTotal,
} from "@/features/cart/selectors";
import { Product } from "@/types/product";
import { RootState } from "@/lib/store/store";

const mockProduct: Product = {
  id: "test-01",
  name: "Test Chair",
  slug: "test-chair",
  tagline: "A test chair",
  description: "Description",
  price: 100,
  originalPrice: 120,
  category: "furniture",
  tags: ["chair"],
  images: ["/test.jpg"],
  rating: 4.8,
  reviewCount: 10,
  inStock: true,
  stockCount: 5,
  specifications: [],
  shippingInfo: "Info",
  returnsInfo: "Info",
};

describe("Cart Redux Slice & Selectors", () => {
  let initialState: ReturnType<typeof cartReducer>;

  beforeEach(() => {
    initialState = {
      items: [],
      promoCode: null,
      discountPercentage: 0,
    };
  });

  it("should add a product to cart", () => {
    const nextState = cartReducer(initialState, addToCart({ product: mockProduct, quantity: 2 }));
    expect(nextState.items.length).toBe(1);
    expect(nextState.items[0].quantity).toBe(2);
    expect(nextState.items[0].product.id).toBe("test-01");
  });

  it("should increment quantity if same product is added again", () => {
    let state = cartReducer(initialState, addToCart({ product: mockProduct, quantity: 1 }));
    state = cartReducer(state, addToCart({ product: mockProduct, quantity: 3 }));
    expect(state.items.length).toBe(1);
    expect(state.items[0].quantity).toBe(4);
  });

  it("should update quantity of an item", () => {
    let state = cartReducer(initialState, addToCart({ product: mockProduct, quantity: 1 }));
    state = cartReducer(
      state,
      updateQuantity({ productId: mockProduct.id, quantity: 5 })
    );
    expect(state.items[0].quantity).toBe(5);
  });

  it("should remove item when quantity is updated to 0", () => {
    let state = cartReducer(initialState, addToCart({ product: mockProduct, quantity: 1 }));
    state = cartReducer(
      state,
      updateQuantity({ productId: mockProduct.id, quantity: 0 })
    );
    expect(state.items.length).toBe(0);
  });

  it("should remove item from cart explicitly", () => {
    let state = cartReducer(initialState, addToCart({ product: mockProduct, quantity: 1 }));
    state = cartReducer(state, removeFromCart({ productId: mockProduct.id }));
    expect(state.items.length).toBe(0);
  });

  it("should calculate subtotal, promo discount, shipping fee, and grand total correctly", () => {
    let state = cartReducer(initialState, addToCart({ product: mockProduct, quantity: 2 })); // Subtotal = $200
    state = cartReducer(state, applyPromoCode("NOVA10")); // 10% discount

    const mockRootState = {
      cart: state,
    } as RootState;

    const subtotal = selectCartSubtotal(mockRootState);
    const discount = selectCartDiscount(mockRootState);
    const shipping = selectCartShippingFee(mockRootState);
    const grandTotal = selectCartGrandTotal(mockRootState);

    expect(subtotal).toBe(200);
    expect(discount).toBe(20); // 10% of 200
    expect(shipping).toBe(15); // Subtotal < 250 threshold, so standard shipping is $15
    // Grand Total = 200 - 20 + 15 + tax(8% of 180 = 14.4) = 209.4
    expect(grandTotal).toBe(209.4);
  });

  it("should grant free shipping when subtotal exceeds $250 threshold", () => {
    const expensiveProduct = { ...mockProduct, price: 300 };
    const state = cartReducer(initialState, addToCart({ product: expensiveProduct, quantity: 1 }));

    const mockRootState = {
      cart: state,
    } as RootState;

    const shipping = selectCartShippingFee(mockRootState);
    expect(shipping).toBe(0);
  });

  it("should clear cart completely", () => {
    let state = cartReducer(initialState, addToCart({ product: mockProduct, quantity: 2 }));
    state = cartReducer(state, clearCart());
    expect(state.items.length).toBe(0);
    expect(state.promoCode).toBeNull();
  });
});
