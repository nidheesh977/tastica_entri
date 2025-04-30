import mongoose from 'mongoose';



const categorySchema = new mongoose.Schema({
    categoryname: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },

    discountrate:{
        type:Number,
        default:0
    },

    isDiscount: {
        type: Boolean,
        default: false,
    }
})

const categoryModel = mongoose.model('Category', categorySchema);

export default categoryModel