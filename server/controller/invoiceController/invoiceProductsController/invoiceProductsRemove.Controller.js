import invoiceModel from "../../../model/invoiceModel.js";

export const removeProductFromInvoice = async (req,res) => {
    try{
        const {invoiceId,productsId} = req.params;

        if(!invoiceId){
            return res.status(400).json({success:false,message:"Invoice ID not get"})
        }

        if(!productsId){
              return res.status(400).json({success:false,message:"Products ID not get"})
        }

        const findInvoice = await invoiceModel.findById(invoiceId);

        if(!findInvoice){
            return res.status(400).json({success:false,message:"No Invoice"})
        }

        const  getProduct = findInvoice.products.id(productsId);

         if(!getProduct){
            return res.status(400).json({success:false,message:"No Product"})
         }


            
         const productTotal = getProduct.total || 0;
         const productDiscount = getProduct.productDiscount || 0;
         const newSubTotal = findInvoice.subTotal  + productDiscount - productTotal;
         const newTotalDiscount = findInvoice.totalDiscount  - productDiscount;
         const newTotalAmount = findInvoice.totalAmount  + productDiscount - productTotal - getProduct.taxAmount;
         const newTaxTotal =   findInvoice.totalTax - getProduct.taxAmount;

         const removeProduct = await invoiceModel.findByIdAndUpdate(invoiceId,{
                $pull: { products: { _id: productsId } },
                totalDiscount: parseFloat(newTotalDiscount).toFixed(2),
                subTotal: parseFloat(newSubTotal).toFixed(2),
                totalAmount: parseFloat(newTotalAmount).toFixed(2),
                totalTax: parseFloat(newTaxTotal).toFixed(2)
                },{new:true}); 

         res.status(200).json({success:true,message:"Product removed successfully",data:removeProduct})

        }catch(error){
        return res.status(500).json({ success: false, message: 'Internal server error' });
         }
    }

