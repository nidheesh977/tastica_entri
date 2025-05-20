import invoiceModel from "../../model/invoiceModel.js";
import Stripe from 'stripe'
import loyalityPointModel from "../../model/loyalityPointModel.js";
import customerModel from "../../model/customerModel.js";


export const onlinePaymentStripe = async (req,res) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_MY)

    
    try{
       const {invoiceId} = req.params;

       const {role} = req.user;

       console.log(role)

       if(!invoiceId){
        return res.stattus(400).json({success:true,message:"Invoice ID not get"})
       }

        const findInvoice = await invoiceModel.findById(invoiceId);

        if(!findInvoice){
            return res.status(400).json({success:false,message:"Invoice not found"});
        }

        if(findInvoice.paymentStatus === "success"){
            return res.status(400).json({success:false,message:"Invoice already paid"});
        }

           const successUrl = role === "admin" ? process.env.ADMIN_SUCCESS_URL : process.env.STAFF_SUCCESS_URL 
           const cancelUrl = role === "admin" ? process.env.ADMIN_CANCEL_URL : process.env.STAFF_CANCEL_URL 

           console.log(successUrl)

        const totalAmount = findInvoice.totalAmount;
         const countryCurrency = findInvoice.currencyCode.toLowerCase()

        const session = await stripe.checkout.sessions.create({
            payment_method_types:['card'],
            line_items:[{
                price_data:{
                    currency:countryCurrency,
                    product_data:{
                        name:"Payable Amount"
                    },
                     unit_amount:totalAmount * 100
                },
                quantity:1
            }],
            mode:"payment",
            success_url:`${successUrl}/?invoice=${findInvoice._id}`,
            cancel_url:`${cancelUrl}/?invoice=${findInvoice._id}`
        })

        res.status(200).json({success:true,message:"payment Success",session:session})

       
    }catch(error){
        console.log(error)
        res.status(500).json({success:false,message:"Internal server error",error})
    }
}





export const OnlinePaymentSuccess = async (req,res) => {
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

        let findCustomer = await customerModel.findById(findInvoice.customer);

        if(!findCustomer){
            return res.status(400).json({success:false,message:"Customer not found"})
        }

       const invoiceDigitalPayment = await invoiceModel.findByIdAndUpdate(invoiceId,{
            paymentStatus:"success",
            paymentMethod:"digital",
            invoiceStatus:"paid"
        },{new:true})

        if(!invoiceDigitalPayment){
            await invoiceModel.findByIdAndUpdate(invoiceId,{
            paymentStatus:"failed",
            paymentMethod:"digital", 
        },{new:true})
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
                    invoices:{$each:[invoiceDigitalPayment._id]},
                    loyalityPointHistory:{$each:[pointRedeemHistory,pointHistory]}
                },
                
            },{new:true})
               res.status(200).json({success:true,message:"Cash payment successfully"})
        } 

        else if(invoiceDigitalPayment){
             let addLoyality =  findCustomer.loyalityPoint += findInvoice.totalAmount 
            

           await customerModel.findByIdAndUpdate(findCustomer._id,{
            loyalityPoint:Math.round(addLoyality),
                $push:{
                    invoices:{$each:[invoiceDigitalPayment._id]},
                    loyalityPointHistory:{$each:[pointHistory]}
                },
                
            },{new:true})

                 res.status(200).json({success:true,message:"Cash payment successfully"})
            
        }
        
 
    }catch(error){
        console.log(error)
        return res.status(500).json({success:false,message:"internal server error"})
    }
}


export const OnlinePaymentFailed = async (req,res) => {
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

        let findCustomer = await customerModel.findById(findInvoice.customer);

        if(!findCustomer){
            return res.status(400).json({success:false,message:"Customer not found"})
        }

       

        
            await invoiceModel.findByIdAndUpdate(invoiceId,{
            paymentStatus:"failed",
            paymentMethod:"digital", 
        },{new:true})
      

     
            return res.status(200).json({success:false,message:"invoice payment failed"})
      
    
 
    }catch(error){
        return res.status(500).json({success:false,message:"internal server error"})
    }
}
