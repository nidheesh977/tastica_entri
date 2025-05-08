import AdminStaffModel from '../model/adminAndStaffModel.js';
import invoiceModel from '../model/invoiceModel.js';
import productModel from '../model/productModel.js';
import { generateInvoiceId } from '../utils/generateInvoiceId.js';


export const createNewInvoiceTab = async (req,res) => {
    try{
      const userId= req.user.id
            
      if(!userId){
        return res.status(400).json({success:false,message:"Staff ID is required"})
      }

      const staffExist = await AdminStaffModel.findById(userId)

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
        const {id} = req.params;
        const {productId,quantity,productTotalPrice} = req.body;

        if( !quantity || !productTotalPrice){
            return res.status(400).json({success:false,message:"All fields are required"})
        }

        if(isNaN(quantity) || isNaN(productTotalPrice)){
            return res.status(400).json({success:false,message:"Quantity and product total price must be a number"})
        }

        const invoiceExist = await invoiceModel.findById(id);

        if(!invoiceExist){
            return res.status(400).json({success:false,message:"Invoice not found"})
        }

   let invoiceProductExist =  invoiceExist.products.find((item) => item.productId.toString() === productId)
      
        if(invoiceProductExist){
            return res.status(400).json({success:false,message:"product already exist"})
        }
       
        const productExist = await productModel.findById(productId);
         
        if(!productExist){
            return res.status(400).json({success:false,message:"Product does not exist"})

        }  

        await productModel.findByIdAndUpdate(productId,{quantity: productExist.quantity - quantity},{new:true})

        const productName = productExist.productname;

       

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
        const {id,productId} = req.params;

        const invoiceExist = await invoiceModel.findById(id);

        if(!invoiceExist){
            return res.status(400).json({success:false,message:"Invoice not found"})
        }

        const findProduct = invoiceExist.products.find((item) => item._id.toString() === productId.toString())

        if(!findProduct){
            return res.status(400).json({success:false,message:"Product not found in invoice"})
        }

        const findProductForUpdate = await productModel.findById(findProduct.productId)
        
        findProductForUpdate.quantity += findProduct.quantity
        findProductForUpdate.save()

        invoiceExist.totalamount -= findProduct.productTotalPrice;
        await invoiceExist.save()
   
         const productRemove = await invoiceModel.findByIdAndUpdate(id,{$pull:{products:{_id:productId}}},{new:true})
    
        if(!productRemove){
            return res.status(400).json({success:false,message:"Product not found"})
        }

        res.status(200).json({success:true,message:"Product removed successfully",})
        
    }catch(error){
        console.log(error)
       return res.status(500).json({success:false,message:"internal server error"})
    }
}


export const saveInvoice = async (req,res) => {
    try{

      const {id} = req.params;

      const invoiceSave = await invoiceModel.findByIdAndUpdate(id,{status:"saved"},{new:true})

      res.status(200).json({success:true,message:"Invoice saved",data:invoiceSave})
    }catch(error){
        return res.status(500).json({success:false,message:"internal server error"})
    }
} 