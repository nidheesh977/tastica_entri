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
    },
    pointAmount:{
        type:Number,
        default:0
    },

    loyalityPointHistory:{
        type:[{
              action:{type:String,enum:["earn","redeem"],default:null},
              redeemOrEarn:{type:Number,default:0},
              createdAt:{type:Date,default:Date.now},
              invoice:{type:mongoose.Schema.Types.ObjectId,ref:"Invoice"},     
        }],
        default:[]
    },

    invoices:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Invoice"
        }]
},{ timestamps: true } )

customerSchema.index({customerId:1,phoneNumber:1})

const customerModel = mongoose.model('Customer',customerSchema);

export default customerModel