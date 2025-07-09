import customerModel from "../../model/customerModel.js";
import invoiceModel from "../../model/invoiceModel.js";
import loyalityPointModel from "../../model/loyalityPointModel.js"
import productModel from "../../model/productModel.js";





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

                
        let total = 0  // total of the product
        let totalOfDiscount = 0  // total of the product discount
        let deductDiscountFromTotal = 0 // deduct discount from the total
        let addTax = 0  // if tax exist add tax to total
        let loyaltyPointProduct = 0  // calculate product loyality rate 

  for (const item of findInvoice.products){
        if(item.customProduct != true){
        total += item.total 
        totalOfDiscount += item.productDiscount
        deductDiscountFromTotal = total - totalOfDiscount
        addTax = deductDiscountFromTotal + item.taxAmount
         loyaltyPointProduct = addTax * item.loyaltyRate
    } 
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
        },{new:true}).populate("customer","customerName phoneNumber");

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

               // reduce quantity from products
                 
                  let productQnt = findInvoice.products
        
                for (const item of productQnt){
                     const {productId,quantity} = item;
        
                   await productModel.findByIdAndUpdate(productId,{
                     $inc: {'quantity': -quantity}
                   },{new:true})
                
                }

        // add loyality points to customer

     
    let date = new Date()
      const pointHistory = {
            action:"earn",
            redeemOrEarn:Math.round(loyaltyPointProduct),
            createdAt:date,
            invoice:invoiceId
      }

       const pointRedeemHistory = {
            action:"redeem",
            redeemOrEarn:findInvoice.redeemAmount,
            createdAt:date,
            invoice:invoiceId
      }

        //  const findLoyalityRate = await loyalityPointModel.findOne({shop:findInvoice?.shop})
    
        if(findInvoice.redeemAmount > 0){
        

        //   const getpoints = findInvoice.redeemAmount / findLoyalityRate?.loyalityRate || 0

          let deductLoyalty =  findCustomer.loyalityPoint - findInvoice.redeemAmount  + loyaltyPointProduct

        //   let PointsToAmount = Math.round(deductLoyality) * findLoyalityRate?.loyalityRate || 0

        let PointsToAmount = deductLoyalty;

      await customerModel.findByIdAndUpdate(findCustomer._id,{
            loyalityPoint:Math.round(deductLoyalty),

             //  pointAmount:parseFloat(PointsToAmount).toFixed(2),

                 pointAmount:Math.round(PointsToAmount),
                $push:{
                    invoices:{$each:[invoiceInternalDevicePayment._id]},
                    loyalityPointHistory:{$each:[pointRedeemHistory,pointHistory]}
                },
                
            },{new:true})
               res.status(200).json({success:true,message:"Device payment successfully",data:invoiceInternalDevicePayment})
        } 

        else if(invoiceInternalDevicePayment){
            //  let addLoyality =  findCustomer.loyalityPoint += loyalityPointProduct

              let addLoyalty =  findCustomer.loyalityPoint += loyaltyPointProduct;

            //  let PointsToAmount = Math.round(addLoyality) * findLoyalityRate?.loyalityRate || 0

             let PointsToAmount = addLoyalty;

           await customerModel.findByIdAndUpdate(findCustomer._id,{
            loyalityPoint:Math.round(addLoyalty),
           //  pointAmount:parseFloat(PointsToAmount).toFixed(2),
             pointAmount:Math.round(PointsToAmount),
                $push:{
                    invoices:{$each:[invoiceInternalDevicePayment._id]},
                    loyalityPointHistory:{$each:[pointHistory]}
                },
                
            },{new:true})

                 res.status(200).json({success:true,message:"Device payment successfully",data:invoiceInternalDevicePayment})
            
        }
        
 
    }catch(error){
        return res.status(500).json({success:false,message:"internal server error"})
    }
}

