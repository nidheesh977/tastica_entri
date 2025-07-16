import invoiceModel from "../model/invoiceModel.js";
import { parseFloatDecimal } from "../utils/parseFloatDecimal.js";

export const loyalitCalcultaionInCart = async (invoiceId, redeemAmountAdd, loyalityPoint) => {

    if (redeemAmountAdd <= loyalityPoint) {
        const redeemAmtToFloat = parseFloatDecimal(redeemAmountAdd)
        await invoiceModel.findByIdAndUpdate(invoiceId, {
            productLoyaltyRedeemAmt: redeemAmtToFloat,
            walletLoyaltyRedeemAmt: 0
        }, { new: true })

    } else if (redeemAmountAdd >= loyalityPoint) {
        let takeExtraAmt = parseFloatDecimal(redeemAmountAdd - loyalityPoint);
        let loyalityToFloat = parseFloatDecimal(loyalityPoint)
        await invoiceModel.findByIdAndUpdate(invoiceId, {
            walletLoyaltyRedeemAmt: takeExtraAmt || 0,
            productLoyaltyRedeemAmt: loyalityToFloat
        }, { new: true })

    }
}

