import AdminStaffModel from '../model/adminAndStaffModel.js';
import categoryModel from '../model/categoryModel.js';
import customerModel from '../model/customerModel.js';
import invoiceModel from '../model/invoiceModel.js';
import productModel from '../model/productModel.js';
import { calculateDiscount, toDecimal } from '../utils/calculateInvoice.js';
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
        const {id} = req.params;
        const {productId,quantity} = req.body;



        if(!id){
            return res.status(400).json({success:false,message:"Invoice ID not get"})
        }



        const existInvoice = await invoiceModel.findById(id);

         if(!existInvoice){
            return res.status(400).json({success:false,message:"No Invoice"})
        }

        const productExist = await productModel.findById(productId)

       
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
           
 
        const addProduct = {
            productName:productExist.productName,
            price:productPrice,
            total:toDecimal(productTotalPrice),
            discountFromProduct:productExist.discount,
            discountFromCategory:getDiscount,
            quantity,
            discountType:"percentage",
            productId:productId 
        } 
      
         const totalDiscountAmount = calculateDiscount(addProduct.total,addProduct.discountType,addProduct.discountFromProduct,addProduct.discountFromCategory)
         const finalDiscountValue = parseFloat(existInvoice.totalDiscount) + totalDiscountAmount;
         const subTotal =   parseFloat(existInvoice.subTotal) +  productTotalPrice ;
         const subTotalReduceDiscount = finalDiscountValue > 0 ? subTotal - finalDiscountValue : subTotal;

        const newObject = {...addProduct,productDiscount:toDecimal(totalDiscountAmount)}
         existInvoice.products.push(newObject);
         existInvoice.set("totalDiscount",toDecimal(finalDiscountValue))
         existInvoice.set("subTotal",toDecimal(subTotalReduceDiscount))
         existInvoice.set("totalAmount",toDecimal(subTotalReduceDiscount))
         
        
         await existInvoice.save();
 
  
        res.status(200).json({success:true,message:"product Added successfully",data:existInvoice})
    }catch(error){
        console.log(error)
       return res.status(500).json({ success: false, message: 'Internal server error' });
    } 
}