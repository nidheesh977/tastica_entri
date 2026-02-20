import mongoose from "mongoose";


const taxBreakeUpSchema = new mongoose.Schema({
    cgst: {
        type: Number,
        default: undefined
    },
    sgst: {
        type: Number,
        default: undefined
    },
    igst: {
        type: Number,
        default: undefined
    },
}, { _id: false })

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
            taxType: { type: String, enum: ["GST", "VAT", "SALES_TAX", "ZERO"], required: true },
            rate: { type: Number, min: 0 },
            taxNameLowerCase: {
                type: String,
                required: true,
                lowercase: true,
                set: (str) => typeof str === "string" ? str.trim().toLowerCase().replace(/\s+/g, " ") : str
            },
            isActive: { type: Boolean, default: true },
            inActiveReason: {
                type: String,
                default: null
            },
            taxBreakup: {
                type: taxBreakeUpSchema,
                default: null
            },
            country: {
                type: String,
                default: null,
            }, state: {
                type: String,
                default: null
            },
            isButton: {
                type: Boolean,
                default: null
            }
        }],
        default: [null]
    },
    isCreated: {
        type: Boolean,
        default: false
    },

}, { timestamps: true })

taxRateSchema.index({ shop: 1, "taxRates._id": 1 }, { unique: true })

const TaxRateModel = mongoose.model("TaxRate", taxRateSchema)

export default TaxRateModel