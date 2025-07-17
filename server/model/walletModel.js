import mongoose from "mongoose";

const walletSchema = new mongoose.Schema({
     customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", unique: true, required: true },
     shopId: { type: mongoose.Schema.Types.ObjectId, ref: "Shop" },
     productLoyaltyPoint: { type: Number, default: 0 },
     walletLoyaltyPoint: { type: Number, default: 0 }
}, { timestamps: true })


const walletTransactionSchema = new mongoose.Schema({
     customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
     staffId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
     shopId: { type: mongoose.Schema.Types.ObjectId, ref: "Shop" },
     amount: { type: Number, required: true },
     amtToPoint: { type: Number, default: 0 },
     convertLoyalityRate: { type: Number, default: 0 },
     type: { type: String, enum: ["credit", "debit"], required: true },
     balanceAfterTransaction: { type: Number, default: 0 },
     date: { type: Date, default: Date.now() }
}, { timestamps: true })

const walletModel = mongoose.model("Wallet", walletSchema);
const walletTransactionModel = mongoose.model("WalletTransaction", walletTransactionSchema)

export default { walletModel, walletTransactionModel }; 