import invoiceModel from "../../model/invoiceModel.js";



export const paymentRefund = async (req,res) => {
    try{
      const {id} =  req.params;
      const {amount} = req.body;

      console.log(id)
      console.log(amount)

      if(!id){
        return res.status(400).json({success:false,message:"Invoice ID is missing"})
      }

      const invoiceExist = await invoiceModel.findById(id);


      res.status(200).json({success:true,message:"Payment refunded successfully",data:invoiceExist});
    }catch(error){
        return res.status(500).json({success:false,message:"Internal server error"}) 
    }
}