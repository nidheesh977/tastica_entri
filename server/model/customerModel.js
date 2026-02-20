import mongoose from "mongoose"

const encryptedFieldSchema = new mongoose.Schema({
    encryptedData: String,
    iv: String,
    authTag: String,
    version: String
}, { _id: false })

const addressSchema = new mongoose.Schema({
    label: { type: String },
    addressLine1: { type: String, required: true },
    addressLine2: { type: String },
    city: { type: String, required: true },
    state: { type: String },
    postalCode: { type: String, required: true },
    country: { type: String, required: true }
})

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
        index: true
    },
    phone: encryptedFieldSchema,
    phoneHash: {
        type: String,
        required: true,
        index: true
    },
    maskPhoneNumber: {
        type: String,
        default: "********"
    },
    isActive: {
        type: Boolean,
        default: true
    },
    inActiveReason: {
        type: String,
        default: null
    },

    billingAddresses: [addressSchema],
    shippingAddresses: [addressSchema],

    defaultBillingAddress: { type: mongoose.Types.ObjectId },
    defaultShippingAddress: { type: mongoose.Types.ObjectId },
    notes: { type: String },

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
        enum: ["shop", "customer", "customInvoice"],
        default: "customer"
    },

    shopId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop",
    },

    invoices: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Invoice"
    }]
}, { timestamps: true })
customerSchema.index({ shopId: 1, phoneHash: 1 })
customerSchema.index({ shopId: 1, customerId: 1, }, { unique: true })
customerSchema.index({ shopId: 1, role: 1 })


const customerModel = mongoose.model('Customer', customerSchema);

export default customerModel