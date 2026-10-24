import { Product } from "@/types/product";
import { PRODUCTS_DATA } from "./products";

export interface SmartPickRecommendation {
  product: Product;
  score: number;
  reason: string;
}

export interface UserSignals {
  cartProductIds: string[];
  wishlistProductIds: string[];
  recentlyViewedIds: string[];
}

export function generateSmartPicks(
  signals: UserSignals,
  limit: number = 4
): SmartPickRecommendation[] {
  const { cartProductIds, wishlistProductIds, recentlyViewedIds } = signals;

  // Gather all seed products the user has interacted with
  const seedIds = Array.from(new Set([...cartProductIds, ...wishlistProductIds, ...recentlyViewedIds]));
  const seedProducts = PRODUCTS_DATA.filter((p) => seedIds.includes(p.id));

  // If user has zero history yet, fallback to curated featured/bestseller picks
  if (seedProducts.length === 0) {
    const fallbackProducts = PRODUCTS_DATA.filter((p) => p.isFeatured || p.isBestSeller).slice(0, limit);
    return fallbackProducts.map((product) => ({
      product,
      score: 85,
      reason: "Curated architectural essential",
    }));
  }

  // Extract user preference profiles
  const preferredCategories = new Set(seedProducts.map((p) => p.category));
  const preferredTags = new Set(seedProducts.flatMap((p) => p.tags));
  const avgPrice =
    seedProducts.reduce((sum, p) => sum + p.price, 0) / (seedProducts.length || 1);

  // Score candidate products (excluding items already in cart)
  const candidateProducts = PRODUCTS_DATA.filter((p) => !cartProductIds.includes(p.id));

  const scored: SmartPickRecommendation[] = candidateProducts.map((product) => {
    let score = 0;
    let mainReason = "Curated luxury essential";

    // 1. Category affinity (+20)
    if (preferredCategories.has(product.category)) {
      score += 20;
      mainReason = `Based on your interest in ${product.category}`;
    }

    // 2. Tag overlap (+8 per matching tag)
    const matchingTags = product.tags.filter((t) => preferredTags.has(t));
    if (matchingTags.length > 0) {
      score += matchingTags.length * 8;
      if (score > 20) {
        mainReason = `Matches your aesthetic preference for ${matchingTags[0]}`;
      }
    }

    // 3. Price proximity (+15 if within 30% of average user price)
    const priceDiffRatio = Math.abs(product.price - avgPrice) / avgPrice;
    if (priceDiffRatio <= 0.3) {
      score += 15;
    }

    // 4. Rating boost (+10 if rating >= 4.8)
    if (product.rating >= 4.8) {
      score += 10;
    }

    // 5. Wishlist signal (+15 if item is in wishlist)
    if (wishlistProductIds.includes(product.id)) {
      score += 15;
      mainReason = "Saved in your wishlist";
    }

    return {
      product,
      score,
      reason: mainReason,
    };
  });

  // Sort descending by recommendation score
  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, limit);
}

export async function fetchSmartPicks(
  signals: UserSignals,
  limit: number = 4
): Promise<SmartPickRecommendation[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return generateSmartPicks(signals, limit);
}
