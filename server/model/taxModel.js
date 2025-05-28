import mongoose from 'mongoose';


const taxSchema = mongoose.Schema({
    shop:{
        type:String,
        required:true,
    },
    countryName:{
         type:String,
        required:true,
    },
    currencyCode:{
         type:String,
        required:true,
    },
    taxRate:{
        type:Number,
        default:0
    },
    isActive:{
        type:Boolean,
        default:false
    }
});

const taxModel = mongoose.model('Tax',taxSchema);

export default taxModel;