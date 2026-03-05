import { current } from "@reduxjs/toolkit"


export const calculateInvoice = (state) => {




    const mergeTax = Object.values(
        state.rows.reduce((acc, curr) => {

            if (!curr.tax || curr.tax === "Select Tax") return acc

            const taxableAmount =
                curr.taxableAmount ?? curr.amount

            const taxAmount =
                curr.taxAmount ?? ((taxableAmount * curr.taxRate) / 100)

            console.log(taxableAmount);
            if (!acc[curr.tax]) {
                acc[curr.tax] = {
                    taxCodeName: curr.tax,
                    rate: 0,
                    taxableAmount: 0,
                    totalTaxAmount: 0
                }
            }
            acc[curr.tax].rate = curr.taxRate
            acc[curr.tax].taxableAmount += taxableAmount
            acc[curr.tax].totalTaxAmount += taxAmount

            return acc

        }, {})
    )

    state.taxes = mergeTax



    state.rows.forEach((row) => {
        const baseAmount = row.quantity * row.rate

        let discountAmount = 0

        if (row.discountType === "percentage") {
            discountAmount = (baseAmount * (Number(row.discountValue) || 0)) / 100
        } else {
            discountAmount = Number(row.discountValue) || 0
        }

        const taxableAmount = baseAmount - discountAmount

        row.baseAmount = baseAmount
        row.discountAmount = discountAmount
        row.amount = taxableAmount
    });

    state.subTotal = state.rows.reduce((sum, r) => sum + r.amount, 0)

    const shippingAmount = Number(state.shipping) || 0
    const adjustmentAmount = Number(state.adjustment) || 0


    state.shippingAmount = shippingAmount
    state.adjustmentAmount = adjustmentAmount

    const totalTax = state.taxes.reduce((current, acc) => current += acc.totalTaxAmount, 0)

    state.totalTax = totalTax


    const beforeRound =
        state.subTotal +
        state.totalTax +
        shippingAmount +
        adjustmentAmount

    const rounded = Math.round(beforeRound)

    state.roundOff = rounded - beforeRound
    state.grandTotal = rounded
}