import { createSlice } from "@reduxjs/toolkit";

export const customProductSlice = createSlice({
  name: "toggleCustomProduct",
  initialState: { toggleCustomProduct: false },
  reducers: {
    toggleCustomProductHandler: (state, _) => {
      state.toggleCustomProduct = !state.toggleCustomProduct;
    },
  },
});

export const { toggleCustomProductHandler } = customProductSlice.actions;
export default customProductSlice.reducer;
