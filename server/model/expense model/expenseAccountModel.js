import mongoose from 'mongoose'


const expenseAccountSchema = new mongoose.Schema({
    shop: {
        type: mongoose.Types.ObjectId,
        ref: "Shop",
        required: true
    },
    expenseTitle: {
        type: String,
        required: true,
        trim: true,
        set: (str) => str.replace(/\s+/g, " ")
    },
    expenseTitleLowerCase: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        set: (str) => str.trim().toLowerCase().replace(/\s+/g, " ")
    },
    subTitle: {
        type: [
            {
                title: {
                    type: String,
                    trim: true,
                    set: (str) => typeof str === "string" ? str.replace(/\s+/g, " ") : str,
                },
                titleLowerCase: {
                    type: String,
                    trim: true,
                    lowercase: true,
                    set: (str) => typeof str === "string" ? str.replace(/\s+/g, " ") : str,

                },
                isActive: {
                    type: Boolean,
                    default: true
                },
                inActiveReason: {
                    type: String,
                    default: null
                },
            }
        ],
        default: []
    },
    description: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: true
    },
    inActiveReason: {
        type: String,
        default: null
    },

}, { timestamps: true })

expenseAccountSchema.index({ shop: 1, expenseTitleLowerCase: 1 }, { unique: true })

const ExpenseAccountModel = mongoose.model("ExpenseAccount", expenseAccountSchema)

export default ExpenseAccountModel;