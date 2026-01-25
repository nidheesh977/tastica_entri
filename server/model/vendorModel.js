import mongoose from "mongoose"


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
    vendorEmail: {
        type: String,
        required: true,
    },
    char: {
        type: String,
        required: true
    },
    vendorPhoneNumber: {
        type: String,
        required: true,
    }

}, { timestamps: true })

vendorSchema.index({ shop: 1, vendorEmail: 1 }, { unique: true });

const VendorModel = mongoose.model("Vendor", vendorSchema);

export default VendorModel