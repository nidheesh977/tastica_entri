import productModel from "../../model/productModel.js";
import loyalityPointModel from "../../model/loyalityPointModel.js";

export const createLoyalityRate = async (req,res) =>{
    try{
        const {id,currencyCode,countryName} = req.shop;
        const {loyalityRate} = req.body

        const numToFixed = parseFloat(loyalityRate).toFixed(2);

        const existLoyality = await loyalityPointModel.findOne({shop:id});

        if(existLoyality){
            return res.status(400).json({success:false,message:"Already exist"})
        }

        const newRate = new loyalityPointModel({
            shop:id,
            countryName:countryName,
            currencyCode:currencyCode,
            loyalityRate:numToFixed
        });
       
        await newRate.save()
        
        res.status(200).json({success:true,message:"Loyality Point Created Successfully",data:newRate})
    }catch(error){
        
        return res.status(500).json({success:false,message:"Internal server error"})
    }
}

 export const updateLoyalityRate = async (req,res) => {
    try{
        const {id} = req.params;
        const {loyalityRate} = req.body;

        if(!id){
            return res.status(400).json({success:false,message:"Loyality point ID not get"})
        }

        if(loyalityRate < 0){
            return res.status(400).json({success:false,message:"LoyalityRate cannot be negative"})
        }

        const numToFixed = parseFloat(loyalityRate).toFixed(2);

        const updateLoyalityPoint = await loyalityPointModel.findByIdAndUpdate(id,{loyalityRate:numToFixed},{new:true});

        res.status(200).json({success:true,message:"Loyality data updated",data:updateLoyalityPoint})
    }catch(error){
        return res.status(500).json({success:false,message:"Internal server error"})
    }
 }

 export const deleteLoyalityPoint = async (req,res) => {
    try{
         const {id} = req.params;

         if(!id){
            return res.status(400).json({success:false,message:"Loyality point ID not get"});
        }

          const deleteLoyalityPoint = await loyalityPointModel.findByIdAndDelete(id);

          res.status(200).json({success:true,message:"Loyality data Deleted",data:deleteLoyalityPoint});

    }catch(error){
        return res.status(500).json({success:false,message:"Internal server error"})
    }
 }


 export const getLoyalityRate = async (req,res) => {
    try{
        const shopId = req.shop.id

        if(!shopId){
            return res.status(400).json({success:false,message:"Shop id is not get"});
        }

        const findLoyalityRate = await loyalityPointModel.findOne({shop:shopId})

        res.status(200).json({success:true,message:"Data fetched successfullty",data:findLoyalityRate})
    }catch(error){
        return res.status(500).json({success:false,message:"Internal server error"})
    }
 }


 export const loyalityToProduct = async (req,res) => {

        const shopId = req.shop.id;
        const {rate} = req.body;

        if(rate < 0){
            return res.status(400).json({success:false,message:"No negative value"})
        }

        const matchNumber = rate.match(/\d+/g) 

        if(!matchNumber){
             return res.status(400).json({success:false,message:"Enter only numbers"})
        }

        const strToNum = parseFloat(rate)

    try{
        

        await productModel.updateMany({shop:shopId},{$set:{loyalityRate:strToNum}},{new:true})
         

        res.status(200).json({success:true,message:"loyality rate updated"})
        
    }catch(error){
         return res.status(500).json({success:false,message:"Internal server error"})
    }
 }