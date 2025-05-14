import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import sidebarReducer from "./features/sidebarSlice";
import searchReducer from "./features/searchSlice";
import categoryReducer from "./features/categorySlice";
import invoiceReducer from "./features/invoiceSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    sidebar: sidebarReducer,
    search: searchReducer,
    category: categoryReducer,
    invoice: invoiceReducer,
  },
});
