import mongoose from 'mongoose'

const customProductSchema = new mongoose.Schema({
    
    productName:{
        type:String,
        required:true,
    },
    quantity:{
        type:Number,
        required:true
    },
    sellingPrice:{
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
    shop:{
        type:String,
        required:true
    },
    unit:{
        type:String,
        enum:['number','kg','li','m'],
        default:'number'
    },
    isCustomProduct:{
        type:Boolean,
        default:false
    }
   
},{timestamps:true});



const customProductModel = mongoose.model('CustomProduct',customProductSchema);

export default customProductModel