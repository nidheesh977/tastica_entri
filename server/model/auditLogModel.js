import mongoose from "mongoose";


const auditLogSchema = new mongoose.Schema({
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    targetId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "targetModel"
    },
    targetModel: {
        type: String,
        enum: ["User", "Vendor", "VendorStaff"],
        required: true
    },
    action: {
        type: String,
        required: true,
        enum: ["STATUS_CHANGE", "DELETION", "RECOVERY"]
    },
    payload: {
        before: { type: Object },
        after: { type: Object }
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

auditLogSchema.index({ targetId: 1, targetModel: 1, timestamp: -1 })

export const AuditLogModel = mongoose.model("AuditLog", auditLogSchema)