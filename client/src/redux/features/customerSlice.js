import { createSlice } from "@reduxjs/toolkit";

export const customerSlice = createSlice({
  name: "customers",
  initialState: null,
  reducers: {
    addCustomerData: (_, action) => action.payload,
  },
});

export const { addCustomerData } = customerSlice.actions;
export default customerSlice.reducer;
