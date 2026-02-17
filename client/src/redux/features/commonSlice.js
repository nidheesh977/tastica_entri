import { createSlice } from "@reduxjs/toolkit"




export const commonSlice = createSlice({
    name: "common",
    initialState: {
        isBlur: false,
        expenseAccountId: null,
        openExpenseAccForm: false,
        openExpenseSubTitleForm: false,
        openTaxRateForm: false,
        openVendorForm: false
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
        }
    }
})

export const {
    addBackgroundBlur,
    removeBackgroundBlur,
    addExpenseAccountId,
    setOpenExpenseAccount,
    setCloseExpenseAccount,
    setOpenExpenseSubTitleForm,
    setCloseExpenseSubTitleForm,
    setOpenTaxRateForm,
    setCloseTaxRateForm,
    setOpenVendorForm,
    setCloseVendorForm

} = commonSlice.actions

export default commonSlice.reducer