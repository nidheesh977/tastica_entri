import { createSlice } from "@reduxjs/toolkit";

export const selectedShopSlice = createSlice({
  name: "selectedShopId",
  initialState: null,
  reducers: {
    saveSelectedShopId: (_, action) => {
      return action.payload;
    },
  },
});

export const { saveSelectedShopId } = selectedShopSlice.actions;
export default selectedShopSlice.reducer;
