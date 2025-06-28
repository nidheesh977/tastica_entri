import AdminStaffModel from "../../model/adminAndStaffModel.js";
import invoiceModel from "../../model/invoiceModel.js"
import { generateId } from "../../utils/generateId.js";




export const customInvoiceCreate = async (req,res) => {
    try{

         const {id,countryName,currencyCode} = req.shop;
         const userId = req.user.id

         const staffExist = await AdminStaffModel.findById(userId)
         
         if(!staffExist){
             return res.status(400).json({success:false,message:"Staff does not exist"})
            }

         const staffName = `${staffExist.userName} (${staffExist.role})`;
                      
         let invoiceId;
         
         do {
             invoiceId = generateId("INVO")
             } while (await invoiceModel.findOne({invoiceNumber:invoiceId}));
         

     const newCustom =   await invoiceModel({
        invoiceNumber:invoiceId,
        staff:staffName,
        countryName:countryName,
        currencyCode:currencyCode,
        shop:id,
        invoiceType:"custom"
     })

        await newCustom.save()

        res.status(201).json({success:true,message:"Invoice created successfully",data:newCustom})

    }catch(error){
     return res.status(500).json({success:false,message:"Internal server error"})
    }
}


export const customInvoiceDelete = async (req,res) => {
    try{
            const {id} = req.params;

            if(!id){
                return res.status(400).json({success:false,message:"Internal server error"})
            };

             await invoiceModel.findByIdAndDelete(id)

             res.status(200).json({success:true,message:"Invoice delete successfully"})
    }catch(error){
        return res.status(500).json({success:false,message:"Internal server error"})
    }
}