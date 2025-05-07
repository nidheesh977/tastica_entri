import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import sidebarReducer from "./features/sidebarSlice";
import categoryReducer from "./features/categorySlice";
import productReducer from "./features/productSlice";
import customerReducer from './features/customerSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    sidebar: sidebarReducer,
    categories: categoryReducer,
    products: productReducer,
    customers: customerReducer
  },
});
