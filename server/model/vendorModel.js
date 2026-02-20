import mongoose from "mongoose"

const encryptedFieldSchema = new mongoose.Schema({
    encryptedData: String,
    iv: String,
    authTag: String,
    version: String
}, { _id: false })


const vendorSchema = new mongoose.Schema({
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop",
        required: true
    },
    vendorName: {
        type: String,
        required: true
    },
    vendorNameLowerCase: {
        type: String,
        required: true,
        lowercase: true,
        set: (str) => typeof str === "string" ? str.trim().toLowerCase().replace(/\s+/g, " ") : str
    },
    email: {
        type: String,
        required: true,
    },
    char: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    inActiveReason: {
        type: String,
        default: null
    },
    phoneNumber: encryptedFieldSchema,
    address: encryptedFieldSchema,
    maskPhoneNumber: {
        type: String,
        default: "********"
    },
    maskAddress: {
        type: String,
        default: "...."
    }

}, { timestamps: true })

vendorSchema.index({ shop: 1, vendorNameLowerCase: 1 }, { unique: true });

const VendorModel = mongoose.model("Vendor", vendorSchema);

export default VendorModel