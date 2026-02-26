import { createSlice } from "@reduxjs/toolkit"




export const commonSlice = createSlice({
    name: "common",
    initialState: {
        isBlur: false,
        expenseAccountId: null,
        vendorIdForStaff: null,
        customCustomerId: null,
        openExpenseAccForm: false,
        openExpenseSubTitleForm: false,
        openTaxRateForm: false,
        openVendorForm: false,
        openVendorStaffForm: false,
    },
    reducers: {
        addBackgroundBlur: (state, action) => {
            state.isBlur = action.payload
        },
        removeBackgroundBlur: (state, action) => {
            state.isBlur = action.payload
        },
        addExpenseAccountId: (state, action) => {
            state.expenseAccountId = action.payload
        },
        setAddVendorId: (state, action) => {
            state.vendorIdForStaff = action.payload
        },
        setOpenExpenseAccount: (state, action) => {
            state.openExpenseAccForm = action.payload
        },
        setCloseExpenseAccount: (state, action) => {
            state.openExpenseAccForm = action.payload
        },
        setOpenExpenseSubTitleForm: (state, action) => {
            state.openExpenseSubTitleForm = action.payload
        },
        setCloseExpenseSubTitleForm: (state, action) => {
            state.openExpenseSubTitleForm = action.payload
        },
        setOpenTaxRateForm: (state, action) => {
            state.openTaxRateForm = action.payload
        },
        setCloseTaxRateForm: (state, action) => {
            state.openTaxRateForm = action.payload
        },
        setOpenVendorForm: (state, action) => {
            state.openVendorForm = action.payload
        },
        setCloseVendorForm: (state, action) => {
            state.openVendorForm = action.payload
        },
        setOpenVendorStaffForm: (state, action) => {
            state.openVendorStaffForm = action.payload
        },
        setCloseVendorStaffForm: (state, action) => {
            state.openVendorStaffForm = action.payload
        },
        setCustomCustomerId: (state, action) => {
            state.customCustomerId = action.payload
        }
    }
})

export const {
    addBackgroundBlur,
    removeBackgroundBlur,
    addExpenseAccountId,
    setAddVendorId,

    setOpenExpenseAccount,
    setCloseExpenseAccount,
    setOpenExpenseSubTitleForm,
    setCloseExpenseSubTitleForm,
    setOpenTaxRateForm,
    setCloseTaxRateForm,
    setOpenVendorForm,
    setCloseVendorForm,

    setOpenVendorStaffForm,
    setCloseVendorStaffForm,

    setCustomCustomerId
} = commonSlice.actions

export default commonSlice.reducer