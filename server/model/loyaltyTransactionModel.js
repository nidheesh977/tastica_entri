import mongoose from "mongoose"


const loyaltyTransactionSchema = new mongoose.Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
    staffId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    points: { type: Number, default: 0 },
    amount: { type: Number, default: 0 },
    type: { type: String, enum: ["EARNED", "REDEEMED"], required: true },
    date: { type: Date, default: Date.now() }
})

const loyaltyTransactionModel = mongoose.model("LoyaltyTransaction", loyaltyTransactionSchema);

export default loyaltyTransactionModel; 