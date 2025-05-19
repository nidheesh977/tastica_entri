import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
  name: "order",
  initialState: null,
  reducers: {
    saveOrderData: (_, action) => {
      return action.payload;
    },
    
  },
});

export const { saveOrderData} = orderSlice.actions;
export default orderSlice.reducer;
