import mongoose from 'mongoose';
//  import {productMocks} from '../mockdatas/productMock.js'

const productSchema = new mongoose.Schema({
   product_id:{
        type:String,
        required:true,
        unique:true,
    },
    
    productName:{
        type:String,
        required:true,
        unique:true,
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

    isActive:{
        type:Boolean,
        default:false
    }

},{timestamps:true});

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