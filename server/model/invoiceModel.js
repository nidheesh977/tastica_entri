import mongoose from 'mongoose';


export const convertStringToId = (id) => {
    return new mongoose.Types.ObjectId(id)
}


const invoiceSchema = new mongoose.Schema({
    invoiceNumber: {
        type: String,
        required: true,
        unique: true
    },
    staff: {
        type:String,
        required:true 
    },

    products: {
        type:[
         {
            productName: {type:String,required:true},
            quantity: {type:Number,default:0},
            price:{type:mongoose.Types.Decimal128},
            total:{type:mongoose.Types.Decimal128,},
            productId:{type:mongoose.Schema.Types.ObjectId,ref:"Product", },
            productDiscount:{type:mongoose.Types.Decimal128},
            discountFromCategory:{type:Number,default: 0},
            discountFromProduct:{type:Number,default:0},
            discountType:{type:String,enum:["percentage","flat"],default:"percentage"}
         }   
        ],
        default:[]
    },

    totalDiscount:{type:mongoose.Types.Decimal128,
        default: 0.00
    },
    subTotal:{ type:mongoose.Types.Decimal128,
        default: 0.00
    },

   status:{
        type: String,
        enum: ["newtab", "saved", "paid", "unpaid"],
        default: "newtab"
    },

    totalAmount:{
       type:mongoose.Types.Decimal128,
        default: 0.00
    }
},{timestamps:true})

 const invoiceModel = mongoose.model('Invoice', invoiceSchema);

 export default invoiceModel;