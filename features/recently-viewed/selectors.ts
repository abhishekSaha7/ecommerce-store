import { RootState } from "@/lib/store/store";

export const selectRecentlyViewedItems = (state: RootState) => state.recentlyViewed.items;
