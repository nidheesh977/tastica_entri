import customerModel from "../../model/customerModel.js";
import invoiceModel from "../../model/invoiceModel.js";
import loyalityPointModel from "../../model/loyalityPointModel.js"





export const internalDevicePayment = async (req,res) => {
    try{
        const {invoiceId} = req.params;

        if(!invoiceId){
            return res.status(400).json({success:false,message:'Invoice ID not get'});
        }

        const findInvoice = await invoiceModel.findById(invoiceId);

        if(!findInvoice){
            return res.status(400).json({success:false,message:"Invoice not found"});
        }

        if(findInvoice.paymentStatus === "success"){
            return res.status(400).json({success:false,message:"Invoice already paid"});
        }

         if(findInvoice.totalAmount === 0){
             return res.status(400).json({success:false,message:"Please add product"});
        }

        let findCustomer = await customerModel.findById(findInvoice.customer);

        if(!findCustomer){
            return res.status(400).json({success:false,message:"Customer not found"})
        }

       const invoiceInternalDevicePayment = await invoiceModel.findByIdAndUpdate(invoiceId,{
            paymentStatus:"success",
            paymentMethod:"internal-device",
            invoiceStatus:"paid"
        },{new:true})

        if(!invoiceInternalDevicePayment){
            await invoiceModel.findByIdAndUpdate(invoiceId,{
            paymentStatus:"failed",
            paymentMethod:"internal-device", 
            invoiceStatus:"saved"
        },{new:true})
        }

         if(!invoiceInternalDevicePayment){
            return res.status(400).json({success:false,message:"invoice payment failed"})
        }

        // add loyality points to customer

     
    let date = new Date()
      const pointHistory = {
            action:"earn",
            redeemOrEarn:Math.round(findInvoice.totalAmount),
            createdAt:date,
            invoice:invoiceId
      }

       const pointRedeemHistory = {
            action:"redeem",
            redeemOrEarn:findInvoice.redeemAmount,
            createdAt:date,
            invoice:invoiceId
      }

    
        if(findInvoice.redeemAmount > 0){
        
            const findLoyalityRate = await loyalityPointModel.findOne({shop:findInvoice?.shop})
          

          const getpoints = findInvoice.redeemAmount / findLoyalityRate.loyalityRate
          let deductLoyality =  findCustomer.loyalityPoint - getpoints  + findInvoice.totalAmount

          

      await customerModel.findByIdAndUpdate(findCustomer._id,{
            loyalityPoint:Math.round(deductLoyality),
                $push:{
                    invoices:{$each:[invoiceInternalDevicePayment._id]},
                    loyalityPointHistory:{$each:[pointRedeemHistory,pointHistory]}
                },
                
            },{new:true})
               res.status(200).json({success:true,message:"Device payment successfully"})
        } 

        else if(invoiceInternalDevicePayment){
             let addLoyality =  findCustomer.loyalityPoint += findInvoice.totalAmount 
            

           await customerModel.findByIdAndUpdate(findCustomer._id,{
            loyalityPoint:Math.round(addLoyality),
                $push:{
                    invoices:{$each:[invoiceInternalDevicePayment._id]},
                    loyalityPointHistory:{$each:[pointHistory]}
                },
                
            },{new:true})

                 res.status(200).json({success:true,message:"Device payment successfully"})
            
        }
        
 
    }catch(error){
        return res.status(500).json({success:false,message:"internal server error"})
    }
}

