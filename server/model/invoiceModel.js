import mongoose from 'mongoose';


const invoiceSchema = new mongoose.Schema({
    invoicenumber: {
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
            productname: {
               type:String,
               required:true
            },
            quantity: {
                type: Number,
                default:0
            },

            productTotalPrice:{
                type: Number,
                default: 0,
            },
            productId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product", 
            }
         }   
        ],
        default:[]
    },

    status:{
        type: String,
        enum: ["newtab", "saved", "paid", "unpaid"],
        default: "newtab"
    },

    totalamount:{
        type: Number,
        default: 0
    }
})

 const invoiceModel = mongoose.model('Invoice', invoiceSchema);

 export default invoiceModel;