import mongoose from 'mongoose';
// import {categoryMock} from '../mockdatas/categoryMock.js';


const categorySchema = new mongoose.Schema({
     category_id:{
            type:String,
            required:true,
        },
    categoryName: {
        type: String,
        required: true,
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

categorySchema.index({ category_id:1, shop:1, createdAt:-1 })

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
     
  