import productModel from "../../model/productModel.js";
import { generateProductId } from "../../utils/generateProductId.js";
import {newProductValidation,updateProductValidation} from "../../utils/joiValidation.js";

// ---------------------------------------- Create a new product -------------------------------------------

export const createProduct = async (req, res) => {
  try {
    // body validation
    const { error, value } = newProductValidation.validate(req.body);

        if(error){
            return res.status(400).json({success:false,message: error.details[0].message });
        }
       
        const { productName, quantity, costPrice,unit, sellingPrice,costPriceProfit, discount, category ,discountType } = value;
        const {id,countryName,currencyCode} = req.shop;
   

   
        const lowerCaseproductName = productName.trim().toLowerCase()
 
        const productExist = await productModel.findOne({shop:id, productName:lowerCaseproductName})

        if(productExist){
            return res.status(400).json({success:false,message:"Product already exists"})
        }

        if(sellingPrice === 0 && costPrice === 0){
          return res.status(400).json({success:false,message:"Selling price and cost price cannot be 0"})
      }

      if(sellingPrice > 0  && costPrice > 0){
          return res.status(400).json({success:false,message:"You can only add one price rate"})
      }
      
       let costProfitSum

       if(costPrice > 0){
          costProfitSum = costPrice * (costPriceProfit / 100)
       }

        const addCostPrice = costPrice === 0 ? costPrice : costPrice + costProfitSum
       
        //  generating unique ID for customers 
             let productId;
       
             do {
              productId = generateProductId()
             } while (await productModel.findOne({product_id:productId}));
       
        const newProduct = new productModel({
            product_id: productId,
            productName:lowerCaseproductName,
            quantity,
            costPrice:addCostPrice,
            sellingPrice:sellingPrice,
            discount,
            category,
            shop:id,
            countryName,
            currencyCode,
            discountType,
            unit,
            costPriceProfit:costPriceProfit
        });

        await newProduct.save()

         res.status(201).json({ success: true, message: "Product created successfully", data:newProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
  }
 
// ---------------------------------------- Delete product ---------------------------------------------------

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const productExist = await productModel.findById(id);

    if (!productExist) {
      return res.status(400).json({ success: false, message: "Product not found" });
    }

    await productModel.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "internal server error" });
  }
};

// ------------------------------------------ Update product ------------------------------------------------

export const updateProduct = async (req, res) => {
  try {
    const { error, value } = updateProductValidation.validate(req.body);
  console.log(typeof value.costPrice)
  console.log( value)
    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    const { id } = req.params;
    const { productName , quantity , costPrice ,  sellingPrice , costPriceProfit , discount , category } = value;

    console.log(costPrice)

    if (sellingPrice === 0 && costPrice === 0) {
      return res.status(400).json({success: false,message: "Selling price and cost price cannot be 0",});
    }

    if (sellingPrice > 0 && costPrice > 0) {
      return res.status(400).json({ success: false, message: "You can only add one price rate" });
    }

    if(costPrice > 0 && costPriceProfit === 0){
      return res.status(400).json({success:false,message:"Cost price profit cannot be empty"})
    }


    const productExist = await productModel.findById(id);

    if (!productExist) {
      return res.status(400).json({ success: false, message: "Product not found" });
    }



     let costProfitSum

     
        if(costPrice > 0){
          costProfitSum = costPrice * (parseFloat(costPriceProfit) / 100)
       }

       
        const addCostPrice = costPrice === productExist.costPrice ? costPrice : costPrice + costProfitSum
 
    const updatedProduct = await productModel.findByIdAndUpdate(id,{
        productName,
        quantity,
        costPrice:parseFloat(addCostPrice).toFixed(2),
        sellingPrice,
        discount,
        category,
        costPriceProfit:costPriceProfit,
      },
      { new: true }
    ); 

    res.status(200).json({success: true,message: "Product updated successfully",data: updatedProduct});
  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, message: "internal server error" });
  }
};

// ----------------------------------------- Get category product -------------------------------------------------

export const getCategoryProducts = async (req, res) => {
  try {
    const { categoryId } = req.query;
    const {id} = req.shop;
    
    const fetchProduct = await productModel.find({ category: categoryId,shop:id })
      .sort({ createdAt: -1 })
      .populate("category");

       if(!fetchProduct){
            return res.status(400).json({success:false,message:"Product not found"})
        }
 
         res.status(200).json({success:true,message:"Product fetched successfully",data:fetchProduct})
       
    }catch(error){
       return res.status(500).json({success:false,message:"internal server error"})
    }
}

export const getAllProducts = async (req,res) => {
    try{

      const {id} =req.shop;

        const getProducts = await productModel.find({shop:id}).sort({createdAt:-1}).populate("category");

        res.status(200).json({success:true,message:"Product fetched successfully",data:getProducts});
    }catch{
       return res.status(500).json({success:false,message:"internal server error"})
    }
}; 

// for testing purpose only
export const productListTest = (req, res) => {
  res
    .status(200)
    .json({ success: true, message: "Product fetched successfully" });
};

export const productListTestforAdmin = (req, res) => {
  res
    .status(200)
    .json({ success: true, message: "Product fetched successfully" });
};
