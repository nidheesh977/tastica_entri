import mongoose from 'mongoose';


const loyaltySchema = new mongoose.Schema({
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop"
    },
    countryName: {
        type: String,
        required: true
    },
    currencyCode: {
        type: String,
        required: true
    },
    loyaltyRate: {
        type: Number,
        required: true,
        default: 0
    }
})

const loyaltyPointModel = mongoose.model("loyaltyPoint", loyaltySchema)

export default loyaltyPointModel