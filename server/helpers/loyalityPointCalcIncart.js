import invoiceModel from "../model/invoiceModel.js";

export const loyalitCalcultaionInCart = async (invoiceId, redeemAmountAdd, loyalityPoint) => {

    if (redeemAmountAdd <= loyalityPoint) {

        await invoiceModel.findByIdAndUpdate(invoiceId, {
            productLoyaltyRedeemAmt: redeemAmountAdd,
            walletLoyaltyRedeemAmt: 0
        }, { new: true })

    } else if (redeemAmountAdd >= loyalityPoint) {
        let takeExtraAmt = redeemAmountAdd - loyalityPoint;

        await invoiceModel.findByIdAndUpdate(invoiceId, {
            walletLoyaltyRedeemAmt: takeExtraAmt || 0,
            productLoyaltyRedeemAmt: loyalityPoint
        }, { new: true })

    }
}

