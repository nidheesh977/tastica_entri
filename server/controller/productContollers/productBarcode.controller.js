import productModel from "../../model/productModel.js";
import { barcodeValidation } from "../../utils/joiValidation.js";


export const barcodeAddToProduct = async (req,res) => {
    try{

        const {error,value} = barcodeValidation.validate(req.body);

       
        if(error){
            return res.status(400).json({success:false,message:error.details[0].message})
        }
       
          const {barcode} = value;
          const {id} = req.params;

          const barcodeUpdate = await productModel.findByIdAndUpdate(id,{
            barcodeNumber:barcode
          },{new:true})


        res.status(200).json({success:true,message:"Add barcode successfully",data:barcodeUpdate})

    }catch(error){
        return res.status(500).json({success:false,message:"Internal server error"})
    }
}