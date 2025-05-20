import { createSlice } from "@reduxjs/toolkit";

export const singleInvoiceSlice = createSlice({
  name: "singleInvoice",
  initialState: null,
  reducers: {
    saveSingleInvoice: (_, action) => {
      return action.payload;
    },
    clearSingleInvoice: ()=> {
      return null
    }
  },
});

export const { saveSingleInvoice, clearSingleInvoice } = singleInvoiceSlice.actions;
export default singleInvoiceSlice.reducer;
