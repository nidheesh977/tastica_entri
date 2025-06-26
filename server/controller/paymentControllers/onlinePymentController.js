import invoiceModel from "../../model/invoiceModel.js";
import Stripe from 'stripe'
import loyalityPointModel from "../../model/loyalityPointModel.js";
import customerModel from "../../model/customerModel.js";
import productModel from "../../model/productModel.js";


export const onlinePaymentStripe = async (req,res) => {

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_MY)

    
    try{
       const {invoiceId} = req.params;

       const {role} = req.user;

       if(!invoiceId){
        return res.stattus(400).json({success:true,message:"Invoice ID not get"})
       }

        const findInvoice = await invoiceModel.findById(invoiceId);

        if(!findInvoice){
            return res.status(400).json({success:false,message:"Invoice not found"});
        }

        if(findInvoice.totalAmount === 0){
             return res.status(400).json({success:false,message:"Please add product"});
        }
 
        if(findInvoice.paymentStatus === "success"){
            return res.status(400).json({success:false,message:"Invoice already paid"});
        }

           const successUrl = role === "admin" ? process.env.ADMIN_SUCCESS_URL : process.env.STAFF_SUCCESS_URL 
           const cancelUrl = role === "admin" ? process.env.ADMIN_CANCEL_URL : process.env.STAFF_CANCEL_URL 

        
      

        const totalAmount = parseFloat(findInvoice.totalAmount).toFixed(2);
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

                    
        let total = 0  // total of the product
        let totalOfDiscount = 0  // total of the product discount
        let deductDiscountFromTotal = 0 // deduct discount from the total
        let addTax = 0  // if tax exist add tax to total
        
        let loyalityPointProduct = 0  // calculate product loyality rate 
        
        for (const item of findInvoice.products){
                total += item.total 
                totalOfDiscount += item.productDiscount
                deductDiscountFromTotal = total - totalOfDiscount
                addTax = deductDiscountFromTotal + item.taxAmount
                loyalityPointProduct = addTax * item.loyalityRate
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

    
        const findLoyalityRate = await loyalityPointModel.findOne({shop:findInvoice?.shop})

        if(findInvoice.redeemAmount > 0){

          const getpoints = findInvoice.redeemAmount / findLoyalityRate?.loyalityRate || 0
          let deductLoyality =  findCustomer.loyalityPoint - getpoints  + loyalityPointProduct

          let PointsToAmount = Math.round(deductLoyality) * findLoyalityRate?.loyalityRate || 0

      await customerModel.findByIdAndUpdate(findCustomer._id,{
            loyalityPoint:Math.round(deductLoyality),
             pointAmount:parseFloat(PointsToAmount).toFixed(2),
                $push:{
                    invoices:{$each:[invoiceDigitalPayment._id]},
                    loyalityPointHistory:{$each:[pointRedeemHistory,pointHistory]}
                },
                
            },{new:true})
               res.status(200).json({success:true,message:"Stripe payment successfully"})
        } 

        else if(invoiceDigitalPayment){
             let addLoyality =  findCustomer.loyalityPoint += loyalityPointProduct 
               let PointsToAmount = Math.round(addLoyality) * findLoyalityRate?.loyalityRate || 0

           await customerModel.findByIdAndUpdate(findCustomer._id,{
            loyalityPoint:Math.round(addLoyality),
            pointAmount:parseFloat(PointsToAmount).toFixed(2),
                $push:{
                    invoices:{$each:[invoiceDigitalPayment._id]},
                    loyalityPointHistory:{$each:[pointHistory]}
                },
                
            },{new:true})

                 res.status(200).json({success:true,message:"Stripe payment successfully"})
            
        }
        
 
    }catch(error){
        
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
             invoiceStatus:"saved", 
            paymentStatus:"pending",
        },{new:true})
      

     
        return res.status(200).json({success:false,message:"invoice payment failed"})
      
    
 
    }catch(error){
        return res.status(500).json({success:false,message:"internal server error"})
    }
}
