import { createSlice } from "@reduxjs/toolkit";

export const singleInvoiceSlice = createSlice({
  name: "singleInvoice",
  initialState: null,
  reducers: {
    saveSingleInvoice: (_, action) => {
      return action.payload;
    },
  },
});

export const { saveSingleInvoice } = singleInvoiceSlice.actions;
export default singleInvoiceSlice.reducer;
