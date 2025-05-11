import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "search",
  initialState: "",
  reducers: {
    saveSearchQuery: (_, action) => {
      return action.payload;
    },
  },
});

export const { saveSearchQuery } = searchSlice.actions;
export default searchSlice.reducer;
