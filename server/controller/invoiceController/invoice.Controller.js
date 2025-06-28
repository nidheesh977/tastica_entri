import AdminStaffModel from '../../model/adminAndStaffModel.js';
import customerModel from '../../model/customerModel.js';
import invoiceModel from '../../model/invoiceModel.js';
import { generateId } from '../../utils/generateId.js';


export const createNewInvoiceTab = async (req,res) => {
    try{
      const userId= req.user.id
      const {customerId} = req.params;
      const {id,countryName,currencyCode} = req.shop;  

      if(!userId){
        return res.status(400).json({success:false,message:"Staff ID is required"})
      }

      if(!customerId){
          return res.status(400).json({success:false,message:"customer ID is required"})
      }

      const findCustomer = await customerModel.findById(customerId)

      if(!findCustomer){
        return res.status(400).json({success:false,message:"Customer does not exist"})
      }

      const staffExist = await AdminStaffModel.findById(userId)

      if(!staffExist){
        return res.status(400).json({success:false,message:"Staff does not exist"})
      }

      const staffName = `${staffExist.userName} (${staffExist.role})`;
             
      let invoiceId;

      do {
         invoiceId = generateId("INVO")
      } while (await invoiceModel.findOne({invoiceNumber:invoiceId}));

        const newInvoice =  invoiceModel({
            invoiceNumber:invoiceId,
            staff:staffName,
            customer:customerId,
            shop:id,
            countryName,
            currencyCode,
            invoiceType:"normal"
        });

        await newInvoice.save();

        const findInvoice = await invoiceModel.findOne({_id:newInvoice._id}).populate('customer')

        res.status(201).json({success:true,message:"Invoice created successfully",data:findInvoice})
    }catch(error){
     return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}


// add product to invoice


        export const getInvoice = async (req,res) => {
            try{
              const {invoiceId} = req.params;
              const shopId = req.shop.id; 
              
              if(!invoiceId) {
                return res.status(400).json({success:false,message:"Invoice ID not get"})
              }

                const findInvoice = await invoiceModel.findById(invoiceId).populate('customer');

                if(!findInvoice){
                    return res.status(400).json({success:false,message:"No Invoice"})
                }

              res.status(200).json({success:true,message:"Invoice found successfully",data:findInvoice})
                         
            
            }catch(error){
              
                return res.status(500).json({success:false,message:"Internal server error"})
            }
        }
 

        export const invoiceSave = async (req,res) => {
            try{
                const {id} = req.params;

                if(!id){
                    return res.status(400).json({success:false,})
                }

                const findInvoice = await invoiceModel.findById(id)
              

                if(findInvoice.paymentStatus === "success"){
                    return res.status(400).json({success:false,message:"This Invoice cannot be saved it's payment success"})
                }

                
                const saveInvoice = await invoiceModel.findByIdAndUpdate(id,{invoiceStatus:"saved"},{new:true});

                if(!saveInvoice){
                    return res.status(400).json({success:false,message:"Invoice not found"})
                }

                res.status(200).json({success:true,message:"Invoice saved",data:saveInvoice})
            }catch(error){
                return res.status(500).json({success:false,message:"Internal server error"})
            }
        }



        export const getInvoiceSaved = async (req,res) => {
 
            try{
            const shopId = req.shop.id;
                
                if(!shopId){
                    return res.status(400).json({success:false,message:"Shop ID is not get"});
                }

                const savedInvoice = await invoiceModel.find({shop:shopId,invoiceStatus:"saved"}).populate("customer");
              
               
                    
                res.status(200).json({success:true,message:"Data fetched successFully",data:savedInvoice});
                   

            }catch(error){
                  return res.status(500).json({success:false,message:"Internal server error",error})
            }
        }


             export const deleteOpenOrder = async (req,res) => {
 
            try{
            
                const {id} = req.params
                
                if(!id){
                    return res.status(400).json({success:false,message:"Invoice ID is not get"});
                }

                const findInvoice = await invoiceModel.findById(id)

                if(findInvoice.invoiceStatus === "paid"){
                    return res.status(400).json({success:"false",message:"You cannot delete invoice its paid"})
                }

                 await invoiceModel.findByIdAndDelete(id)

               
               res.status(200).json({success:true,message:"Invoice deleted successfully"})

            }catch(error){
                  return res.status(500).json({success:false,message:"Internal server error",error})
            }
        }

        // phase 2 task

        export const invoiceClear = async(req,res) => {
            try{
                const {id} = req.params;

                if(!id){
                    return res.status(400).json({success:false,message:"Invoice ID is missing"});
                }

                const findInvoiceAndUpdate = await invoiceModel.findByIdAndUpdate(id,
                    {
                        subTotal:0,
                        totalDiscount:0,
                        products:[],
                        totalAmount:0,
                        taxRate:0,
                        redeemAmount:0

                    },{new:true});

                
                res.status(200).json({success:true,message:"Products cleared successfully",data:findInvoiceAndUpdate})
                
            }catch(error){
                return res.status(500).json({success:false,message:"Internal server error"})
            }
        }


        export const getInvoiceWithId = async (req,res) => {
            try{
                const {id} = req.body;

                if(!id){
                    return res.status(400).json({success:false,message:"Invoice ID not get"});
                }

                const findInvoice = await invoiceModel.findById(id);

                if(!findInvoice){
                    return res.status(400).json({success:false,message:"Invoice not found"})
                };            

                res.status(200).json({success:true,message:"Data fetched successfully",data:findInvoice});
            }catch(error){
                return res.status(500).json({succcess:false,message:"Internal server error"})
            }
        }


        // This endpoint for admin
        export const getFullInvoice = async (req,res) => {
            try{

                const shopId = req.shop.id; 

                 if(!shopId){
                    return res.status(400).json({success:false,message:"Shop ID is not get"});
                }

                const fullInvoice = await invoiceModel.find({shop:shopId,invoiceStatus:"paid"}).populate("customer").populate("products");

                res.status(200).json({success:true,message:"Data fetched Successfully",data:fullInvoice})
            }catch(error){
               
                res.status(500).json({success:false,message:"Internal server error"})
            }
        }

