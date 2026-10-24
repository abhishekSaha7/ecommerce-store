export type ProductCategory = 
  | "furniture"
  | "lighting"
  | "audio"
  | "homeware"
  | "apparel"
  | "accessories";

export interface ProductReview {
  id: string;
  reviewerName: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
}

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  category: ProductCategory;
  tags: string[];
  images: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount: number;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  colors?: { name: string; hex: string }[];
  sizes?: string[];
  specifications: ProductSpecification[];
  shippingInfo: string;
  returnsInfo: string;
  reviews?: ProductReview[];
}

export interface ProductFilterParams {
  category?: ProductCategory | "all";
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  inStockOnly?: boolean;
  sortBy?: "featured" | "price-asc" | "price-desc" | "rating" | "newest";
  page?: number;
  limit?: number;
}

export interface PaginatedProductsResponse {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
}
