import { createSlice } from "@reduxjs/toolkit"

export const expenseSlice = createSlice({
    name: "expense",
    initialState: {
        taxAmountShow: null,
        expensePrintData: {
            totalAmount: null,
            createdDate: null,
            billable: null,
            expenseSubTitle: null,
            paidThrough: null,
            taxCode: null,
            taxRate: null,
            taxAmount: null,
            amountIs: null,
            vendor: null,
            notes: null,
            currecnyCode: null

        }
    },
    reducers: {
        setTaxAmountShow: (state, action) => {
            state.taxAmountShow = action.payload
        },
        setExpensePrintData: (state, action) => {
            state.expensePrintData = action.payload
        }
    }
})

export const {
    setTaxAmountShow,
    setExpensePrintData
} = expenseSlice.actions

export default expenseSlice.reducer