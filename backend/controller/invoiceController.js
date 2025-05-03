import AdminStaffModel from '../model/adminAndStaffModel.js';
import invoiceModel from '../model/invoiceModel.js';
import productModel from '../model/productModel.js';
import { generateInvoiceId } from '../utils/generateInvoiceId.js';


export const createNewInvoiceTab = async (req,res) => {
    try{
      const staffId= req.admin.id || req.user.id
            
      if(!staffId){
        return res.status(400).json({success:false,message:"Staff ID is required"})
      }

      const staffExist = await AdminStaffModel.findById(staffId)

      if(!staffExist){
        return res.status(400).json({success:false,message:"Staff does not exist"})
      }

      const staffName = `${staffExist.username} (${staffExist.role})`;
        
       const invoiceId = generateInvoiceId();

       const invoiceIdExist = await invoiceModel.findOne({invoicenumber:invoiceId});

       if(invoiceIdExist){
        generateInvoiceId()
       }

        const newInvoice =  invoiceModel({
            invoicenumber:invoiceId,
            staff:staffName,
        });

        await newInvoice.save()

        res.status(201).json({success:true,message:"Invoice created successfully",data:newInvoice})
    }catch(error){

    }
}

export const addProductToInvoice = async (req,res) => {
    try{
        const {invoiceId} = req.params;
        const {productId,quantity,productTotalPrice} = req.body;

        if( !quantity || !productTotalPrice){
            return res.status(400).json({success:false,message:"All fields are required"})
        }

        if(isNaN(quantity) || isNaN(productTotalPrice)){
            return res.status(400).json({success:false,message:"Quantity and product total price must be a number"})
        }
       
        const productExist = await productModel.findById(productId);
         
        if(!productExist){
            return res.status(400).json({success:false,message:"Product does not exist"})

        } 

        await productModel.findByIdAndUpdate(productId,{quantity: productExist.quantity - quantity},{new:true})

        const productName = productExist.productname;

        const invoiceExist = await invoiceModel.findById(invoiceId);

        if(!invoiceExist){
            return res.status(400).json({success:false,message:"Invoice not found"})
        }

        const productObject = {
            productname: productName,
            quantity,
            productTotalPrice,
            productId
        }

        invoiceExist.products.push(productObject)
        invoiceExist.totalamount += productObject.productTotalPrice
        await invoiceExist.save()

        res.status(200).json({success:true,message:"Product added successfully",data:invoiceExist})
    }catch(error){
        console.log(error)
        return res.status(500).json({success:false,message:"internal server error"})

    }
}

export const removeProductFromInvoice = async(req,res) => {
    try{
        const {invoiceId,invoiceProductId} = req.params;

        const invoiceExist = await invoiceModel.findById(invoiceId);

        if(!invoiceExist){
            return res.status(400).json({success:false,message:"Invoice not found"})
        }

        const findProduct = invoiceExist.products.find((item) => item._id.toString() === invoiceProductId.toString())

        if(!findProduct){
            return res.status(400).json({success:false,message:"Product not found in invoice"})
        }

        const findProductForUpdate = await productModel.findById(findProduct.productId)
        
        findProductForUpdate.quantity += findProduct.quantity
        findProductForUpdate.save()

        invoiceExist.totalamount -= findProduct.productTotalPrice;
        await invoiceExist.save()
   
         const productRemove = await invoiceModel.findByIdAndUpdate(invoiceId,{$pull:{products:{_id:invoiceProductId}}},{new:true})
    
        if(!productRemove){
            return res.status(400).json({success:false,message:"Product not found"})
        }

        res.status(200).json({success:true,message:"Product removed successfully",})
        
    }catch(error){
       return res.status(500).json({success:false,message:"internal server error"})
    }
}


export const saveInvoice = async (req,res) => {
    try{

        const {invoiceId} = req.params;

      const invoiceSave = await invoiceModel.findByIdAndUpdate(invoiceId,{status:"saved"},{new:true})

      res.status(200).json({success:true,message:"Invoice saved",data:invoiceSave})
    }catch(error){
        return res.status(500).json({success:false,message:"internal server error"})
    }
} 