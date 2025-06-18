import productModel from "../../model/productModel.js";

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