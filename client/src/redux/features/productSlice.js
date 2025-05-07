import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "products",
  initialState: null,
  reducers: {
    addProductData: (_, action) => action.payload,
  },
});

export const { addProductData } = productSlice.actions;
export default productSlice.reducer;
