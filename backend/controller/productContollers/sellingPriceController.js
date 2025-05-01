import productModel from "../../model/productModel.js";


export const addSellingPrice = async (req,res) => {
    try{
        const {id} = req.params;
        const {sellingprice} = req.body;

        const productExist = await productModel.findById(id);

        if(!productExist){
            return res.status(400).json({success:false,message:"Product not found"})
        }

        if(sellingprice < 0){
            return res.status(400).json({success:false,message:"Selling price cannot be negative"})
        }

        if(isNaN(sellingprice)){
            return res.status(400).json({success:false,message:"Selling price must be a number"})
        }

        if(productExist.sellingprice > 0){
            return res.status(400).json({success:false,message:"Selling price already exists"})
        }

        if(productExist.costprice > 0){
            return res.status(400).json({success:false,message:"Cost price has already been set"})
        }

        const updatedProduct = await productModel.findByIdAndUpdate(id,{sellingprice},{new:true})

        res.status(200).json({success:true,message:"Cost price updated successfully",data:updatedProduct})
    }catch(error){       
        return res.status(500).json({success:false,message:"internal server error"})
    }
}

export const removeSellingPrice = async (req,res) => {
    try{
        const {id} = req.params;

        const productExist = await productModel.findById(id);

        if(!productExist){
            return res.status(400).json({success:false,message:"Product not found"})
        }

        if(productExist.sellingprice === 0){
            return res.status(400).json({success:false,message:"selling price has already been removed"})
        }
        const sellingprice = 0;

        const updatedProduct = await productModel.findByIdAndUpdate(id,{sellingprice},{new:true})

        res.status(200).json({success:true,message:"Cost price removed successfully",data:updatedProduct})

    }catch(error){ 
     return res.status(500).json({success:false,message:"internal server error"}) 
    }
}