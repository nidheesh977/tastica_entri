import productModel from "../../model/productModel.js";


export const addCostPrice = async (req,res) => {
    try{
        const {id} = req.params;
        const {costprice} = req.body;

        const productExist = await productModel.findById(id);

        if(!productExist){
            return res.status(400).json({success:false,message:"Product not found"})
        }

        if(costprice < 0){
            return res.status(400).json({success:false,message:"Cost price cannot be negative"})
        }

        if(isNaN(costprice)){
            return res.status(400).json({success:false,message:"Cost price must be a number"})
        }

        if(productExist.costprice > 0){
            return res.status(400).json({success:false,message:"Cost price already exists"})
        }

        if(productExist.sellingprice > 0){
            return res.status(400).json({success:false,message:"selling price has already been set"})
        }

        const updatedProduct = await productModel.findByIdAndUpdate(id,{costprice},{new:true})

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

        if(productExist.costprice === 0){
            return res.status(400).json({success:false,message:"cost price has already been removed"})
        }
        const costprice = 0;

        const updatedProduct = await productModel.findByIdAndUpdate(id,{costprice},{new:true})

        res.status(200).json({success:true,message:"Cost price removed successfully",data:updatedProduct})

    }catch(error){ 
     return res.status(500).json({success:false,message:"internal server error"}) 
    }
}