import mongoose from 'mongoose';
import {categoryMock} from '../mockdatas/categoryMock.js';


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
},{timeStamps:true});

const categoryModel = mongoose.model('Category', categorySchema);

export default categoryModel;

// categoryModel.insertMany(categoryMock)
//  .then(() => {
//     console.log("all data inserted")
//     mongoose.disconnect()
//  }) 
//  .catch(err => {
//     console.log("error inserting",err)
//  })
     
  