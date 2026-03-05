
import { createSlice } from "@reduxjs/toolkit"
import { calculateInvoice } from "../../utils/calculateInvoice";



export const customInvoiceProductTableSlice = createSlice({
    name: "customInvoiceProductTable",
    initialState: {
        activeRowIndex: null,
        taxes: [],
        rows: [
            {
                id: 1,
                row: 1,
                itemName: "",
                description: "",
                quantity: 0,
                rate: 0,
                discountValue: 0,
                tax: null,
                amount: 0,
                isNew: true,
                taxRate: 0,
                taxId: null,
                baseAmount: 0,
                discountType: "percentage",
                discountTypeValid: "percentage",
            }
        ],

        subTotal: 0,
        totalTax: 0,
        shipping: 0,
        adjustment: 0,
        roundOff: 0,
        grandTotal: 0,
        shippingAmount: 0,
        adjustmentAmount: 0
    },
    reducers: {
        addActiveRowIndex: (state, action) => {
            state.activeRowIndex = action.payload
        },

        setRows: (state, action) => {
            const { selectProduct } = action.payload;

            state.rows[state.activeRowIndex] = {
                ...state.rows[state.activeRowIndex],
                id: Date.now(),
                itemName: selectProduct.productName,
                quantity: 1,
                description: "",
                rate: selectProduct.rate,
                discountValue: 0,
                tax: 0,
                discountType: "percentage",
                discountTypeValid: "percentage",
                amount: selectProduct.rate,
            };

            const lastRow = state.rows.at(-1);

            if (!lastRow || lastRow.itemName !== "") {
                state.rows.push({
                    id: null,
                    itemName: "",
                    quantity: 0,
                    description: "",
                    rate: 0,
                    discountValue: 0,
                    tax: 0,
                    amount: 0,
                    baseAmount: 0,
                    discountType: "percentage",
                    discountTypeValid: "percentage"
                });
            }

            state.rows.forEach((row, index) => {
                row.row = index + 1;
            });

            calculateInvoice(state)
        },

        addRow: (state, action) => {
            state.rows.push(action.payload)
        },
        updateTax: (state, action) => {
            const { index, taxName, taxRate, taxId } = action.payload
            if (state.rows[index]) {
                state.rows[index] = {
                    ...state.rows[index],
                    tax: `${taxName} [${taxRate}%]`,
                    taxRate: taxRate,
                    taxId: taxId
                }
                calculateInvoice(state)
            }
        },
        updateNonTax: (state, action) => {
            const { index } = action.payload
            if (state.rows[index]) {
                state.rows[index] = {
                    ...state.rows[index],
                    tax: "Non-Taxable",
                    taxRate: 0,
                    taxId: null
                }
                calculateInvoice(state)
            }
        },
        removeRow: (state, action) => {
            const { productId } = action.payload;

            state.rows = state.rows.filter((row) => row.id !== productId)
            calculateInvoice(state)
        },
        addDescription: (state, action) => {
            const { description, index } = action.payload
            if (state.rows[index]) {
                state.rows[index] = {
                    ...state.rows[index],
                    description: description
                }

            }
        },
        addQuantity: (state, action) => {
            const { quantity, index } = action.payload
            const isNegativeQty = Number(quantity) < 0 ? 1 : Number(quantity)
            const isNegativeAmt = Number(quantity) < 0 ? 0.0 : state.rows[index].rate * Number(quantity)
            if (state.rows[index]) {
                state.rows[index] = {
                    ...state.rows[index],
                    quantity: isNegativeQty,
                    amount: isNegativeAmt
                }
                calculateInvoice(state)
            }

        }, addDiscount: (state, action) => {
            const { discountAmt, index } = action.payload
            const isNegativeAmt = Number(discountAmt) < 0 ? 0 : Number(discountAmt)
            if (state.rows[index]) {
                state.rows[index] = {
                    ...state.rows[index],
                    discountValue: isNegativeAmt,
                    tax: "Select Tax",
                    taxRate: 0,
                    taxId: null
                }
            }
            calculateInvoice(state)
        },
        addDiscountType: (state, action) => {
            const { discountType, index } = action.payload

            if (state.rows[index]) {
                state.rows[index] = {
                    ...state.rows[index],
                    discountType: discountType,
                    discountTypeValid: discountType
                }
            }
            calculateInvoice(state)

        },

        addShippingCharge: (state, action) => {
            const { shippingCharge } = action.payload
            state.shipping = shippingCharge
            calculateInvoice(state)
        },
        addAdjustmentAmount: (state, action) => {
            const { adjustmentAmount } = action.payload

            state.adjustment = adjustmentAmount
            calculateInvoice(state)
        }

    }
})

export const { addRow,
    setRows,
    updateTax,
    updateNonTax,
    removeRow,
    addDescription,
    addActiveRowIndex,
    addQuantity,
    addDiscount,
    addDiscountType,
    addShippingCharge,
    addAdjustmentAmount } = customInvoiceProductTableSlice.actions

export default customInvoiceProductTableSlice.reducer