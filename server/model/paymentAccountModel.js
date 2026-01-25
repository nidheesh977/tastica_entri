import mongoose from "mongoose"


const paymentAccountSchema = new mongoose.Schema({
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop",
        required: true
    },
    accountType: {
        type: String,
        enum: ["bank", "cash"],
        default: "cash",
        required: true,
    },
    accountNumber: {
        type: String,
        default: null,
    },
    accountTitle: {
        type: String,
        required: true,
        trim: true,
        set: (str) => typeof str === "string" ? str.replace(/\s+/g, " ") : str
    },
    accountTitleLowerCase: {
        type: String,
        trim: true,
        lowercase: true,
        set: (str) => typeof str === "string" ? str.replace(/\s+/g, " ") : str
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isAccountNumber: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

paymentAccountSchema.index({ shop: 1 })

const PaymentAccountModel = mongoose.model("Account", paymentAccountSchema);

export default PaymentAccountModel;