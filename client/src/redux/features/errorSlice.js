import { createSlice } from "@reduxjs/toolkit";

export const errorSlice = createSlice({
  name: "error",
  initialState: null,
  reducers: {
    storeError: (_, action) => action.payload,
  },
});

export const { storeError } = errorSlice.actions;
export default errorSlice.reducer;
