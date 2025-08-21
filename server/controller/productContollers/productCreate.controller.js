import productModel from "../../model/productModel.js";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter.js";
import { generateProductId } from "../../utils/generateId.js";
import { newProductValidation } from "../../utils/joiValidation.js";

export const createProduct = async (req, res) => {
    try {
        // body validation
        const { error, value } = newProductValidation.validate(req.body);

        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }

        const { productName,
            quantity,
            costPrice, unit,
            sellingPrice,
            costPriceProfit,
            discount,
            category,
            discountType,
            barcodeNumber } = value;

        const { id, countryName, currencyCode } = req.shop;



        const lowerCaseproductName = capitalizeFirstLetter(productName)

        const productExist = await productModel.findOne({ shop: id, productName: lowerCaseproductName })

        if (productExist) {
            return res.status(400).json({ success: false, message: "Product already exists" })
        }

        if (sellingPrice === 0 && costPrice === 0) {
            return res.status(400).json({ success: false, message: "Selling price and cost price cannot be 0" })
        }

        if (sellingPrice > 0 && costPrice > 0) {
            return res.status(400).json({ success: false, message: "You can only add one price rate" })
        }

        // This only for costPrice
        let costProfitSum

        if (costPrice > 0) {
            costProfitSum = costPrice * (costPriceProfit / 100)
        }

        const addCostPrice = costPrice === 0 ? costPrice : costPrice + costProfitSum

        //  generating unique ID for products
        let productId = await generateProductId(id)


        const newProduct = new productModel({
            product_id: productId,
            productName: lowerCaseproductName,
            quantity,
            costPrice: addCostPrice,
            sellingPrice: sellingPrice,
            discount,
            category,
            shop: id,
            countryName,
            currencyCode,
            discountType,
            unit,
            costPriceProfit: costPriceProfit,
            barcodeNumber
        });

        await newProduct.save()

        res.status(201).json({ success: true, message: "Product created successfully", data: newProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
