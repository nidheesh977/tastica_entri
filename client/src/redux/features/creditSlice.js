import { createSlice } from "@reduxjs/toolkit"

export const creditSlice = createSlice({
    name: "credit",
    initialState: {
        customerName: "",
        creditBookId: null,
        isBlur: false,
        isCreditDataDisplay: false,
        creditBookObjectId: null,
        PaymentCreditBoxOpen: false,
    },
    reducers: {
        addCreditBookData: (state, action) => {
            state.customerName = action.payload.creditCustomerName
            state.creditBookId = action.payload.creditBookId
            state.isCreditDataDisplay = true
        },
        removeCreditBookData: (state) => {
            state.creditBookId = null
            state.customerName = ""
            state.isCreditDataDisplay = false
        },


        addCreditObjectId: (state, action) => {
            state.creditBookObjectId = action.payload
        },

        removeCreditObjectId: (state) => {
            state.creditBookObjectId = null
        },

        openPaymentCreditbox: (state, action) => {
            state.PaymentCreditBoxOpen = action.payload
        }

    }
})

export const { addCreditBookData, removeCreditBookData, addCreditObjectId, removeCreditObjectId, openPaymentCreditbox } = creditSlice.actions

export default creditSlice.reducer;