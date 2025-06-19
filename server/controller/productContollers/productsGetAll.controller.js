import productModel from "../../model/productModel.js";

export const getAllProducts = async (req,res) => {
    try{

      const {id} =req.shop;

        const getProducts = await productModel.find({shop:id}).sort({createdAt:-1}).populate("category");

        res.status(200).json({success:true,message:"Product fetched successfully",data:getProducts});
    }catch{
       return res.status(500).json({success:false,message:"internal server error"})
    }
}; 


