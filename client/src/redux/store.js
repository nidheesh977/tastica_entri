import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import sidebarReducer from "./features/sidebarSlice";
import searchReducer from "./features/searchSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    sidebar: sidebarReducer,
    search: searchReducer,
  },
});
