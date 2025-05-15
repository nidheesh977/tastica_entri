import AdminStaffModel from '../model/adminAndStaffModel.js';
import categoryModel from '../model/categoryModel.js';
import customerModel from '../model/customerModel.js';
import invoiceModel from '../model/invoiceModel.js';
import productModel from '../model/productModel.js';
import { calculateDiscount} from '../utils/calculateInvoice.js';
import { generateInvoiceId } from '../utils/generateInvoiceId.js';


export const createNewInvoiceTab = async (req,res) => {
    try{
      const userId= req.user.id
      const {customerId} = req.params;  

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
         invoiceId = generateInvoiceId()
      } while (await invoiceModel.findOne({invoiceNumber:invoiceId}));

        const newInvoice =  invoiceModel({
            invoiceNumber:invoiceId,
            staff:staffName,
            customer:customerId,
        });

        await newInvoice.save();

        const findInvoice = await invoiceModel.findOne({_id:newInvoice._id}).populate('customer')

        res.status(201).json({success:true,message:"Invoice created successfully",data:findInvoice})
    }catch(error){
        console.log(error)
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

        const existInvoice = await invoiceModel.findById(invoiceId);

         if(!existInvoice){
            return res.status(400).json({success:false,message:"No Invoice"})
        } 

        const productExist = await productModel.findById(productId)

        if(!productExist){
            return res.status(400).json({success:false,message:"Product not exist"})
        }
     
        // for get gategory discount
        const findCategory = await categoryModel.findOne({_id:productExist.category})
        const getDiscount = findCategory.discountRate;

        let findProduct = existInvoice.products.find(item => item.productId.toString() === productId)
        
        if(findProduct){
            return res.status(400).json({success:false,message:"Product Already exist"})
        }

        findProduct = []
                // To check the values in it;
        let productPrice; 

        if(productExist.costPrice > 0 ){
            productPrice = productExist.costPrice + productExist.costPriceProfit
        }else if(productExist.sellingPrice > 0 ){
            productPrice = productExist.sellingPrice 
        }

       let productTotalPrice;

        if(productExist.costPrice > 0 ){
            productTotalPrice = productPrice * quantity
        }else if(productExist.sellingPrice > 0 ){
            productTotalPrice = productExist.sellingPrice * quantity
        }
           
         
         

          await productModel.findByIdAndUpdate(productId,{quantity:productExist.quantity - quantity},{new:true})
 

        const addProduct = {
            productName:productExist.productName,
            price:productPrice,
            total:productTotalPrice,
            discountFromProduct:productExist.discount,
            discountFromCategory:getDiscount,
            quantity:quantity,
            discountType:"percentage",
            productId:productId 
        } 

       

      
         const totalDiscountAmount = calculateDiscount(addProduct.total,addProduct.discountType,addProduct.discountFromProduct,addProduct.discountFromCategory)
         const finalDiscountValue = existInvoice.totalDiscount + totalDiscountAmount;
         const subTotal =  existInvoice.subTotal +  productTotalPrice ;
         const subTotalReduceDiscount = finalDiscountValue > 0 ? subTotal - totalDiscountAmount : subTotal;

        const newObject = {...addProduct,productDiscount:parseFloat(totalDiscountAmount).toFixed(2)}
         existInvoice.products.push(newObject);
         existInvoice.set("totalDiscount",parseFloat(finalDiscountValue).toFixed(2))
         existInvoice.set("subTotal", parseFloat(subTotalReduceDiscount).toFixed(2))
         existInvoice.set("totalAmount", parseFloat(subTotalReduceDiscount).toFixed(2))
         
        
         await existInvoice.save();
 
  
        res.status(200).json({success:true,message:"product Added successfully",data:existInvoice})
    }catch(error){
        console.log(error)
       return res.status(500).json({ success: false, message: 'Internalerver error' });
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

         const findProductFromProductModel = await productModel.findById(getProduct.productId);

         const increaseQuantiy = findProductFromProductModel.quantity + getProduct.quantity;

         await productModel.findByIdAndUpdate(findProductFromProductModel._id,{quantity:increaseQuantiy},{new:true})
            
         const productTotal = getProduct.total || 0;

         const productDiscount = getProduct.productDiscount || 0;

         const newSubTotal = findInvoice.subTotal  + productDiscount - productTotal;
         const newTotalDiscount = findInvoice.totalDiscount  - productDiscount;
         const newTotalAmount = findInvoice.totalAmount  + productDiscount - productTotal;

            const removeProduct = await invoiceModel.findByIdAndUpdate(invoiceId,{
                $pull: { products: { _id: productsId } },
                totalDiscount: newTotalDiscount,
                subTotal: newSubTotal,
                totalAmount: newTotalAmount
                },{new:true});

                res.status(200).json({success:true,message:"Product removed successfully",data:removeProduct})
        }catch(error){
        return res.status(500).json({ success: false, message: 'Internalerver error' });
            }
        }



        export const getInvoice = async (req,res) => {
            try{
              const {invoiceId} = req.params;

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