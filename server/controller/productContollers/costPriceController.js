import productModel from "../../model/productModel.js";
import { toDecimal } from "../../utils/calculateDiscount.js";


export const addCostPrice = async (req,res) => {
    try{
        const {id} = req.params;
        const {costPrice} = req.body;

        const productExist = await productModel.findById(id);

        if(!productExist){
            return res.status(400).json({success:false,message:"Product not found"})
        }

        if(costPrice < 0){
            return res.status(400).json({success:false,message:"Cost price cannot be negative"})
        }
        if(costPrice === 0){
            return res.status(400).json({success:false,message:"Cost price cannot be 0"})
        }

        if(productExist.sellingPrice > 0){
            return res.status(400).json({success:false,message:"selling price has already been set"})
        }

        let costPriceProfitSum = costPrice * (parseFloat(productExist.costPriceProfit) / 100 )

         const updatedProduct = await productModel.findByIdAndUpdate(id,{costPrice:toDecimal(costPrice + costPriceProfitSum)},{new:true})

         res.status(200).json({success:true,message:"Cost price updated successfully",data:updatedProduct})
    }catch(error){      
        return res.status(500).json({success:false,message:"internal server error"})
    }
}

export const removeCostPrice = async (req,res) => {
    try{
        const {id} = req.params;

        const productExist = await productModel.findById(id);

        if(!productExist){
            return res.status(400).json({success:false,message:"Product not found"})
        }

        if(productExist.costPrice === 0){
            return res.status(400).json({success:false,message:"cost price has already been removed"})
        }
        const costPrice = 0;

        const updatedProduct = await productModel.findByIdAndUpdate(id,{costPrice},{new:true})

        res.status(200).json({success:true,message:"Cost price removed successfully",data:updatedProduct})

    }catch(error){ 
     return res.status(500).json({success:false,message:"internal server error"}) 
    }
}