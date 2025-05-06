import customerModel from "../model/customerModel.js";
import { generateCustomerId } from "../utils/generateCustomerId.js";
import { customerValidation } from "../utils/joiValidation.js";


export const createCustomer = async (req,res) => {
    try{
       const {error,value} = customerValidation.validate(req.body);

       if(error){
        return res.status(400).json({ message: error.details[0].message });
       }

       const {customerName,phoneNumber} = value;

       const customerExist =await customerModel.findOne({phoneNumber:phoneNumber});

       if(customerExist){
        return res.status(400).json({success:false,message:"Customer already exist"})
       }

     
      //  generating unique ID for customers 
      let customerId;

      do {
         customerId = generateCustomerId()
      } while (await customerModel.findOne({customerId:customerId}));

   

       const newCustomer = new customerModel({
        customerId,
        customerName,
        phoneNumber,
       })

       await newCustomer.save()
       res.status(201).json({success:true,message:"customer created successfully"});    
    }catch(error){
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