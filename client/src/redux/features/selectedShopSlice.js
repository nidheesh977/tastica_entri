import { createSlice } from "@reduxjs/toolkit";

export const selectedShopSlice = createSlice({
  name: "selectedShopId",
  initialState: '684913584d322d733235e0ac',
  reducers: {
    saveSelectedShopId: (_, action) => {
      return action.payload;
    },
  },
});

export const { saveSelectedShopId } = selectedShopSlice.actions;
export default selectedShopSlice.reducer;
