import mongoose from "mongoose"



const customerSchema = new mongoose.Schema({
    customerId:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    customerName:{
        type:String,
        required:true,
        index:true,
    },
    phoneNumber:{
        type:String,
        required:true,
        unique:true,
        index:true
    },
    loyalityPoint:{
        type:Number,
        default:0
    },
    
    shopId:{
        type:mongoose.Schema.Types.ObjectId,
         ref:"Shop", 
    },

    isActive:{
        type:Boolean,
        default:false
    }
},{ timestamps: true } )

customerSchema.index({customerId:1,phoneNumber:1})

const customerModel = mongoose.model('Customer',customerSchema);

export default customerModel