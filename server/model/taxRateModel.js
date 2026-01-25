import mongoose from "mongoose";


const taxRateSchema = new mongoose.Schema({
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop",
        required: true
    },
    currencyCode: {
        type: String,
        required: true,
        uppercase: true,
        set: (str) => typeof str === "string" ? str.replace(/\s+/g, " ") : str
    },
    taxRates: {
        type: [{
            taxCodeName: { type: String, required: true, trim: true },
            rate: { type: Number, min: 0 },
            taxNameLowerCase: {
                type: String,
                required: true,
                lowercase: true,
                set: (str) => typeof str === "string" ? str.replace(/\s+/g, " ") : str
            },
            isActive: { type: Boolean, default: true }
        }],
        default: []
    },
    isCreated: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

taxRateSchema.index({ shop: 1, "taxRates._id": 1 }, { unique: true })

const TaxRateModel = mongoose.model("TaxRate", taxRateSchema)

export default TaxRateModel