import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
  name: "categories",
  initialState: null,
  reducers: {
    addCategory: (_, action) => action.payload,
  },
});

export const { addCategory } = categorySlice.actions;
export default categorySlice.reducer;
