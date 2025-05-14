import { createSlice } from "@reduxjs/toolkit";

export const invoiceSlice = createSlice({
  name: "invoice",
  initialState: null,
  reducers: {
    saveInvoiceData: (_, action) => {
      return action.payload;
    },
  },
});

export const { saveInvoiceData } = invoiceSlice.actions;
export default invoiceSlice.reducer;
