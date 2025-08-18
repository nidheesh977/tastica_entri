import categoryModel from "../../../model/categoryModel.js";
import customProductModel from "../../../model/customProductModel.js";
import invoiceModel, { checkObjectId } from "../../../model/invoiceModel.js";
import productModel from "../../../model/productModel.js";
import { calculateDiscount } from "../../../utils/calculateDiscount.js";
import { calculateInvoiceTotal } from "../../../utils/calculateInvoice.js";
import { productPriceTotalCalculate } from "../../../utils/productPriceTotalCalculate.js";
import { caluculateTax } from "../../../utils/productTaxCalculate.js";




export const addProductToInvoice = async (req, res) => {


    try {
        const { invoiceId } = req.params;
        let { productId, quantity } = req.body;


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

        if (quantity < 0) {
            return res.status(400).json({ success: false, message: "Please enter a valid quantity" })
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




        // for get category discount
        const findCategory = await categoryModel.findOne({ _id: productExist?.category })

        const getDiscount = findCategory?.discountRate || 0;

        let findInvoiceProduct = existInvoice.products.some(item => item[findProductInArr].toString() === productId.toString())


        if (findInvoiceProduct) {
            return res.status(400).json({ success: false, message: "This product already added" })
        }


        const { productPrice, productTotalPrice } = productPriceTotalCalculate(productExist, quantity)


        const addProduct = {
            productName: productExist?.productName,
            price: productPrice,
            total: productTotalPrice,
            discountFromProduct: parseFloat(productExist?.discount || 0).toFixed(2),
            discountFromCategory: parseFloat(getDiscount).toFixed(2),
            quantity: parseFloat(quantity).toFixed(2),
            discountType: productExist?.discountType || "percentage",
            productId: productExist._id,
            category: findCategory?.categoryName || "custom product",
            unit: productExist.unit,
            customProduct: productExist?.isCustomProduct || false,
            taxRate: productExist?.productTax || 0,
            loyaltyRate: productExist?.loyaltyRate || 0,
            barcodeNumber: productExist?.barcodeNumber || null,
            manualDiscount: 0
        }




        if (!findInvoiceProduct) {

            // calculate discount
            const totalDiscountAmount = calculateDiscount(addProduct.total, addProduct.discountType, parseFloat(addProduct.discountFromProduct), parseFloat(addProduct.discountFromCategory), addProduct.quantity)

            const calculateTaxAmount = caluculateTax(addProduct.total, addProduct.taxRate)
            //  add discount to Total discount
            const finalDiscountValue = existInvoice?.totalDiscount + parseFloat(totalDiscountAmount);

            //  add subtotal  
            const subTotal = existInvoice.subTotal + productTotalPrice;

            const addTax = existInvoice.totalTax + calculateTaxAmount;

            // substract discount from  total 
            const subTotalReduce = finalDiscountValue > 0 ? subTotal - totalDiscountAmount : subTotal;

            const TotalAmount = finalDiscountValue > 0 ? subTotal - totalDiscountAmount : subTotal;

            const addTaxToTotal = addTax > 0 ? TotalAmount + addTax : TotalAmount

            const newObject = { ...addProduct, productDiscount: parseFloat(totalDiscountAmount).toFixed(2), taxAmount: calculateTaxAmount }
            existInvoice.products.push(newObject);
            existInvoice.set("totalDiscount", parseFloat(finalDiscountValue).toFixed(2))
            existInvoice.set("subTotal", parseFloat(subTotalReduce).toFixed(2))
            existInvoice.set("totalAmount", parseFloat(addTaxToTotal).toFixed(2))
            existInvoice.set("totalTax", parseFloat(addTax).toFixed(2))

            await existInvoice.save();

            res.status(200).json({ success: true, message: "product Added successfully", data: existInvoice })

        }




    } catch (error) {
        console.log(error);

        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}
