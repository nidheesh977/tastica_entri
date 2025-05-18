import invoiceModel from "../../model/invoiceModel.js";
import Stripe from 'stripe'


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

        if(findInvoice.paymentStatus === "completed"){
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