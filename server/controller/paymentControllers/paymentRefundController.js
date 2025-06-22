import invoiceModel from "../../model/invoiceModel.js";



export const paymentRefund = async (req,res) => {
    try{
      const {id} =  req.params;
      const {amount} = req.body;

      
      if(!id){
        return res.status(400).json({success:false,message:"Invoice ID is missing"})
      }

      const invoiceExist = await invoiceModel.findById(id);

      const totalAmount = invoiceExist.totalAmount;

      let refundType;
      let invoiceStatus;
      let paymentStatus;


      if(amount < 0){
         return res.status(400).json({success:false,message:"Invalid amount"})
      }else if(amount > totalAmount){
        return res.status(400).json({success:false,message:"Exceeds balance"})
      }else if(amount === totalAmount){
        refundType = "full"
        invoiceStatus = "refunded"
        paymentStatus = "refunded"
      }else if(amount < totalAmount){
        refundType = "partial"
        invoiceStatus = "paid" 
        paymentStatus = "success"
      }

      let refundDeductTotal = refundType === "partial" ? totalAmount - amount : amount

      const updateInvoice = await invoiceModel.findByIdAndUpdate(id,{
          refundedAmount:amount,
          refundType,
          paymentStatus,
          invoiceStatus,
          totalAmount:refundDeductTotal
      },{new:true})

      
      res.status(200).json({success:true,message:"Payment refunded successfully",data:updateInvoice});
    }catch(error){
        return res.status(500).json({success:false,message:"Internal server error"}) 
    }
}