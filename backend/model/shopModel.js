import mongoose from 'mongoose';


 const shopSchema = new mongoose.Schema({
    shopname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }
 },{timestamps:true});

 const shopModel = mongoose.model('Shop',shopSchema);

 export default shopModel;