import mongoose from "mongoose";


const counterSchema = new mongoose.Schema({
    counterName: {
        type: String,
        required: true,
        unique: true
    },
    seq: {
        type: Number,
        default: 0
    },
    shopId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop",
    }
})

counterSchema.index({ shopId: 1, counterName: 1 }, { unique: true })

const counterModel = mongoose.model("Counter", counterSchema);

export default counterModel