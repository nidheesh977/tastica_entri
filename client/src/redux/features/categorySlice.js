import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
  name: "categories",
  initialState: null,
  reducers: {
    addCategoryData: (_, action) => action.payload,
  },
});

export const { addCategoryData } = categorySlice.actions;
export default categorySlice.reducer;
