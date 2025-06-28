import { createSlice } from "@reduxjs/toolkit";

export const customInvoiceSlice = createSlice({
  name: "customInvoice",
  initialState: null,
  reducers: {
    saveCustomInvoiceData: (_, action) => {
      return action.payload;
    },
    clearCustomInvoiceData: () => {
      return null;
    },
  },
});

export const { saveCustomInvoiceData, clearCustomInvoiceData } =
  customInvoiceSlice.actions;
export default customInvoiceSlice.reducer;
