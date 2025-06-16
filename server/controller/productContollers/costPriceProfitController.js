import productModel from "../../model/productModel.js";
import { toDecimal } from "../../utils/calculateDiscount.js";



// ---------------------------------- Add  Cost  Price Profit ----------------------------------------------

export const addCostPriceProfit = async (req,res) => {
    try{
        const {id} = req.params
        const {costPriceProfit} = req.body;

        const productExist = await productModel.findById(id);

        if(!productExist){
            return res.status(400).json({success:false,message:"Product not found"})
        }
        
        if(typeof costPriceProfit === "string"){
            return res.status(400).json({success:false,message:"Cost price profit must be a number"})
        }

        if(costPriceProfit < 0){
            return res.status(400).json({success:false,message:"Cost price profit cannot be negative"})
        }


        if(productExist.costPrice === 0){
            return res.status(400).json({success:false,message:"Add amount to cost price first"})
        }

          let costPriceSum = parseFloat(productExist.costPrice) * (parseFloat(costPriceProfit) / 100 )

          
        // if(productExist.costPrice > 0){
        //   const updatedProduct  = await productModel.findByIdAndUpdate(id,{
        //          costPrice:toDecimal(costPriceSum),
        //         costPriceProfit:toDecimal(costPriceProfit),
        //     },{new:true});

        //     res.status(200).json({success:true,message:"Cost price profit updated successfully",data:updatedProduct})
        // }
    
    }catch(error){
        
        return res.status(400).json({success:true,message:"internal server error"})
    }
}

// --------------------------------------- Update Cost  Price Profit ------------------------------------------

export const updateCostPriceProfit = async (req,res) => {
    try{
        const {id} = req.params;
        const {costPriceProfit} = req.body;

        const productExist = await productModel.findById(id);

        if(!productExist){
            return res.status(400).json({success:false,message:"Product not found"})
        }

        if(typeof costPriceProfit === "string"){
            return res.status(400).json({success:false,message:"Cost price profit must be a number"})
        }
 
        if(costPriceProfit < 0){
            return res.status(400).json({success:false,message:"Cost price profit cannot be negative"})
        }

        if(productExist.costPriceProfit === 0){
            return res.status(400).json({success:false,message:"Cost price profit amount does not exist"})
        }

        const updatedProduct = await productModel.findByIdAndUpdate(id,{costPriceProfit},{new:true})

        res.status(200).json({success:true,message:"Cost price profit updated successfully",data:updatedProduct})
    }catch(error){
        res.status(500).json({success:false,message:"internal server error"})
    }
}

// ------------------------------ Remove Cost  Price Profit ----------------------------------------------- 

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
