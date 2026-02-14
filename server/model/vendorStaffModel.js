import mongoose from "mongoose"

const encryptedFieldSchema = new mongoose.Schema({
    encryptedData: String,
    iv: String,
    authTag: String,
    version: String
}, { _id: false })

const vendorStaffSchema = new mongoose.Schema({
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Shop"
    },
    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Vendor"
    },
    staffName: {
        type: String,
        required: true,
    },
    email: {
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
    maskPhoneNumber: {
        type: String,
        default: "********"
    },
}, { timestamps: true })

vendorStaffSchema.index({ shop: 1, vendor: 1, })

export const VendorStaffModel = mongoose.model("VendorStaff", vendorStaffSchema)