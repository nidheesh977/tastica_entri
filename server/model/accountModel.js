import mongoose from "mongoose";


const accountSchema = new mongoose.Schema({
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop",
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        enum: ["ASSET", "LIABILITY", "INCOME", "EXPENSE", "EQUITY"],
        required: true
    },
    category: {
        type: String,
        enum: ["SALES", "PURCHASE", "CASH", "BANK", "COGS", "OTHER"],
        default: "OTHER"
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isSystem: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

accountSchema.index({ shop: 1, name: 1 })

const AccountModel = mongoose.model("Account", accountSchema);



export default AccountModel