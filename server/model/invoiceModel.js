import mongoose from 'mongoose';


export const convertStringToId = (id) => {
    return new mongoose.Types.ObjectId(id)
}


const invoiceSchema = new mongoose.Schema({
    invoiceNumber: {
        type: String,
        required: true,
        
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
            price:{type:Number,default:0},
            total:{type:Number,default:0},
            productId:{type:mongoose.Schema.Types.ObjectId,ref:"Product", },
            productDiscount:{type:Number,default:0},
            discountFromCategory:{type:Number,default: 0},
            discountFromProduct:{type:Number,default:0},
            discountType:{type:String,enum:["percentage","flat"],default:"percentage"}
         }   
        ],
        default:[]
    },

    totalDiscount:{
        type:Number,
        default: 0.00
    },
    subTotal:{
         type:Number,
         default: 0.00
    },

   invoiceStatus:{
        type: String,
        enum: ["newtab", "saved" , "paid"],
        default: "saved"
    },

    paymentStatus:{
        type:String,
        enum:["pending","success","failed","refunded"],
        required:true,
        default:"pending" 
    },

    paymentMethod:{
      type:String,
      enum:["cash","digital"],
      reqired:true,
      default:null,
    },

    totalAmount:{
       type:Number,
        default: 0.00
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

    redeemAmount:{
        type:Number,
        default:0
    },

    customer:{
        type:mongoose.Schema.Types.ObjectId,
            ref:"Customer", 
    }
},{timestamps:true})

invoiceSchema.index({invoiceNumber:1})

 const invoiceModel = mongoose.model('Invoice', invoiceSchema);

 export default invoiceModel;