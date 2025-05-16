import customProductModel from '../model/customProductModel.js'
import { newCustomProductValidation } from '../utils/joiValidation.js';



export const createCustomProduct = async (req, res) => {
  try {
    // body validation
    const { error, value } = newCustomProductValidation.validate(req.body);

        if(error){
            return res.status(400).json({success:false,message: error.details[0].message });
        }
       
        const { productName, quantity, units, sellingPrice} = value;
        const {id,countryName,currencyCode} = req.shop;

     
        const lowerCaseproductName = productName.trim().toLowerCase()
 
        const customProductExist = await customProductModel.findOne({shop:id, productName:lowerCaseproductName})

        if(customProductExist){
            return res.status(400).json({success:false,message:"Product already exists"})
        }

         
      
        const newCustomProduct = new customProductModel({

            productName:lowerCaseproductName,
            quantity,
            sellingPrice,
            shop:id,
            countryName,
            currencyCode,
            units,
            isCustomProduct:true
        });

        await newCustomProduct.save()

         res.status(201).json({ success: true, message: "Product created successfully", data:newCustomProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
  }