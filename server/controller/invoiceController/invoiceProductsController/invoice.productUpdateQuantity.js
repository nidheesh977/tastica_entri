import customProductModel from "../../../model/customProductModel.js";
import invoiceModel, { checkObjectId } from "../../../model/invoiceModel.js";
import productModel from "../../../model/productModel.js";
import { calculateDiscount } from "../../../utils/calculateDiscount.js";
import { calculateInvoiceTotal } from "../../../utils/calculateInvoice.js";
import { productPriceTotalCalculate } from "../../../utils/productPriceTotalCalculate.js";
import { caluculateTax } from "../../../utils/productTaxCalculate.js";


export const productQuantityUpdate = async (req, res) => {
    try {
        const { invoiceId } = req.params;
        const { productId, quantity } = req.body;



        if (!invoiceId) {
            return res.status(400).json({ success: false, message: "Invoice ID not get" })
        }


        if (invoiceId === "undefined") {
            return res.status(400).json({ success: false, message: "Create invoice" })
        }



        if (!productId) {
            return res.status(400).json({ success: false, message: "Product ID not get" })
        }

        if (!quantity) {
            return res.status(400).json({ success: false, message: "Quantity not get" })
        }

        const existInvoice = await invoiceModel.findById(invoiceId);

        if (!existInvoice) {
            return res.status(400).json({ success: false, message: "No Invoice" })
        }

        if (existInvoice.paymentStatus === "success") {
            return res.status(400).json({ success: false, message: "Invoice already paid" })
        }



        let fieldName;

        if (checkObjectId(productId)) {
            fieldName = "_id"
        } else {
            fieldName = "barcodeNumber"
        }

        // This variable for the product is exist
        let productExist;


        productExist = await productModel.findOne({ [fieldName]: productId })


        if (!productExist) {
            productExist = await customProductModel.findOne({ [fieldName]: productId })
        }

        if (!productExist) {
            return res.status(404).json({ success: false, message: "Product not found" })
        }

        if (quantity > productExist.quantity) {
            return res.status(400).json({ success: false, message: "Requested quantity exceeds available stock" })
        }

        let findProductInArr;
        if (fieldName === "_id") {
            findProductInArr = "productId"
        } else {
            findProductInArr = "barcodeNumber"
        }


        let findInvoiceProduct = existInvoice.products.find(item => item[findProductInArr].toString() === productId.toString())

        const { productTotalPrice } = productPriceTotalCalculate(productExist, quantity)

        if (quantity > findInvoiceProduct.quantity) {


            // calculate discount
            const calculateDiscountAmount = calculateDiscount(productTotalPrice, findInvoiceProduct.discountType, findInvoiceProduct.discountFromProduct, findInvoiceProduct.discountFromCategory, quantity)

            const calculateTaxAmount = caluculateTax(productTotalPrice, findInvoiceProduct.taxRate)

            const { discountAmount, subTotalAmount, addTaxToTotalAmt, taxAmountAfterUpdateQty } = calculateInvoiceTotal(calculateDiscountAmount, existInvoice, findInvoiceProduct, productTotalPrice, calculateTaxAmount)



            const updatedQuantity = await invoiceModel.findOneAndUpdate({ _id: invoiceId, "products._id": findInvoiceProduct._id }, {
                $set: {
                    "products.$.quantity": quantity,
                    "products.$.total": productTotalPrice,
                    "products.$.productDiscount": parseFloat(calculateDiscountAmount).toFixed(2),
                    "products.$.taxAmount": parseFloat(calculateTaxAmount).toFixed(2),
                    totalDiscount: parseFloat(discountAmount).toFixed(2),
                    subTotal: parseFloat(subTotalAmount).toFixed(2),
                    totalAmount: parseFloat(addTaxToTotalAmt).toFixed(2),
                    totalTax: parseFloat(taxAmountAfterUpdateQty).toFixed(2)

                }
            }, { new: true })

            res.status(200).json({ success: true, message: "Quantity Updated", data: updatedQuantity })
        }

        else if (quantity < findInvoiceProduct.quantity) {


            // calculate discount
            const calculateDiscountAmount = calculateDiscount(productTotalPrice, findInvoiceProduct.discountType, findInvoiceProduct.discountFromProduct, findInvoiceProduct.discountFromCategory, quantity)

            const calculateTaxAmount = caluculateTax(productTotalPrice, findInvoiceProduct.taxRate)

            const { discountAmount, subTotalAmount, addTaxToTotalAmt, taxAmountAfterUpdateQty } = calculateInvoiceTotal(calculateDiscountAmount, existInvoice, findInvoiceProduct, productTotalPrice, calculateTaxAmount)


            const updatedQuantity = await invoiceModel.findOneAndUpdate({ _id: invoiceId, "products._id": findInvoiceProduct._id }, {
                $set: {
                    "products.$.quantity": quantity,
                    "products.$.total": productTotalPrice,
                    "products.$.productDiscount": parseFloat(calculateDiscountAmount).toFixed(2),
                    "products.$.taxAmount": parseFloat(calculateTaxAmount).toFixed(2),
                    totalDiscount: parseFloat(discountAmount).toFixed(2),
                    subTotal: parseFloat(subTotalAmount).toFixed(2),
                    totalAmount: parseFloat(addTaxToTotalAmt).toFixed(2),
                    totalTax: parseFloat(taxAmountAfterUpdateQty).toFixed(2)
                }
            }, { new: true })


            return res.status(200).json({ success: true, message: "Quantity updated", data: updatedQuantity })
        }
        else if (findInvoiceProduct?.customProduct === true) {

            return res.status(400).json({ success: false, message: "Custom product cannot be change quantity" })

        }


    } catch (error) {
        console.log(error);

        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}