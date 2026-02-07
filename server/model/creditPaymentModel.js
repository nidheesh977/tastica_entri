import mongoose from "mongoose";



const creditPaymentSchema = mongoose.Schema({
    creditBookId: {
        type: String,
        required: true
    },
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop",
        default: null
    },
    customerName: {
        type: String,
        default: null
    },
    registeredCustomer: {
        type: Boolean,
        default: false
    },
    customerPhoneNumber: {
        type: String,
        default: null
    },
    credit: {
        type: [
            {
                invoice: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Invoice",
                    default: null
                },
                creditAmount: {
                    type: Number,
                    default: 0
                },
                creditStatus: {
                    type: String,
                    enum: ["pending", "paid"],
                    default: "pending"
                },
                creditor: {
                    type: String,
                },
                givenAt: {
                    type: Date,
                    default: Date.now
                },
                creditorPosition: {
                    type: String
                },
                creditorId: {
                    type: String
                },
                customerPaidAt: {
                    type: Date,
                    default: null
                }
            }
        ]
    },

    customertotalCredit: {
        type: Number,
        default: 0
    },
    customerPaidAmount: {
        type: Number,
        default: 0
    },
    advanceAmount: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

creditPaymentSchema.index({ shop: 1 })
creditPaymentSchema.index({ creditBookId: 1 })

const creditModel = mongoose.model("Credit", creditPaymentSchema)

export default creditModel