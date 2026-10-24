import { describe, it, expect } from "vitest";
import { generateSmartPicks } from "@/lib/api/recommendations";

describe("Smart Picks Recommendation Engine", () => {
  it("should return fallback picks when user has no browsing signals", () => {
    const picks = generateSmartPicks({
      cartProductIds: [],
      wishlistProductIds: [],
      recentlyViewedIds: [],
    });

    expect(picks.length).toBeGreaterThan(0);
    expect(picks[0].reason).toContain("essential");
  });

  it("should score category-matched items higher when user has cart signals", () => {
    // Seed signal: User added an audio product 'nova-02'
    const picks = generateSmartPicks({
      cartProductIds: ["nova-02"],
      wishlistProductIds: [],
      recentlyViewedIds: [],
    });

    expect(picks.length).toBeGreaterThan(0);
    // Should exclude the item already in cart
    expect(picks.some((p) => p.product.id === "nova-02")).toBe(false);
    // Highest ranked pick should align with audio or related aesthetic
    expect(picks[0].score).toBeGreaterThan(20);
  });
});
