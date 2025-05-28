import invoiceModel from '../../model/invoiceModel.js';
import taxModel from '../../model/taxModel.js';


export const createTax = async (req,res) => {
    try{
        const {taxRate} = req.body;
        const {id,currencyCode,countryName} = req.shop;

        if(taxRate < 0 ){
            return res.status(400).json({success:false,message:"Number not negative"});
        }

        

        const newTax = taxModel({
            shop:id,
            countryName:countryName,
            currencyCode:currencyCode,
            taxRate,
        });

        await newTax.save()

        res.status(200).json({success:true,message:"Tax added successfully",data:newTax})
    }catch(error){      
        return res.status(500).json({success:false,message:"internal server error"})
    }
};



export const addOrRemoveTaxInvoice = async (req,res) => {
    try{
        const {invoiceId} = req.params;
        const {id} = req.shop;
        const {boolValue} = req.body

         const getTax = await taxModel.findOne({shop:id});

         if(boolValue === true){
        const updateInvoice  = await invoiceModel.findByIdAndUpdate(invoiceId,{
                    isTaxActive:true,
                    taxRate:getTax.taxRate
                },{new:true})
                
          res.status(200).json({success:true,message:"Tax rate added to invoice",data:updateInvoice})
         }else if(boolValue === false){

             const updateInvoice  = await invoiceModel.findByIdAndUpdate(invoiceId,{
                isTaxActive:false,
                taxRate:0
            },{new:true})

          res.status(200).json({success:true,message:"Tax rate remove from invoice",data:updateInvoice})
            }
     

    }catch(error){
        return res.status(500).json({success:false,message:"internal server error"})
    } 
}



