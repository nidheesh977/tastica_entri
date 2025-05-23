import csv from 'csv-parser';
import fs from 'fs';
import productModel from '../../model/productModel.js';
import categoryModel from '../../model/categoryModel.js';
import shopModel from '../../model/shopModel.js';
import { generateProductId } from '../../utils/generateProductId.js';

export const productsFileUploader = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No file uploaded" });
        }

        const filePath = req.file.path;
        const products = [];

        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
                        

                products.push({
                    product_id: row.product_id,
                    productName: row.productName.trim(),
                    quantity: Number(row.quantity),
                    costPrice: Number(row.costPrice),
                    costPriceProfit: Number(row.costPriceProfit),
                    sellingPrice: Number(row.sellingPrice),
                    discount: Number(row.discount),
                    category: row.category,
                    countryName: row.countryName,
                    currencyCode: row.currencyCode,
                    shop:row.shop,
                    discountType:row.discountType,
                    unit:row.units
                });
            })
            .on('end', async () => {
                try {

                    for (const row of products){

                        const findShop = await shopModel.findOne({shopName:row.shop.trim()});
                        
                        if(!findShop){
                          return res.status(400).json({success:false,message:"shop is not found"})
                        }

                        const getCategory = await categoryModel.findOne({shop:findShop?._id,categoryName:row.category.trim()});

                        if(!getCategory){
                            return res.status(400).json({success:false,message:"Category is not found"})
                        }

                        let costProfitSum

                        if(row.costPrice > 0){
                        costProfitSum = row.costPrice * (row.costPriceProfit / 100)
                        }
                            
                        let addCostPrice = row.costPrice === 0 ? row.costPrice : row.costPrice + costProfitSum

                        let productId;
                               
                        do {
                            productId = generateProductId()
                            } while (await productModel.findOne({product_id:productId}));
                               

                        row["category"] = getCategory?._id
                        row["shop"] = findShop?._id
                        row["product_id"] = productId
                        row["costPrice"] = addCostPrice
                    } 
                    
                    const existingProductIds = new Set(
                        (await productModel.find({ productName: { $in: products.map(p => p.productName) } }, 'productName'))
                            .map(product => product.productName)
                    );

                   
                    const newProducts = products.filter(
                        (product) => !existingProductIds.has(product.productName)
                    );

                    if (newProducts.length === 0) {
                        return res.status(400).json({ 
                            success: false,
                            message: "All products in the CSV file already exist",
                        });
                    }

                    

                    
                    await productModel.insertMany(newProducts);

                    res.status(200).json({
                        success: true,
                        message: "CSV data imported successfully",
                        addedProducts: newProducts.length,
                    });

                    console.log(products)
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