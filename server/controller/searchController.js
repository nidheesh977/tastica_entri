import AdminStaffModel from "../model/adminAndStaffModel.js";
import customerModel from "../model/customerModel.js";
import productModel from "../model/productModel.js";

export const searchProduct = async (req, res) => {
    try {
        const { productId, productName } = req.query; // Added productName query parameter
        const { id } = req.shop;

        
        if (!productId && !productName) {
            return res.status(400).json({ success: false, message: 'At least one query parameter (productId or productName) is required' });
        }
 
        const query = { shop: id };

        if (productId) {
            query.product_id = { $regex: `^${productId}`, $options: 'i' }; // Search by productId
        }

        if (productName) { 
            query.productName = { $regex: `^${productName}`, $options: 'i' }; // Search by productName
        }

        const productData = await productModel.find(query);

        res.status(200).json({ success: true, message: 'Data fetched successfully', data: productData });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};


export const productFilter = async (req,res) => {
    try{
        const {id} = req.shop;
        const {productName,costPrice,sellingPrice,discount,isActive} = req.query;
        const query = {shop:id};

        if(productName){
              query.productName = { $regex: `^${productName}`, $options: 'i' };
        }

        if (costPrice) {
            const numericCostPrice = Number(costPrice);
            if (isNaN(numericCostPrice)) {
                return res.status(400).json({ success: false, message: 'Invalid costPrice value' });
            }

            if(numericCostPrice <= 0){
                query.costPrice = {$lte:numericCostPrice}
              }else{
                 query.costPrice = {$gte:numericCostPrice}
              }
        }

        if(sellingPrice){
            const numericSellingPrice = Number(sellingPrice)
             if (isNaN(numericSellingPrice)) {
                return res.status(400).json({ success: false, message: 'Invalid sellingPrice value' });
            }
              if(numericSellingPrice <= 0){
                query.sellingPrice = {$lte:numericSellingPrice}
              }else{
                 query.sellingPrice = {$gte:numericSellingPrice}
              }
            
        }

        if(discount){
            const numericDiscount = Number(discount)
             if (isNaN(numericDiscount)) {
                return res.status(400).json({ success: false, message: 'Invalid sellingPrice value' });
            }
              if(numericDiscount <= 0){
                query.discount = {$lte:numericDiscount}
              }else{
                 query.discount = {$gte:numericDiscount}
              }
            
        }
       
        if(isActive){      
                 query.isActive = isActive 
        }
        const productData = await productModel.find(query)
    
        res.status(200).json({success:true,message:"Product data fetched",data:productData})
        
    }catch(error){
        console.log(error)
     return res.status(500).json({ success: false, message: 'Internal server error' });
    }
} 


export const staffFilter = async (req,res) => {
    try{
        const {id} = req.shop;
        const {phoneNumber} = req.query

        const query = {shopId:id};

        if(phoneNumber){
             query.phoneNumber = { $regex: `^${phoneNumber}`, $options: 'i' };
        }

       const staffData = await AdminStaffModel.find(query)

       res.status(200).json({success:true,message:"staff data fetched",data:staffData})
    }catch(error){
     return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}


export const searchCustomer = async (req,res) => {
    try{
        const {id} = req.shop;
        const {phoneNumber} = req.query;

        const query = {shopId:id};

        if(phoneNumber){
              query.phoneNumber = { $regex: `^${phoneNumber}`, $options: 'i' };
        }

        const customerData = await customerModel.find(query);

        res.status(200).json({success:true,message:"staff data fetched",data:customerData});
    }catch(error){
         return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}