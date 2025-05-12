import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
  name: "category",
  initialState: "",
  reducers: {
    saveCategoryId: (_, action) => {
      return action.payload;
    },
  },
});

export const { saveCategoryId } = categorySlice.actions;
export default categorySlice.reducer;
