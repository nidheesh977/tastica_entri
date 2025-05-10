import mongoose from 'mongoose';
// import {categoryMock} from '../mockdatas/categoryMock.js';


const categorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },

    discountRate:{
        type:Number,
        default:0
    },

    isDiscount: {
        type: Boolean,
        default: false,
    },
    shop:{
            type:String,
            required:true
        },
    countryName:{
        type:String,
        required:true
        },
    currencyCode:{
            type:String,
            required:true
        },


},{timeStamps:true});

const categoryModel = mongoose.model('Category', categorySchema);

export default categoryModel;

//   for (const item of categoryMock){
//     item["countryName"] = "Maldives"
//     item["currencyCode"] = "MVR"
//     item["shop"] = "681b7807a4c3f4efb132bbc1"
   
// }

//   categoryModel.insertMany(categoryMock)
//   .then(() => {
//      console.log("all data inserted")
//      mongoose.disconnect()
//   }) 
//   .catch(err => {
//      console.log("error inserting",err)
//  })
     
  