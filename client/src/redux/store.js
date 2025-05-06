import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import sidebarReducer from "./features/sidebarSlice";
import categoryReducer from "./features/categorySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    sidebar: sidebarReducer,
    categories: categoryReducer,
  },
});
