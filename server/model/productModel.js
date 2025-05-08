import mongoose from 'mongoose';
//  import {productMocks} from '../mockdatas/productMock.js'

const productSchema = new mongoose.Schema({
   product_id:{
        type:String,
        required:true,
        unique:true,
    },
    
    productname:{
        type:String,
        required:true,
        unique:true,
    },
    quantity:{
        type:Number,
        required:true
    },
    costprice:{
        type:Number,
        default:0,
    },
    sellingprice:{
        type:Number,
        default:0,
    },
    discount:{
        type:Number,
        default:0,
    },
    category:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Category", 
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

//  productModel.insertMany(productMocks)
//  .then(() => {
//     console.log("all data inserted")
//     mongoose.disconnect()
//  }) 
//  .catch(err => {
//     console.log("error inserting",err)
//  })