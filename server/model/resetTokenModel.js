import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
               ref:"User",

    },
    resetToken:{
        type:String,
        required:true

    },
    expiresAt:{
        type:Date,
        required:true
    },
},{timestamps:true})

const resetTokenModel = mongoose.model("tokenReset",otpSchema);

export default resetTokenModel