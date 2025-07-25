import mongoose from 'mongoose'

const Decimal128 = mongoose.Types.Decimal128;

export const toDecimal = (value) => {
    return Decimal128.fromString(value.toFixed(2))
    
}


export const calculateDiscount = ( price,discountType,productDiscount,categoryDiscount,quantity) => {

   
let discountAmount;
    if(productDiscount > 0 && categoryDiscount > 0 ){
        if(discountType === "percentage"){
         discountAmount = price * (productDiscount / 100) 
        let addcategory = price * (categoryDiscount / 100)
          discountAmount += addcategory
        }else if(discountType === "flat"){
          discountAmount = productDiscount * quantity 
        let addcategory =  categoryDiscount * quantity 
          discountAmount += addcategory
        }    
    }else if(productDiscount > 0){
         if(discountType === "percentage"){
         discountAmount = price * (productDiscount / 100)   
        }else if(discountType === "flat"){
          discountAmount = productDiscount * quantity  
        }
    }else if(categoryDiscount > 0){
         if(discountType === "percentage"){     
         discountAmount = price * (categoryDiscount / 100)
        }else if(discountType === "flat"){
        discountAmount = categoryDiscount * quantity
        }
    }else if(productDiscount === 0 && categoryDiscount === 0 ){
        if(discountType === "percentage"){
          discountAmount  = productDiscount 
          discountAmount = categoryDiscount
        }else if(discountType === "flat"){
          discountAmount  = productDiscount 
          discountAmount = categoryDiscount  
        }  
    } 

       return  discountAmount ;
}