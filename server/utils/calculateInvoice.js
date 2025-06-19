
export const calculateInvoiceTotal = (calculateDiscountAmount,existInvoice,findInvoiceProduct,productTotalPrice,calculateTaxAmount) => {
   
   //  add discount to Total discount
             const discountAmount = existInvoice.totalDiscount - findInvoiceProduct.productDiscount + calculateDiscountAmount;

             const taxAmountAfterUpdateQty =  existInvoice.totalTax - findInvoiceProduct.taxAmount + calculateTaxAmount
            //  add subtotal 
             const itemSubTotal = existInvoice.subTotal + findInvoiceProduct.productDiscount -  findInvoiceProduct.total + productTotalPrice;
           
             //  add  total
             const itemFullTotal = existInvoice.subTotal + findInvoiceProduct.productDiscount -  findInvoiceProduct.total + productTotalPrice;
            
             // substract discount from sub total 
             const subTotalAmount = discountAmount > 0 ? itemSubTotal - calculateDiscountAmount : itemSubTotal;
          
             // substract discount from  total 
             const totalAmount = discountAmount > 0 ? itemFullTotal - calculateDiscountAmount : itemFullTotal;
             
             const addTaxToTotalAmt = taxAmountAfterUpdateQty > 0 ? totalAmount + taxAmountAfterUpdateQty : totalAmount

     return {discountAmount,subTotalAmount,addTaxToTotalAmt,taxAmountAfterUpdateQty}
}