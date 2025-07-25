import mongoose from "mongoose"



const customerSchema = new mongoose.Schema({
    customerId: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    customerName: {
        type: String,
        required: true,
        index: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    loyalityPoint: {
        type: Number,
        default: 0
    },

    walletLoyaltyPoint: {
        type: Number,
        default: 0
    },

    role: {
        type: String,
        enum: ["shop", "customer"],
        default: "customer"
    },

    shopId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop",
    },

    isActive: {
        type: Boolean,
        default: false
    },

    invoices: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Invoice"
    }]
}, { timestamps: true })


const customerModel = mongoose.model('Customer', customerSchema);

export default customerModel