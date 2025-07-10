import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import sidebarReducer from "./features/sidebarSlice";
import searchReducer from "./features/searchSlice";
import categoryReducer from "./features/categorySlice";
import invoiceReducer from "./features/invoiceSlice";
import singleInvoiceReducer from "./features/singleInvoiceSlice";
import singleInvoiceOpenOrderReducer from "./features/singleInvoiceOpenOrderSlice";
import toggleCustomProductReducer from "./features/customProductSlice";
import quantityReducer from "./features/quantitySlice";
import selectedShopReducer from "./features/selectedShopSlice";
import errorReducer from "./features/errorSlice";
import customInvoiceReducer  from "./features/customInvoiceSlice";
import  latestPaidInvoiceReducer  from "./features/latestPaidInvoiceSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    sidebar: sidebarReducer,
    search: searchReducer,
    category: categoryReducer,
    invoice: invoiceReducer,
    singleInvoice: singleInvoiceReducer,
    singleInvoiceOpenOrder: singleInvoiceOpenOrderReducer,
    toggleCustomProduct: toggleCustomProductReducer,
    toggleQuantity: quantityReducer,
    selectedShopId: selectedShopReducer,
    error: errorReducer,
    customInvoice: customInvoiceReducer,
    latestPaidInvoice: latestPaidInvoiceReducer
  },
});
