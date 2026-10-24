import { CATEGORIES } from "@/lib/constants";
import { PRODUCTS_DATA } from "./products";
import { ProductCategory } from "@/types/product";

export interface CategoryWithCount {
  id: ProductCategory;
  label: string;
  description: string;
  image: string;
  productCount: number;
}

export async function getCategories(): Promise<CategoryWithCount[]> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  return CATEGORIES.map((cat) => {
    const count = PRODUCTS_DATA.filter((p) => p.category === cat.id).length;
    return {
      ...cat,
      productCount: count,
    };
  });
}
