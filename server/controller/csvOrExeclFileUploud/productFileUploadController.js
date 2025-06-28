import csv from 'csv-parser';
import fs from 'fs';
import productModel from '../../model/productModel.js';
import categoryModel from '../../model/categoryModel.js';
import shopModel from '../../model/shopModel.js';
import { generateId } from '../../utils/generateId.js';

export const productsFileUploader = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No file uploaded" });
        }

        if(req.file){

        }

        const filePath = req.file.path;
     

        const getProductFile = req.file.originalname

        const checkproductfile = getProductFile.includes("products.csv")

        if(!checkproductfile){
             fs.promises.unlink(filePath, (err) => {
                        if (err) console.error("Error deleting file:",);
                      });
            return res.status(400).json({ success: false, message: "This file is not Products file"});
           
        }

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
                    shop: row.shop,
                    discountType: row.discountType,
                    unit: row.units,
                    isActive:row.isActive.toLowerCase(),
                    barcodeNumber:row.barcodeNumber
                });
            })
            .on('end', async () => {
                try {

                    for (const row of products) {

                        const findShop = await shopModel.findOne({ shopName: row.shop.trim() });

                        if (!findShop) {
                            return res.status(400).json({ success: false, message: "shop is not found" });
                        }

                        const getCategory = await categoryModel.findOne({ shop: findShop?._id, categoryName: row.category.trim() });


                        if (!getCategory) {
                            return res.status(400).json({ success: false, message: "Category is not found" });
                        }

                        let costProfitSum;

                        if (row.costPrice > 0) {
                            costProfitSum = row.costPrice * (row.costPriceProfit / 100);
                        }

                        let addCostPrice = row.costPrice === 0 ? row.costPrice : row.costPrice + costProfitSum;

                        let productId;

                        do {
                            productId = generateId("PROD");
                        } while (await productModel.findOne({ product_id: productId }));


                        row["category"] = getCategory?._id;
                        row["shop"] = findShop?._id;
                        row["product_id"] = productId;
                        row["costPrice"] = addCostPrice;
                        row["barcodeNumber"] = row.barcodeNumber === "" ? null : row.barcodeNumber
                    }

                    const files = products.map(row => ({
                        productName: row.productName,
                        shop: row.shop
                    }));


                    const existingDocs = await productModel.find({
                        productName: { $in: files.map(f => f.productName) },
                        shop: { $in: files.map(f => f.shop) }
                    });



                    const existingSet = new Set(
                        existingDocs.map(doc => `${doc.productName}::${doc.shop}`)
                    );


                    const newFiles = products.filter(file => !existingSet.has(`${file.productName}::${file.shop}`));
                    if (newFiles.length === 0) {
                        return res.status(400).json({
                            success: false,
                            message: "All products in the CSV file already exist",
                        });
                    }




                    await productModel.insertMany(newFiles);

                    res.status(200).json({
                        success: true,
                        message: "CSV data imported successfully",
                        addedProducts: newFiles.length,
                    });


                } catch (error) {

                    res.status(500).json({ success: false, message: "Internal server error" });
                } finally {

                     fs.promises.unlink(filePath, (err) => {
                        if (err) console.error("Error deleting file:");
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