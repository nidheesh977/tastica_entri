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
        set: (str) => str.replace(/\s+/g, " ")
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
                }
            }
        ],
        default: []
    },
    description: {
        type: String
    },

}, { timestamps: true })

expenseAccountSchema.index({ shop: 1, expenseTitleLowerCase: 1 }, { unique: true })

const ExpenseAccountModel = mongoose.model("ExpenseAccount", expenseAccountSchema)

export default ExpenseAccountModel;