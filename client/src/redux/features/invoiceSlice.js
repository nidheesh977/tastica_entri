import { createSlice } from "@reduxjs/toolkit";

export const invoiceSlice = createSlice({
  name: "invoice",
  initialState: null,
  reducers: {
    saveInvoiceData: (_, action) => {
      return action.payload;
    },
    clearInvoiceData: () => {
      return null
    }
  },
});

export const { saveInvoiceData, clearInvoiceData } = invoiceSlice.actions;
export default invoiceSlice.reducer;
