import { AppError } from "./AppError.js";


const round2 = (num) => Number(num.toFixed(2))


export const calculateTax = (amount, rate, type) => {

    if (typeof amount === "string" || amount < 0) {
        throw new AppError("Invalid tax amount")
    }

    if (typeof rate === "string" || rate < 0) {
        throw new AppError("Invalid tax rate")
    }


    switch (type) {
        case "exclusive": {
            const tax = round2((amount * rate) / 100)

            return {
                baseAmount: amount,
                taxAmount: tax,
                totalAmount: round2(amount + tax)
            }

        }

        case "inclusive": {
            const tax = round2((amount * rate) / (100 + rate))

            return {
                baseAmount: round2(amount - tax),
                taxAmount: tax,
                totalAmount: round2(amount)
            }
        }

        default: {
            throw new AppError("Invalid tax type", 400)
        }

    }



}