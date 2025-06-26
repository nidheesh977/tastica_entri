import mongoose from 'mongoose';
//  import {productMocks} from '../mockdatas/productMock.js'

const productSchema = new mongoose.Schema({
   product_id:{
        type:String,
        required:true,
    },
    
    productName:{
        type:String,
        required:true,
    },
    quantity:{
        type:Number,
        required:true
    },
    costPrice:{
         type:Number,
        default:0,
    },
    sellingPrice:{
        type:Number,
        default:0,
    },
    discountType:{
        type:String,
        default:"percentage"
    },
    discount:{
        type:Number,
        default:0,
    },
    countryName:{
        type:String,
        required:true
    },
    currencyCode:{
        type:String,
        required:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category", 
    },
    shop:{
        type:String,
        required:true
    },
    costPriceProfit:{
       type:Number,
        default:0,
    },
    unit:{
        type:String,
        enum:['no','kg','lt','m'],
        default:'no'
    }, 
    
    productTax:{
        type:Number,
        default:0
    },

    isActive:{
        type:Boolean,
        default:false
    },
    loyalityRate:{
        type:Number,
        default:0
    }

},{timestamps:true});

productSchema.index({product_id:1,productName:1},{unique:true})

const productModel = mongoose.model('Product',productSchema);

 
 
  export default productModel;

//   for (const item of productMocks){
//     item["countryName"] = "Maldives"
//     item["currencyCode"] = "MVR"
//     item["shop"] = "681b7807a4c3f4efb132bbc1"  
// }

//  productModel.insertMany(productMocks)
//  .then(() => {
//     console.log("all data inserted")
//     mongoose.disconnect()
//  }) 
//  .catch(err => {
//     console.log("error inserting",err)
//  }) 