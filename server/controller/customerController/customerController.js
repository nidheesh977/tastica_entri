import customerModel from "../../model/customerModel.js";
import walletModels from "../../model/walletModel.js";
import { generateId } from "../../utils/generateId.js";
import { customerValidation } from "../../utils/joiValidation.js";
import bwipjs from "bwip-js"

const {walletModel} = walletModels;

export const createCustomer = async (req,res) => {

    const {error,value} = customerValidation.validate(req.body);

       if(error){
        return res.status(400).json({ message: error.details[0].message });
       }

    try{
      
       const {customerName,phoneNumber} = value;
       const shopId = req.shop.id;
   
       const customerExist =await customerModel.findOne({shopId:shopId,phoneNumber:phoneNumber});

       if(customerExist){
        return res.status(400).json({success:false,message:"Customer already exist"})
       }

     
      //  generating unique ID for customers 
      let customerId;

      do {
         customerId = generateId("CUS")
      } while (await customerModel.findOne({customerId:customerId}));

      const lowerCaseCustomerName = customerName.toLowerCase()

       const newCustomer = new customerModel({
        customerId,
        customerName:lowerCaseCustomerName,
        phoneNumber,
        shopId
       })

       await newCustomer.save()

        const newWallet =  walletModel({
            customerId:newCustomer._id
        })

        await newWallet.save()
       res.status(201).json({success:true,message:"customer created successfully"});    
    }catch(error){
      console.log(error)
       return res.status(500).json({success:false,message:"Internal Server Error"})
    }
} 

 export const updateCustomer = async (req,res) => {
    try{
      const {error,value} = customerValidation.validate(req.body);

      if(error){
       return res.status(400).json({ message: error.details[0].message });
      }

       const {id} = req.params;
       const {customerName,phoneNumber} = value;

       const customerFound = await customerModel.findById(id);
       
       if(!customerFound){
        return res.status(404).json({success:false,message:"customer not found"});
       }

       await customerModel.findByIdAndUpdate(id,{
          customerName,
          phoneNumber
         },{new:true})

       res.status(200).json({success:true,message:"customer details updated successfully"})

    }catch(error){
      return res.status(500).json({success:false,message:"Internal Server Error"})
    }
 }

 export const deleteCustomer = async (req,res) => {
   try{

      const {id} = req.params;

      const customerFound = await customerModel.findById(id);

      if(!customerFound){
         return res.status(403).json({success:false,message:"User not found"})
      }

      await customerModel.findByIdAndDelete(id);

      res.status(200).json({success:true,message:"Customer delete successfully"})

   }catch(error){
      return res.status(500).json({success:false,message:"Internal Server Error"})
   }
 }

export const getCustomer = async(req,res) => {
   try{

       const shopId = req.shop.id

       if(!shopId){
         return res.status(400).json({success:false,message:"Shop ID is missing"})
       }

       const fetchData = await customerModel.find({shopId:shopId}) 
 
       res.status(200).json({success:true,message:"Data fetch successfully",data:fetchData})

   }catch(error){
      return res.status(500).json({success:false,message:"Internal Server Error"})
   }
}


export const getSingleCustomer = async (req,res) => {
   try{
     const {id} = req.params;
     const shopId = req.shop.id;

     const getCustomer = await customerModel.findOne({_id:id,shopId:shopId}).populate("invoices")

     res.status(200).json({success:true,message:"Data fetched successfully", data:getCustomer});

   }catch(error){
    return res.status(500).json({success:false,message:"Internal Server Error"})
   }
}


export const generateBarcodeImage = async (req,res) => {
   try{
      const {customerId} = req.params;

      if(!customerId){
         return res.status(400).json({success:false,message:"Customer ID not get"})
      }

      const findCustomer = await customerModel.findById(customerId);

      if(!findCustomer){
         return res.status(400).json({success:false,message:"Customer not found"})
      }

      const png = await bwipjs.toBuffer({
          bcid:'code128',
          text:findCustomer.customerId,
          scale:4,
          height:12,
          includetext:false,
          textalign:"center"
      })

      res.writeHead(200,{'Content-Type':'image/png'});
      res.end(png)

   }catch(error){
      console.log(error)
       return res.status(500).json({success:false,message:"Internal Server Error"})
   }
}