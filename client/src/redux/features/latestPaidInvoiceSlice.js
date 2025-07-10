import { createSlice } from "@reduxjs/toolkit";

export const latestPaidInvoiceSlice = createSlice({
  name: "latestPaidInvoice",
  initialState: null,
  reducers: {
    saveLatestPaidInvoiceData: (_, action) => {
      return action.payload;
    },
  },
});

export const { saveLatestPaidInvoiceData } = latestPaidInvoiceSlice.actions;
export default latestPaidInvoiceSlice.reducer;
