import productModel from "../../model/productModel.js";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter.js";
import { updateProductValidation } from "../../utils/joiValidation.js";


export const updateProduct = async (req, res) => {
  try {
    const { error, value } = updateProductValidation.validate(req.body);

    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    const { id } = req.params;
    const { productName, quantity, barcodeNumber, costPrice, sellingPrice, costPriceProfit, discount, category, productTax, loyaltyRate } = value;


    if (sellingPrice === 0 && costPrice === 0) {
      return res.status(400).json({ success: false, message: "Selling price and cost price cannot be 0", });
    }

    if (sellingPrice > 0 && costPrice > 0) {
      return res.status(400).json({ success: false, message: "You can only add one price rate" });
    }

    if (costPrice > 0 && costPriceProfit === 0) {
      return res.status(400).json({ success: false, message: "Cost price profit cannot be empty" })
    }


    const productExist = await productModel.findById(id);

    if (!productExist) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    let costProfitSum

    if (costPrice > 0) {
      costProfitSum = costPrice * (parseFloat(costPriceProfit) / 100)
    }
    const lowerCaseproductName = capitalizeFirstLetter(productName)

    const addCostPrice = costPrice === productExist.costPrice ? costPrice : costPrice + costProfitSum

    const updatedProduct = await productModel.findByIdAndUpdate(id, {
      productName: lowerCaseproductName,
      quantity,
      costPrice: parseFloat(addCostPrice).toFixed(2),
      sellingPrice,
      discount,
      category,
      costPriceProfit: costPriceProfit,
      productTax,
      loyaltyRate,
      barcodeNumber
    },
      { new: true }
    );

    res.status(200).json({ success: true, message: "Product updated successfully", data: updatedProduct });
  } catch (error) {

    return res.status(500).json({ success: false, message: "internal server error" });
  }
};
