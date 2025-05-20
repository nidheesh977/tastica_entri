import { createSlice } from "@reduxjs/toolkit";

export const singleInvoiceOpenOrderSlice = createSlice({
  name: "singleInvoiceOpenOrder",
  initialState: null,
  reducers: {
    saveSingleInvoiceOpenOrder: (_, action) => {
      return action.payload;
    },
    clearSingleInvoiceOpenOrder: () => {
      return null;
    },
  },
});

export const { saveSingleInvoiceOpenOrder, clearSingleInvoiceOpenOrder } =
  singleInvoiceOpenOrderSlice.actions;
export default singleInvoiceOpenOrderSlice.reducer;
