import customerModel from "../../model/customerModel.js";
import invoiceModel from "../../model/invoiceModel.js";


export const cashPayment = async (req,res) => {
    try{
        const {invoiceId} = req.params;

        if(!invoiceId){
            return res.status(400).json({success:false,message:'Invoice ID not get'});
        }

        const findInvoice = await invoiceModel.findById(invoiceId);

        if(!findInvoice){
            return res.status(400).json({success:false,message:"Invoice not found"});
        }

        if(findInvoice.paymentStatus === "completed"){
            return res.status(400).json({success:false,message:"Invoice already paid"});
        }

        let findCustomerId = await customerModel.findById(findInvoice.customer);

       

       const invoiceCashPayment = await invoiceModel.findByIdAndUpdate(invoiceId,{
            paymentStatus:"completed",
            paymentMethod:"cash"
        },{new:true})

        if(!invoiceCashPayment){
            await invoiceModel.findByIdAndUpdate(invoiceId,{
            paymentStatus:"failed",
            paymentMethod:"cash"
        },{new:true})
        }

         if(!invoiceCashPayment){
            return res.status(400).json({success:false,message:"invoice payment failed"})
        }

        if(invoiceCashPayment){
            await customerModel.findByIdAndUpdate(findCustomerId._id,{
                $push:{
                    invoices:invoiceCashPayment._id
                }
            })
        }

        return res.status(200).json({success:true,message:"invoice payment successfully",data:invoiceCashPayment})

    }catch(error){
        return res.status(500).json({success:false,message:"internal server error"})
    }
}

