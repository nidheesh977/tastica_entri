import productModel from "../model/productModel.js";
import { generateProductId } from "../utils/generateProductId.js";
import { newProductValidation, updateProductValidation } from "../utils/joiValidation.js";


// ---------------------------------------- Create a new product -------------------------------------------

export const createProduct = async (req, res) => {
    
    try {
        const {error,value} = newProductValidation.validate(req.body);

        if(error){
            return res.status(400).json({success:false,message: error.details[0].message });
        }

        const { productname, quantity, costprice, sellingprice, discount } = value;
        const {category} = req.params;
        
       
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
        res.status(201).json({ success: true, message: "Product created successfully", data:product });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error.message });
    }
}

export const deleteProduct = async (req,res) => {
    try{
        const {id} = req.params;
        
        const productExist = await productModel.findById(id);

        if(!productExist){
            return res.status(400).json({success:false,message:"Product not found"})
        };

        await productModel.findByIdAndDelete(id);

        res.status(200).json({success:true,message:"Product deleted successfully"})
    }catch(error){
        return res.status(500).json({success:false,message:"internal server error"}) 
    }
}



export const updateProduct = async (req,res) => {
    try{

        const {error,value} = updateProductValidation.validate(req.body);

        if(error){
            return res.status(400).json({success:false,message: error.details[0].message });
        }

        const {id,category} = req.params;
        const {productname, quantity, costprice, sellingprice, discount} = value;

        if(sellingprice === 0 && costprice === 0){
            return res.status(400).json({success:false,message:"Selling price and cost price cannot be 0"})
        }

        if(sellingprice > 0  && costprice > 0){
            return res.status(400).json({success:false,message:"You can only add one price rate"})
        }

        const productExist = await productModel.findById(id);

        if(!productExist){
            return res.status(400).json({success:false,message:"Product not found"})
        };

       

        const updatedProduct = await productModel.findByIdAndUpdate(id,{
            productname,
            quantity,
            costprice,
            sellingprice,
            discount,
            category
        },{new:true});

        res.status(200).json({success:true,message:"Product updated successfully",data:updatedProduct})
    }catch(error){
        return res.status(500).json({success:false,message:"internal server error"}) 
    }
}





// for testing purpose only
export const productListTest = (req, res) => {
    
    
    res.status(200).json({success:true, message: "Product fetched successfully" });
} 

export const productListTestforAdmin = (req, res) => {
    
    
    res.status(200).json({success:true, message: "Product fetched successfully" });
} 