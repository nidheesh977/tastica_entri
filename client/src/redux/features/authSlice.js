import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    superAdminData: null,
    adminData: null,
    staffData: null,
    shopData: null,
    permissions: []
  },
  reducers: {
    addSuperAdminData: (state, action) => {
      state.superAdminData = action.payload;
    },
    removeSuperAdminData: (state) => {
      state.superAdminData = null;
    },
    addAdminData: (state, action) => {
      state.adminData = action.payload;
    },
    removeAdminData: (state) => {
      state.adminData = null;
    },
    addStaffData: (state, action) => {
      state.staffData = action.payload;
    },
    removeStaffData: (state) => {
      state.staffData = null;
    },
    addShopData: (state, action) => {
      state.shopData = action.payload;
    },
    removeShopData: (state) => {
      state.shopData = null;
    },
    addAuthPermissions: (state, action) => {
      state.permissions = action.payload
    },
    removeAuthPermissions: (state, action) => {
      state.permissions = []
    }
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
  removeShopData,
  addAuthPermissions,
  removeAuthPermissions
} = authSlice.actions;
export default authSlice.reducer;
