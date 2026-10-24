import { Product } from "./product";

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface CartState {
  items: CartItem[];
  promoCode: string | null;
  discountPercentage: number;
}
