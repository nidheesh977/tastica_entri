import csv from 'csv-parser';
import fs from 'fs';
import categoryModel from '../../model/categoryModel.js';
import shopModel from '../../model/shopModel.js';
import { generateCategoryId } from '../../utils/generateCategoryId.js';


export const categoryFileUploader = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No file uploaded" });
        }

        const filePath = req.file.path;
        const categories = [];
              console.log(categories)
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
                        

                categories.push({
                    category_id:row.category_id,
                    categoryName: row.categoryName.trim(),
                    description: row.description,
                    discountRate: row.discountRate,
                    shop:row.shop,
                    countryName:row.countryName,
                    currencyCode:row.currencyCode
                });
            })
            .on('end', async () => {
                try {

                    for (const row of categories){

                        const findShop = await shopModel.findOne({shopName:row.shop});

                        if(!findShop){
                          return res.status(400).json({success:false,message:"shop is not found"})
                        }

                          let categoryId;
                                              
                           do {
                              categoryId = generateCategoryId()
                               } while (await categoryModel.findOne({category_id:categoryId}));
                                                     

                        const isDiscount = row.discountRate > 0 ? true : false;

                        row["shop"] = findShop?._id
                        row["isDiscount"] = isDiscount
                        row["category_id"] = categoryId

                    } 
                    
                    const existingCategoriesIds = new Set(
                        (await categoryModel.find({ category_id: { $in: categories.map(c => c.category_id) } }, 'category_id'))
                            .map(category => category.category_id)
                    );

                   
                    const newCategory = categories.filter(
                        (category) => !existingCategoriesIds.has(category.category_id)
                    );

                    if (newCategory.length === 0) {
                        return res.status(400).json({
                            success: false,
                            message: "All categories in the CSV file already exist",
                        });
                    }


                    
                    await categoryModel.insertMany(newCategory);

                    res.status(200).json({
                        success: true,
                        message: "CSV data imported successfully",
                        addedCategories: newCategory.length,
                    });
                } catch (error) {
                    console.error("Error processing data:", error);
                    res.status(500).json({ success: false, message: "Internal server error" });
                } finally {
                   
                    fs.unlink(filePath, (err) => {
                        if (err) console.error("Error deleting file:", err);
                    });
                }
            }) 
            .on('error', (err) => {
                console.error("Error reading file:", err);
                res.status(500).json({ success: false, message: "Error processing file" });
            });
    } catch (error) {
        console.error("File upload error:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};