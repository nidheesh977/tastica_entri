import mongoose from "mongoose"


const paymentAccountSchema = new mongoose.Schema({
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop",
        required: true
    },
    accountType: {
        type: String,
        enum: ["Bank", "Cash"],
        default: "Cash",
        required: true,
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
}, { timestamps: true })

paymentAccountSchema.index({ shop: 1 })

const PaymentAccountModel = mongoose.model("Account", paymentAccountSchema);

export default PaymentAccountModel;