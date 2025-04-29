import productModel from "../model/productModel.js";
import { generateProductId } from "../utils/generateProductId.js";
import { newProductValidation } from "../utils/joiValidation.js";


//  Create a new product

export const createProduct = async (req, res) => {
    
    try {

        const {error,value} = newProductValidation.validate(req.body);

        if(error){
            return res.status(400).json({success:false,message: error.details[0].message });
        }

        const { productname, quantity, costprice, sellingprice, discount, category } = value;

        
       
        if(sellingprice === 0 && costprice === 0){
            return res.status(400).json({success:false,message:"Selling price and cost price cannot be 0"})
        }

        if(sellingprice > 0  && costprice > 0){
            return res.status(400).json({success:false,message:"You can only add one price rate"})
        }

        
        const productExist = await productModel.findOne({ productname:productname})

        if(productExist){
            return res.status(400).json({success:false,message:"Product already exists"})
        }

    
       const productId = generateProductId();

       const existProductId = await productModel.findOne({product_id:productId});

       if(existProductId){
        generateProductId()
       }
       
       

        const product = await productModel.create({
            product_id: productId,
            productname,
            quantity,
            costprice,
            sellingprice,
            discount,
            category
        });
        res.status(201).json({ success: true, message: "Product created successfully", product });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error.message });
    }
}










// for testing purpose only
export const productListTest = (req, res) => {
    
    
    res.status(200).json({success:true, message: "Product fetched successfully" });
} 

export const productListTestforAdmin = (req, res) => {
    
    
    res.status(200).json({success:true, message: "Product fetched successfully" });
} 