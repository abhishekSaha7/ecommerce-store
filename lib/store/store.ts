import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "@/features/cart/cartSlice";
import wishlistReducer from "@/features/wishlist/wishlistSlice";
import recentlyViewedReducer from "@/features/recently-viewed/recentlyViewedSlice";
import uiReducer from "@/features/ui/uiSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      cart: cartReducer,
      wishlist: wishlistReducer,
      recentlyViewed: recentlyViewedReducer,
      ui: uiReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
