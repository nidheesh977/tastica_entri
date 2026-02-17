import mongoose from "mongoose"

const expenseSchema = new mongoose.Schema({
    expenseId: {
        type: String,
        required: true
    },
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop",
        required: true
    },
    createdDate: {
        type: Date,
        required: true
    },
    expenseAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ExpenseAccount",
        required: true
    },
    expenseSubTitle: {
        type: String,
        required: true
    },
    expenseAmount: {
        type: Number,
        default: 0,
        required: true,
        min: 1
    },
    taxAmount: {
        type: Number,
        default: 0
    },
    baseAmount: {
        type: Number,
        default: 0,
        required: true,
        min: 1
    },

    totalAmount: {
        type: Number,
        default: 0,
        required: true,
        min: 1
    },

    amountIs: {
        type: String,
        enum: ["inclusive", "exclusive"],
        required: true
    },
    paidThrough: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
        required: true
    },
    shopTaxAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TaxRate",
        required: true
    },
    taxCode: {
        type: String,
        uppercase: true,
        required: true,
    },
    taxRate: {
        type: Number,
        default: 0
    },
    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vendor",
        default: null
    },
    billable: {
        type: Boolean,
        required: true,
        default: false
    },
    referenceId: {
        type: String,
        default: null
    },
    notes: {
        type: String,
        default: null
    },
    vendorStaff: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "VendorStaff",
        default: null
    },
    isActive: {
        type: Boolean,
        default: true
    },
    cloudinary: {
        publicId: {
            type: String,
            default: null
        },
        version: {
            type: String,
            default: null
        }
    }

}, { timestamps: true })

expenseSchema.index({ shop: 1 })

const ExpenseModel = mongoose.model("Expense", expenseSchema)

export default ExpenseModel