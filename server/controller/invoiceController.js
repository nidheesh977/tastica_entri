import AdminStaffModel from '../model/adminAndStaffModel.js';
import categoryModel from '../model/categoryModel.js';
import customerModel from '../model/customerModel.js';
import customProductModel from '../model/customProductModel.js';
import invoiceModel from '../model/invoiceModel.js';
import loyalityPointModel from '../model/loyalityPointModel.js';
import productModel from '../model/productModel.js';
import { calculateDiscount} from '../utils/calculateInvoice.js';
import { generateId } from '../utils/generateId.js';


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
            currencyCode
        });

        await newInvoice.save();

        const findInvoice = await invoiceModel.findOne({_id:newInvoice._id}).populate('customer')

        res.status(201).json({success:true,message:"Invoice created successfully",data:findInvoice})
    }catch(error){
      
     return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}


// add product to invoice


export const addProductToInvoice = async (req,res) => {
    try{
        const {invoiceId} = req.params;
        const {productId,quantity} = req.body;

      
    
        if(!invoiceId){
            return res.status(400).json({success:false,message:"Invoice ID not get"})
        }

        
        if(!productId){
            return res.status(400).json({success:false,message:"Product ID not get"})
        }

        if(!quantity){
            return res.status(400).json({success:false,message:"Quantity not get"})
        }

        const existInvoice = await invoiceModel.findById(invoiceId);

         if(!existInvoice){
            return res.status(400).json({success:false,message:"No Invoice"})
        } 

        if(existInvoice.paymentStatus === "success"){
            return res.status(400).json({success:false,message:"Invoice already paid"})
        }
 
        // This variable for the product was exist
        let productExist;
 
         productExist = await productModel.findById(productId)
        

        if(!productExist){
           productExist = await customProductModel.findById(productId)
        }       

        if(quantity > productExist.quantity ){
            return res.status(400).json({success:false,message:"Requested quantity exceeds available stock"})
        }

     
        // for get category discount
        const findCategory = await categoryModel.findOne({_id:productExist?.category})
        const getDiscount = findCategory?.discountRate || 0;

        let findInvoiceProduct = existInvoice.products.find(item => item.productId.toString() === productId)
        
        
        let productPrice; 

        if(productExist?.costPrice > 0 ){
            productPrice = productExist?.costPrice 
        }else if(productExist?.sellingPrice > 0 ){
            productPrice = productExist?.sellingPrice 
        }

       let productTotalPrice;

        if(productExist?.costPrice > 0 ){
            productTotalPrice = productPrice * quantity
        }else if(productExist?.sellingPrice > 0 ){
            productTotalPrice = productPrice * quantity
        }
           
                
        const addProduct = {
            productName:productExist?.productName,
            price:productPrice,
            total:productTotalPrice,
            discountFromProduct:parseFloat(productExist?.discount || 0).toFixed(2),
            discountFromCategory:parseFloat(getDiscount).toFixed(2),
            quantity:parseFloat(quantity).toFixed(2),
            discountType:productExist?.discountType || "percentage",
            productId:productId,
            category:findCategory?.categoryName || "custom product",
            unit:productExist.unit,
            customProduct:productExist?.isCustomProduct || false
        } 

        

 
     if(!findInvoiceProduct){ 

       
         
         // calculate discount
         const totalDiscountAmount = calculateDiscount(addProduct.total,addProduct.discountType,parseFloat(addProduct.discountFromProduct),parseFloat(addProduct.discountFromCategory))
        
        //  add discount to Total discount
         const finalDiscountValue = existInvoice?.totalDiscount  + parseFloat(totalDiscountAmount);
        
        //  add subtotal  
         const subTotal =  existInvoice.subTotal +  productTotalPrice ;

          // substract discount from  total 
         const subTotalReduceDiscount = finalDiscountValue > 0 ? subTotal - totalDiscountAmount : subTotal;

         
         const newObject = {...addProduct,productDiscount:parseFloat(totalDiscountAmount).toFixed(2)}
         existInvoice.products.push(newObject);
         existInvoice.set("totalDiscount",parseFloat(finalDiscountValue).toFixed(2))
         existInvoice.set("subTotal", parseFloat(subTotalReduceDiscount).toFixed(2))
         existInvoice.set("totalAmount", parseFloat(subTotalReduceDiscount).toFixed(2))
          
        
         await existInvoice.save();
 
  
         res.status(200).json({success:true,message:"product Added successfully",data:existInvoice})
      
        }else if(findInvoiceProduct?.customProduct === true){
            return res.status(400).json({success:false,message:"Custom product cannot be change quantity"})
        }
        // This condition for increase quantity than change values
        else if( quantity > findInvoiceProduct.quantity){
 
           
             // calculate discount
             const calculateDiscountAmount = calculateDiscount(productTotalPrice, findInvoiceProduct.discountType, findInvoiceProduct.discountFromProduct, findInvoiceProduct.discountFromCategory)
            
             //  add discount to Total discount
             const finalDiscountValue = existInvoice.totalDiscount - findInvoiceProduct.productDiscount + calculateDiscountAmount;

              
            //  add subtotal 
             const finalSubTotal = existInvoice.subTotal + findInvoiceProduct.productDiscount -  findInvoiceProduct.total + productTotalPrice;
           
             //  add  total
             const finalTotalAmount = existInvoice.subTotal + findInvoiceProduct.productDiscount -  findInvoiceProduct.total + productTotalPrice;
            
             // substract discount from sub total 
             const finalSubTotalReduceDiscount = finalDiscountValue > 0 ? finalSubTotal - calculateDiscountAmount : finalSubTotal;
          
             // substract discount from  total 
             const finalTotalAmountReduceDiscount = finalDiscountValue > 0 ? finalTotalAmount - calculateDiscountAmount : finalTotalAmount;

              

            const updatedQuantity =   await invoiceModel.findOneAndUpdate({_id:invoiceId,"products._id":findInvoiceProduct._id }, {
                            $set:{
                                "products.$.quantity":quantity,
                                "products.$.total":productTotalPrice,
                                "products.$.productDiscount":parseFloat(calculateDiscountAmount).toFixed(2),
                                totalDiscount:parseFloat(finalDiscountValue).toFixed(2),
                                subTotal:parseFloat(finalSubTotalReduceDiscount).toFixed(2),
                                totalAmount:parseFloat(finalTotalAmountReduceDiscount).toFixed(2)
                            }
                        },{new:true})

         res.status(200).json({success:true,message:"Quantity Updated",data:updatedQuantity})
        }
        
        else if(quantity < findInvoiceProduct.quantity){

        
            // calculate discount
            const calculateDiscountAmount = calculateDiscount(productTotalPrice, findInvoiceProduct.discountType, findInvoiceProduct.discountFromProduct, findInvoiceProduct.discountFromCategory)
                 
            //  add discount to Total discount
            const finalDiscountValue = existInvoice.totalDiscount - findInvoiceProduct.productDiscount +  calculateDiscountAmount;

            //  add subtotal 
            const finalSubTotal = existInvoice.subTotal + findInvoiceProduct.productDiscount - findInvoiceProduct.total + productTotalPrice;
       
            //  add  total
            const finalTotalAmount = existInvoice.subTotal + findInvoiceProduct.productDiscount - findInvoiceProduct.total + productTotalPrice

             
            // substract discount from sub total 
            const finalSubTotalReduceDiscount = finalDiscountValue > 0 ? finalSubTotal - calculateDiscountAmount : finalSubTotal;
           // substract discount from  total 
            const finalTotalAmountReduceDiscount = finalDiscountValue > 0 ? finalTotalAmount - calculateDiscountAmount : finalTotalAmount;

             

            const updatedQuantity =  await invoiceModel.findOneAndUpdate({_id:invoiceId,"products._id":findInvoiceProduct._id }, {
                                            $set:{
                                  "products.$.quantity":quantity,
                                  "products.$.total":productTotalPrice,
                                  "products.$.productDiscount":parseFloat(calculateDiscountAmount).toFixed(2),
                                  totalDiscount:parseFloat(finalDiscountValue).toFixed(2),
                                  subTotal:parseFloat(finalSubTotalReduceDiscount).toFixed(2),
                                  totalAmount:parseFloat(finalTotalAmountReduceDiscount).toFixed(2)
                                 }
                  },{new:true})


        return res.status(200).json({success:true,message:"Quantity updated",data:updatedQuantity})
        }
        
       
      
    }catch(error){

       return res.status(500).json({ success: false, message: 'Internal server error' });
    } 
}
 

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
         const newTotalAmount = findInvoice.totalAmount  + productDiscount - productTotal;

         const removeProduct = await invoiceModel.findByIdAndUpdate(invoiceId,{
                $pull: { products: { _id: productsId } },
                totalDiscount: parseFloat(newTotalDiscount).toFixed(2),
                subTotal: parseFloat(newSubTotal).toFixed(2),
                totalAmount: parseFloat(newTotalAmount).toFixed(2)
                },{new:true});

         res.status(200).json({success:true,message:"Product removed successfully",data:removeProduct})

        }catch(error){
        
        return res.status(500).json({ success: false, message: 'Internalerver error' });
            }
        }



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

