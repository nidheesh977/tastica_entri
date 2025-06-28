import csv from 'csv-parser';
import fs from 'fs';
import categoryModel from '../../model/categoryModel.js';
import shopModel from '../../model/shopModel.js';
import { generateId } from '../../utils/generateId.js';


export const categoryFileUploader = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No file uploaded" });
        }


        const filePath = req.file.path;
       
        const getCategoryFile = req.file.originalname

        const checkCategoryfile = getCategoryFile.includes("categories.csv")

        if(!checkCategoryfile){
             fs.promises.unlink(filePath, (err) => {
                                    if (err) console.error("Error deleting file:",);
                      });
            return res.status(400).json({ success: false, message: "This file is not categories file"});
        }

         const categories = [];
            
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
                              categoryId = generateId("CATE")
                               } while (await categoryModel.findOne({category_id:categoryId}));
                                                     

                        const isDiscount = row.discountRate > 0 ? true : false;

                        row["shop"] = findShop?._id
                        row["isDiscount"] = isDiscount
                        row["category_id"] = categoryId

                    } 
                    
                

                    const files = categories.map(row => ({
                        categoryName:row.categoryName,
                        shop:row.shop
                    }))

                   
                    const existingDocs = await categoryModel.find({
                        categoryName: {$in:files.map(f => f.categoryName)},
                        shop: {$in:files.map(f => f.shop)}
                    })


                   
                    const existingSet = new Set(
                        existingDocs.map(doc => `${doc.categoryName}::${doc.shop}`)
                    )


                     const newFiles = categories.filter(file => !existingSet.has(`${file.categoryName}::${file.shop}`))


                       if (newFiles.length === 0) {
                        return res.status(400).json({
                            success: false,
                            message: "All categories in the CSV file already exist",
                        });
                    }

                       await categoryModel.insertMany(newFiles);

                    res.status(200).json({
                        success: true,
                        message: "CSV data imported successfully",
                         addedCategories: newFiles.length,
                    });
                } catch (error) {
                    res.status(500).json({ success: false, message: "Internal server error" });
                } finally {
                   
                    fs.promises.unlink(filePath, (err) => {
                        if (err) console.error("Error deleting file:", err);
                    });
                }
            }) 
            .on('error', (err) => {
              
                res.status(500).json({ success: false, message: "Error processing file" });
            });
    } catch (error) {
    
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};