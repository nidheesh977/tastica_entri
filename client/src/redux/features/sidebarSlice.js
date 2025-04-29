import { createSlice } from "@reduxjs/toolkit";

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: {sideBar: false},
  reducers: {
    toggleSideBar: (state, _) => {
      state.sideBar = !state.sideBar},
  },
});

export const { toggleSideBar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
