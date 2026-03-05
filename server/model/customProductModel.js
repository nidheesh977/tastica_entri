import mongoose from 'mongoose'

const customProductSchema = new mongoose.Schema({

    productName: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    sellingPrice: {
        type: Number,
        default: 0,
    },
    countryName: {
        type: String,
    },
    currencyCode: {
        type: String,
    },
    shop: {
        type: String,
        required: true
    },
    unit: {
        type: String,
        enum: ['no', 'kg', 'lt', 'm', 'pcs'],
        default: 'no'
    },
    isCustomProduct: {
        type: Boolean,
        default: false
    },

    // new values

    module: {
        type: String,
        enum: ["POS", "CUSTOM-INVOICE"],
        required: true
    },
    type: {
        type: String,
        enum: ["GOODS", "SERVICE"],
        required: true
    },
    sellable: {
        type: Boolean,
        default: true
    },
    salesAccount: {
        type: String,
        default: "Sales"
    },
    salesDescription: {
        type: String
    },
    salesTaxRule: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TaxRate",
        default: null
    },

    // PURCHASE INFO

    purchasable: {
        type: Boolean,
        default: false
    },

    purchaseTaxRule: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TaxRate",
        default: null
    },

    costPrice: {
        type: Number,
        min: 0
    },

    purchaseAccount: {
        type: String,
        default: "Cost of Goods Sold"
    },


    purchaseDescription: {
        type: String
    },

    preferredVendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vendor",
        default: null
    },

    isActive: {
        type: Boolean,
        default: true
    }


}, { timestamps: true });



const customProductModel = mongoose.model('CustomProduct', customProductSchema);

export default customProductModel