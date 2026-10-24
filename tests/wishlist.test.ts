import { describe, it, expect } from "vitest";
import wishlistReducer, {
  toggleWishlist,
  removeFromWishlist,
  clearWishlist,
} from "@/features/wishlist/wishlistSlice";
import { selectIsInWishlist } from "@/features/wishlist/selectors";
import { Product } from "@/types/product";
import { RootState } from "@/lib/store/store";

const mockProduct: Product = {
  id: "wish-01",
  name: "Wishlist Lamp",
  slug: "wishlist-lamp",
  tagline: "A test lamp",
  description: "Description",
  price: 250,
  category: "lighting",
  tags: ["lamp"],
  images: ["/lamp.jpg"],
  rating: 4.9,
  reviewCount: 5,
  inStock: true,
  stockCount: 3,
  specifications: [],
  shippingInfo: "Info",
  returnsInfo: "Info",
};

describe("Wishlist Redux Slice", () => {
  const initialState = { items: [] };

  it("should add product to wishlist on toggle if absent", () => {
    const state = wishlistReducer(initialState, toggleWishlist(mockProduct));
    expect(state.items.length).toBe(1);
    expect(state.items[0].id).toBe("wish-01");
  });

  it("should remove product from wishlist on toggle if present", () => {
    let state = wishlistReducer(initialState, toggleWishlist(mockProduct));
    state = wishlistReducer(state, toggleWishlist(mockProduct));
    expect(state.items.length).toBe(0);
  });

  it("should remove product by ID explicitly", () => {
    let state = wishlistReducer(initialState, toggleWishlist(mockProduct));
    state = wishlistReducer(state, removeFromWishlist("wish-01"));
    expect(state.items.length).toBe(0);
  });

  it("should check if product is in wishlist using selector", () => {
    const state = wishlistReducer(initialState, toggleWishlist(mockProduct));
    const mockRootState = { wishlist: state } as RootState;

    expect(selectIsInWishlist("wish-01")(mockRootState)).toBe(true);
    expect(selectIsInWishlist("non-existent")(mockRootState)).toBe(false);
  });
});
