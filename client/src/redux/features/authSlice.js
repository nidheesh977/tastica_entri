import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    superAdminData: null,
    adminData: null,
    staffData: null,
    shopData: null
  },
  reducers: {
    addSuperAdminData: (state, action) => {
      state.superAdminData = action.payload;
    },
    removeSuperAdminData: (state, _) => {
      state.superAdminData = null;
    },
    addAdminData: (state, action) => {
      state.adminData = action.payload;
    },
    removeAdminData: (state, _) => {
      state.adminData = null;
    },
    addStaffData: (state, action) => {
      state.staffData = action.payload;
    },
    removeStaffData: (state, _) => {
      state.staffData = null;
    },
    addShopData: (state, action) => {
      state.shopData = action.payload;
    },
    removeShopData: (state, _) => {
      state.shopData = null;
    },
  },
});

export const {
  addSuperAdminData,
  removeSuperAdminData,
  addAdminData,
  removeAdminData,
  addStaffData,
  removeStaffData,
  addShopData,
  removeShopData
} = authSlice.actions;
export default authSlice.reducer;
