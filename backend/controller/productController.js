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
        res.status(201).json({ success: true, message: "Product created successfully", data:product });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error.message });
    }
}

// ---------------------------------------- Delete product ---------------------------------------------------

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

// ------------------------------------------ Update product ------------------------------------------------ 

export const updateProduct = async (req,res) => {
    try{

        const {error,value} = updateProductValidation.validate(req.body);

        if(error){
            return res.status(400).json({success:false,message: error.details[0].message });
        }

        const {id} = req.params;
        const {productname, quantity, costprice, sellingprice, discount,category} = value;

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



// ---------------------------------- Add  Cost  Price Profit ----------------------------------------------

export const addCostPriceProfit = async (req,res) => {
    try{
        const {id} = req.params
        const {costPriceProfit} = req.body;

        const productExist = await productModel.findById(id);

        if(!productExist){
            return res.status(400).json({success:false,message:"Product not found"})
        }
        
        if(isNaN(costPriceProfit)){
            return res.status(400).json({success:false,message:"Cost price profit must be a number"})
        }

        if(costPriceProfit < 0){
            return res.status(400).json({success:false,message:"Cost price profit cannot be negative"})
        }

        if(productExist.costPriceProfit > 0){
            return res.status(400).json({success:false,message:"Cost price profit already exists"})
        }

        if(productExist.costprice > 0){
          const updatedProduct  = await productModel.findByIdAndUpdate(id,{
                costPriceProfit
            },{new:true});

            res.status(200).json({success:true,message:"Cost price profit updated successfully",data:updatedProduct})
        };
    
    }catch(error){
        console.log(error)
        return res.status(400).json({success:true,message:"internal server error"})
    }
}

export const removeCostPriceProfit = async (req,res) => {
    try{
        const {id} = req.params;
        const productExist = await productModel.findById(id);

        if(!productExist){
            return res.status(400).json({success:false,message:"Product not found"})
        }

        const costPriceProfit = 0;

        await productModel.findByIdAndUpdate(id,{costPriceProfit:costPriceProfit},{new:true})

        res.status(200).json({success:true,message:"Cost price profit removed successfully"})
    }catch(error){
        res.status(500).json({success:false,message:"internal server error"})
    }
}


export const addDiscount = async (req,res) => {
    try{ 
        const {id} = req.params;
        const {discount} = req.body;

        const productExist = await productModel.findById(id);

        if(!productExist){
            return res.status(400).json({success:false,message:"Product not found"})
        }

        if(discount < 0){
            return res.status(400).json({success:false,message:"Discount cannot be negative"})
        }

        if(productExist.discount === 0){
            const updatedProduct = await productModel.findByIdAndUpdate(id,{discount},{new:true})
            res.status(200).json({success:true,message:"Discount updated successfully",data:updatedProduct})
        }else{
            return res.status(400).json({success:false, messsage:"Discount already exists"})
        }

        
    }catch(error){
        res.status(500).json({success:false,message:"internal server error"})
    }
}



// for testing purpose only
export const productListTest = (req, res) => {
    
    
    res.status(200).json({success:true, message: "Product fetched successfully" });
} 

export const productListTestforAdmin = (req, res) => {
    
    
    res.status(200).json({success:true, message: "Product fetched successfully" });
} 