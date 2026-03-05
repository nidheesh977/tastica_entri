import customProductModel from "../../model/customProductModel.js";



export const createCustomProductForCustomInvoice = async (req, res, next) => {

    const { id: shopId } = req.shop

    try {
        const {
            productName,
            quantity,
            sellingPrice,
            unit,
            type,
            salesAccount,
            salesDescription,
            salesTaxRule,
            purchasable,
            purchaseTaxRule,
            costPrice,
            purchaseAccount,
            purchaseDescription,
            preferredVendor } = req.body;

        const sellingPriceNum = Number(sellingPrice)
        const purchasePriceNum = Number(costPrice)


        const newCustomProduct = customProductModel({
            productName: productName,
            quantity: 1,
            sellingPrice: sellingPriceNum,
            shop: shopId,
            unit: unit,
            isCustomProduct: true,
            module: "CUSTOM-INVOICE",
            type: type,
            salesAccount: salesAccount,
            salesDescription: salesDescription,
            salesTaxRule: salesTaxRule,
            purchasable: purchasable,
            purchaseTaxRule: purchaseTaxRule,
            costPrice: purchasePriceNum,
            purchaseAccount: purchaseAccount,
            purchaseDescription: purchaseDescription,
            preferredVendor: preferredVendor
        })

        await newCustomProduct.save()

        const data = {
            _id: newCustomProduct._id,
            productName: newCustomProduct.productName,
            rate: newCustomProduct.sellingPrice

        }

        res.status(201).json({ success: true, message: "Custom product create successfully", data: data })

    } catch (error) {
        next(error)
    }
}