import mongoose from 'mongoose';


const loaylitySchema = new mongoose.Schema({
    shop:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Shop"
    },
    countryName:{
        type:String,
        required:true
    },
    currencyCode:{
        type:String,
        required:true
    },
    loyalityRate:{
        type:Number,
        required:true,
        default:0
    }
})

const loyalityPointModel = mongoose.model("loyalityPoint",loaylitySchema)

export default loyalityPointModel