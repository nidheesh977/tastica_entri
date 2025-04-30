import categoryModel from '../model/categoryModel.js'
import { newCategoryValidation } from '../utils/joiValidation.js';


export const createCategory = async (req, res) => {
  
    try {

        const {error,value} = newCategoryValidation.validate(req.body);

        if(error){
            return res.status(400).json({message:error.details[0].message});
        }

        const {categoryname,description,discountrate} = value;
            
        const categoryExist = await categoryModel.findOne({categoryname:categoryname.trim().toLowerCase()});


        if(categoryExist){
            return res.status(400).json({success:false,message:"Category already exists"});
        }

        
        const cateogryNameLowercase = categoryname.trim().toLowerCase();

        const isDiscount = discountrate > 0 ? true : false;

        const newCategory = await categoryModel.create({
            categoryname:cateogryNameLowercase,
            description,
            discountrate,
            isDiscount
        });

        await newCategory.save();
        
        res.status(201).json({success:true,message:"category created successfully",data:newCategory});
    } catch (error) {
        console.log(error)
        res.status(500).json({ success:false,message:"internal server error"})
    }
}