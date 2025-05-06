import mongoose from "mongoose"


const customerSchema = new mongoose.Schema({
    customerId:{
        type:String,
        required:true,
        unique:true
    },
    customerName:{
        type:String,
        required:true,
    },
    phoneNumber:{
        type:String,
        required:true,
        unique:true
    },
    loyalityPoint:{
        type:Number,
        default:0
    },
    isActive:{
        type:Boolean,
        default:false
    }
})

const customerModel = mongoose.model('Customer',customerSchema);

export default customerModel