import mongoose from 'mongoose';


export const checkObjectId = (id) => {
    return mongoose.Types.ObjectId.isValid(id)
}


const invoiceSchema = new mongoose.Schema({
    invoiceNumber: {
        type: String,
        required: true,
    },
    staff: {
        type: String,
        required: true
    },

    products: {
        type: [
            {
                productName: { type: String, required: true },
                quantity: { type: Number, default: 0 },
                price: { type: Number, default: 0 },
                total: { type: Number, default: 0 },
                productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", },
                productDiscount: { type: Number, default: 0 },
                discountFromCategory: { type: Number, default: 0 },
                discountFromProduct: { type: Number, default: 0 },
                discountType: { type: String, enum: ["percentage", "flat"], default: "percentage" },
                category: { type: String, required: true },
                unit: { type: String },
                customProduct: { type: Boolean, default: false },
                taxRate: { type: Number, default: 0 },
                taxAmount: { type: Number, default: 0 },
                loyaltyRate: { type: Number, default: 0 },
                barcodeNumber: { type: String, default: null },
                manualDiscount: { type: Number, default: 0 }

            }
        ],
        default: []
    },

    totalDiscount: {
        type: Number,
        default: 0.00
    },
    subTotal: {
        type: Number,
        default: 0.00
    },

    invoiceStatus: {
        type: String,
        enum: ["newtab", "saved", "paid", "refunded", "custom", "archived", "credited"],
        default: "saved"
    },
    archiveReason: {
        type: String,
        default: null
    },

    invoiceType: {
        type: String,
        enum: ["normal", "custom",],
        default: "normal"
    },

    paymentStatus: {
        type: String,
        enum: ["pending", "success", "failed", "refunded"],
        required: true,
        default: "pending"
    },

    paymentMethod: {
        type: String,
        enum: ["cash", "digital", "internal-device"],
        reqired: true,
        default: null,
    },

    refundType: {
        type: String,
        enum: ["full", "partial"],
        default: null
    },

    refundedAmount: {
        type: Number,
        default: 0
    },

    creditStatus: {
        type: String,
        enum: ["none", "partial", "full"],
        default: "none"
    },

    creditAmount: {
        type: Number,
        default: 0
    },

    productLoyaltyRedeemAmt: {
        type: Number,
        default: 0
    },

    walletLoyaltyRedeemAmt: {
        type: Number,
        default: 0
    },

    totalAmount: {
        type: Number,
        default: 0.00
    },
    countryName: {
        type: String,
        required: true
    },
    currencyCode: {
        type: String,
        required: true
    },
    shop: {
        type: String,
        required: true
    },

    redeemAmount: {
        type: Number,
        default: 0
    },

    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        default: null
    },

    customerDetailsCustom: {
        customerName: { type: String, default: null },
        phoneNumber: { type: String, default: null },
        address: { type: String, default: null },
        email: {
            type: String, default: null
        },

    },

    isTaxActive: {
        type: Boolean,
        default: false
    },
    totalTax: {
        type: Number,
        default: 0
    },

}, { timestamps: true })

invoiceSchema.index({ shop: 1, invoiceStatus: 1, createdAt: 1 })

const invoiceModel = mongoose.model('Invoice', invoiceSchema);

export default invoiceModel;