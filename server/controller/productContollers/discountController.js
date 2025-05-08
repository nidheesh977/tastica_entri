import productModel from "../../model/productModel.js";


// ------------------------------ Add Discount ----------------------------------------------- 

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

        if(typeof discount === "string"){
            return res.status(400).json({success:false,message:"Discount must be a number"})
        }

        if(productExist.discount > 0){
            return res.status(400).json({success:false,message:"Discount amount already exists"})
        }

        if(productExist.discount === 0){
            const updatedProduct = await productModel.findByIdAndUpdate(id,{discount},{new:true})
            res.status(200).json({success:true,message:"Discount updated successfully",data:updatedProduct})
        }

        
    }catch(error){
        res.status(500).json({success:false,message:"internal server error"})
    }
}

// ------------------------------ remove Discount ----------------------------------------------- 

export const removeDiscount = async (req,res) => {
    try{
        const {id} = req.params;
        const productExist = await productModel.findById(id);

        if(!productExist){
            return res.status(400).json({success:false,message:"Product not found"})
        }

        const discount = 0;

        await productModel.findByIdAndUpdate(id,{discount:discount},{new:true})

        res.status(200).json({success:true,message:"Discount removed successfully"})
    }catch(error){
        res.status(500).json({success:false,message:"internal server error"})
    }
}