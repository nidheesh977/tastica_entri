import invoiceModel from "../../../model/invoiceModel.js";
import { calculateDiscount } from "../../../utils/calculateDiscount.js";
import { calculateInvoiceTotal } from "../../../utils/calculateInvoice.js";
import { caluculateTax } from "../../../utils/productTaxCalculate.js";

export const addProductDiscountInPOS = async (req, res) => {
    try {
        const { invoiceId } = req.params;

        const { productId, manualDiscount } = req.body;


        if (!invoiceId) {
            return res.status(400).json({ success: false, message: "Invoice ID not get" })
        }

        if (!productId) {
            return res.status(400).json({ success: false, message: "Product Id not get" })
        };



        const regex = /^\d+$/

        const isNumber = regex.test(Number(parseFloat(manualDiscount)))

        if (!isNumber) {
            return res.status(400).json({ success: false, message: "Enter valid  Number" })
        }

        if (manualDiscount < 0) {
            return res.status(400).json({ success: false, message: "Amount canoot be negative" })
        }

        const manualDiscountAmount = parseFloat(manualDiscount)

        const findInvoice = await invoiceModel.findById(invoiceId)

        const findProducFromInvoice = findInvoice.products.find(item => item._id.toString() === productId.toString())



        if (manualDiscount > findProducFromInvoice?.total) {
            return res.status(400).json({ success: false, message: "Too much discount" })
        }


        if (manualDiscountAmount > 0) {

            const productPrice = findProducFromInvoice?.total;

            const deductProductPrice = productPrice + findProducFromInvoice?.manualDiscount - manualDiscountAmount;


            const calculateDiscountAmount = calculateDiscount(deductProductPrice, findProducFromInvoice.discountType, findProducFromInvoice.discountFromProduct, findProducFromInvoice.discountFromCategory, findProducFromInvoice.quantity)

            const calculateTaxAmount = caluculateTax(deductProductPrice, findProducFromInvoice.taxRate)

            const { discountAmount, subTotalAmount, addTaxToTotalAmt, taxAmountAfterUpdateQty } = calculateInvoiceTotal(calculateDiscountAmount, findInvoice, findProducFromInvoice, deductProductPrice, calculateTaxAmount)


            const updatedQuantity = await invoiceModel.findOneAndUpdate({ _id: invoiceId, "products._id": findProducFromInvoice._id }, {
                $set: {
                    "products.$.total": parseFloat(deductProductPrice).toFixed(2),
                    "products.$.productDiscount": parseFloat(calculateDiscountAmount).toFixed(2),
                    "products.$.taxAmount": parseFloat(calculateTaxAmount).toFixed(2),
                    "products.$.manualDiscount": parseFloat(manualDiscountAmount).toFixed(2),
                    totalDiscount: parseFloat(discountAmount).toFixed(2),
                    subTotal: parseFloat(subTotalAmount).toFixed(2),
                    totalAmount: parseFloat(addTaxToTotalAmt).toFixed(2),
                    totalTax: parseFloat(taxAmountAfterUpdateQty).toFixed(2)

                }
            }, { new: true })

            res.status(200).json({ success: true, message: "Discount added successfully", data: updatedQuantity })
        }

        else if (manualDiscountAmount < findProducFromInvoice.manualDiscount) {



            const productPrice = findProducFromInvoice?.manualDiscount;

            const addProductPrice = findProducFromInvoice.total + productPrice;


            const calculateDiscountAmount = calculateDiscount(addProductPrice, findProducFromInvoice.discountType, findProducFromInvoice.discountFromProduct, findProducFromInvoice.discountFromCategory, findProducFromInvoice.quantity)

            const calculateTaxAmount = caluculateTax(addProductPrice, findProducFromInvoice.taxRate)

            const { discountAmount, subTotalAmount, addTaxToTotalAmt, taxAmountAfterUpdateQty } = calculateInvoiceTotal(calculateDiscountAmount, findInvoice, findProducFromInvoice, addProductPrice, calculateTaxAmount)


            const updatedQuantity = await invoiceModel.findOneAndUpdate({ _id: invoiceId, "products._id": findProducFromInvoice._id }, {
                $set: {
                    "products.$.total": parseFloat(addProductPrice).toFixed(2),
                    "products.$.productDiscount": parseFloat(calculateDiscountAmount).toFixed(2),
                    "products.$.taxAmount": parseFloat(calculateTaxAmount).toFixed(2),
                    "products.$.manualDiscount": parseFloat(manualDiscountAmount).toFixed(2),
                    totalDiscount: parseFloat(discountAmount).toFixed(2),
                    subTotal: parseFloat(subTotalAmount).toFixed(2),
                    totalAmount: parseFloat(addTaxToTotalAmt).toFixed(2),
                    totalTax: parseFloat(taxAmountAfterUpdateQty).toFixed(2)

                }
            }, { new: true })

            res.status(200).json({ success: true, message: "Discount added successfully", data: updatedQuantity })
        };






    } catch (error) {

        return res.status(500).json({ success: false, message: "Internal server errort" })
    }
}