import categoryModel from '../model/categoryModel.js'
import { updateCategoryValidation, newCategoryValidation } from '../utils/joiValidation.js';

// --------------------------------------- create category -----------------------------------------------------

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

// ------------------------------------- update category ----------------------------------------------
export const updateCategory = async (req,res) => {
    try{

        const {error,value} = updateCategoryValidation.validate(req.body)

        if(error){
            return res.status(400).json({message:error.details[0].message});
        }

        const {categoryname,description} = value;
        const {id} = req.params

        const category = await categoryModel.findById(id);

        if(!category){
            return res.status(404).json({success:false,message:"Category not found"});
        }
        

        if(categoryname.trim().toLowerCase() === "" && description === ""){
            return res.status(400).json({success:false,message:"Category name and description cannot be empty"});
        }

        const cateogryNameLowercase = categoryname.trim().toLowerCase();

        const updatedCategory = await categoryModel.findByIdAndUpdate(id,{categoryname:cateogryNameLowercase,description},{new:true})

        res.status(200).json({success:true,message:"Category updated successfully",data:updatedCategory});
    }catch(error){
        res.status(500).json({success:false,message:"internal server error"});
    }
}

// -----------------------------------------  delete category ------------------------------------------------
export const deleteCategory = async(req,res) => {
    try{
        const {id} = req.params;

        const category = await categoryModel.findById(id);
        
        if(!category){
            return res.status(404).json({success:false,message:"Category not found"});
        }

        await categoryModel.findByIdAndDelete(id);

        res.status(200).json({success:true,message:"Category deleted successfully"});
    }catch(error){
        res.status(500).json({success:false,message:"internal server error"});
    }
}

// ------------------------------------- add discount to category -----------------------------------------------

export const addCategoryDiscount = async (req, res) => {
    try {
        const {id} = req.params;
        const {discountrate} = req.body;

        const category = await categoryModel.findById(id);
        if(!category){
            return res.status(404).json({success:false,message:"Category not found"});
        }

        if(category.isDiscount){
            return res.status(400).json({success:false,message:"Discount already added"});
        }

       const updatedCategory = await categoryModel.findByIdAndUpdate(id,{
            discountrate:discountrate,
            isDiscount:true
        },{new:true});

        res.status(200).json({success:true,message:"Discount added successfully",data:updatedCategory});
    }catch(error){
        res.status(500).json({success:false,message:"internal server error"});
    }
}

// --------------------------------- remove discount from category -----------------------------------------

export const removeCategoryDiscount = async(req,res) => {
    try{
        const {id} = req.params;
        
        const category = await categoryModel.findById(id);
        if(!category){
            return res.status(404).json({success:false,message:"Category not found"});
        }

        if(!category.isDiscount){
            return res.status(400).json({success:false,message:"Discount already removed"});
        }

       const updatedCategory = await categoryModel.findByIdAndUpdate(id,{
            discountrate:0,
            isDiscount:false
        },{new:true});

        res.status(200).json({success:true,message:"Discount removed successfully",data:updatedCategory});
    }catch(error){
        res.status(500).json({success:false,message:"internal server error"});
    }
}

export const getCategories = async (req,res) => {
    try{
        const categories = await categoryModel.find({}).sort({createdAt:-1});

        if(!categories){
            return res.status(404).json({success:false,message:"No categories found"});
        }

        res.status(200).json({success:true,message:"Categories fetched successfully",data:categories});
    }catch(error){
        res.status(500).json({success:true,message:"internal server error"})
    }
}