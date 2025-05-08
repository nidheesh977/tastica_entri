import mongoose from 'mongoose';


 const shopSchema = new mongoose.Schema({
    shopName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }, 
    password:{
        type:String,
        required:true
    },
    countryName:{
        type:String,
        required:true
    },
    currencyCode:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    }
 },{timestamps:true});

 const shopModel = mongoose.model('Shop',shopSchema);

 export default shopModel;