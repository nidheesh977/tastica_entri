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

        let findCustomer = await customerModel.findById(findInvoice.customer);

       

       const invoiceCashPayment = await invoiceModel.findByIdAndUpdate(invoiceId,{
            paymentStatus:"completed",
            paymentMethod:"cash",
            invoiceStatus:"paid"
        },{new:true})

        if(!invoiceCashPayment){
            await invoiceModel.findByIdAndUpdate(invoiceId,{
            paymentStatus:"failed",
            paymentMethod:"cash", 
        },{new:true})
        }

         if(!invoiceCashPayment){
            return res.status(400).json({success:false,message:"invoice payment failed"})
        }

        // add loyality points

      let addLoyality =  findCustomer.loyalityPoint += findInvoice.totalAmount 
      let date = new Date()

      const pointHistory = {
            action:"earn",
            point:Math.round(findInvoice.totalAmount),
            createdAt:date,
            invoice:invoiceId
      }
        if(invoiceCashPayment){
          await customerModel.findByIdAndUpdate(findCustomer._id,{
            loyalityPoint:Math.round(addLoyality),
                $push:{
                    invoices:{$each:[invoiceCashPayment._id]},
                    loyalityPointHistory:{$each:[pointHistory]}
                },
                
            },{new:true})
        }

        return res.status(200).json({success:true,message:"invoice payment successfully",data:invoiceCashPayment})

    }catch(error){
        return res.status(500).json({success:false,message:"internal server error"})
    }
}

