import mongoose from "mongoose";


const auditLogSchema = new mongoose.Schema({
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Shop"
    },
    targetId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "targetModel"
    },
    subDocumentId: {
        type: String,
        default: null
    },
    targetModel: {
        type: String,
        enum: ["User", "Vendor", "VendorStaff", "ExpenseAccount", "TaxRate", "PaymentAccount", "Customer", "Expense"],
        required: true
    },
    action: {
        type: String,
        required: true,
        enum: ["STATUS_CHANGE", "DELETION", "RECOVERY", "CREATE", "UPLOAD_IMAGE"]
    },
    payload: {
        before: mongoose.Schema.Types.Mixed,
        after: mongoose.Schema.Types.Mixed
    },
    reason: {
        type: String,
        required: true
    },
    performedBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
}, { timestamps: { createdAt: "timestamp", updatedAt: false } })

auditLogSchema.index({ shop: 1, targetId: 1, timestamp: -1 })
auditLogSchema.index({ shop: 1, performedBy: 1 })

export const AuditLogModel = mongoose.model("AuditLog", auditLogSchema)