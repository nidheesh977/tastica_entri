import mongoose from 'mongoose'

const Decimal128 = mongoose.Types.Decimal128;

export const toDecimal = (value) => {
    return Decimal128.fromString(value.toFixed(2))
    
}


export const calculateDiscount = ( price,discountType,productDiscount,categoryDiscount) => {
  
   
let discountAmount;
    if(productDiscount > 0 && categoryDiscount > 0 ){
        if(discountType === "percentage"){
         discountAmount = price * (productDiscount / 100) 
        let addcategory = price * (categoryDiscount / 100)
          discountAmount += addcategory
        }else if(discountType === "flat"){
          discountAmount = parseFloat(productDiscount) 
        let addcategory = parseFloat(categoryDiscount)
          discountAmount += addcategory
        }    
    }else if(productDiscount > 0){
         if(discountType === "percentage"){
         discountAmount = price * (productDiscount / 100)     
        }else if(discountType === "flat"){
          discountAmount = parseFloat(productDiscount)      
        }
    }else if(categoryDiscount > 0){
         if(discountType === "percentage"){     
         discountAmount = price * (categoryDiscount / 100)
        }else if(discountType === "flat"){
        discountAmount = parseFloat(categoryDiscount)  
        }
    }else if(parseInt(productDiscount) === 0 && categoryDiscount === 0 ){
        if(discountType === "percentage"){
          discountAmount  = parseFloat(productDiscount) 
          discountAmount = parseFloat(categoryDiscount)
        }else if(discountType === "flat"){
          discountAmount  = parseFloat(productDiscount) 
          discountAmount = parseFloat(categoryDiscount)  
        }  
    } 

       return  discountAmount ;
}