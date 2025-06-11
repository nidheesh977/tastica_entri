import { createSlice } from "@reduxjs/toolkit";

export const quantitySlice = createSlice({
  name: "toggleQuantity",
  initialState: { toggleQuantity: false },
  reducers: {
    toggleQuantityHandler: (state) => {
      state.toggleQuantity = !state.toggleQuantity;
    },
  },
});

export const { toggleQuantityHandler } = quantitySlice.actions;
export default quantitySlice.reducer;
