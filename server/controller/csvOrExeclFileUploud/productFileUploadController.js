import csv from 'csv-parser';
import fs from 'fs';
import productModel from '../../model/productModel.js';
import categoryModel from '../../model/categoryModel.js';
import { generateProductId } from '../../utils/generateId.js';
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter.js';
import counterModel from '../../model/counterModel.js';

export const productsFileUploader = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No file uploaded" });
        }

        if (req.file) {

        }

        const filePath = req.file.path;

        const shopId = req.shop.id;

        const countryName = req.shop.countryName;

        const currencyCode = req.shop.currencyCode;

        const getProductFile = req.file.originalname

        const checkproductfile = getProductFile.includes("products.csv")

        if (!checkproductfile) {
            fs.promises.unlink(filePath, (err) => {
                if (err) console.error("Error deleting file:",);
            });
            return res.status(400).json({ success: false, message: "This file is not Products file" });

        }

        const products = [];

        let numberOfProduct = 0;

        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {


                products.push({
                    product_id: row.product_id,
                    productName: row.productName,
                    quantity: Number(row.quantity),
                    costPrice: Number(row.costPrice),
                    costPriceProfit: Number(row.costPriceProfit),
                    sellingPrice: Number(row.sellingPrice),
                    discount: Number(row.discount),
                    category: row.category.toLowerCase(),
                    countryName: row.countryName,
                    currencyCode: row.currencyCode,
                    shop: row.shop,
                    discountType: row.discountType,
                    unit: row.units,
                    barcodeNumber: row.barcodeNumber
                });


            })
            .on('end', async () => {
                try {

                    for (const row of products) {

                        const cateogryNameLowercase = capitalizeFirstLetter(row.category)

                        const getCategory = await categoryModel.findOne({ shop: shopId, categoryName: cateogryNameLowercase });


                        if (!getCategory) {
                            return res.status(404).json({ success: false, message: `${row.category.trim()} category is not found` });
                        }


                        numberOfProduct += 1

                        let costProfitSum;

                        if (row.costPrice > 0) {
                            costProfitSum = row.costPrice * (row.costPriceProfit / 100);
                        }

                        let addCostPrice = row.costPrice === 0 ? row.costPrice : row.costPrice + costProfitSum;

                        let productId = await generateProductId(shopId)

                        const lowerCaseproductName = capitalizeFirstLetter(row.productName)

                        row["productName"] = lowerCaseproductName;
                        row["category"] = getCategory?._id;
                        row["shop"] = shopId;
                        row["countryName"] = countryName;
                        row["currencyCode"] = currencyCode;
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

                        const counterName = "product"

                        await counterModel.findOneAndUpdate(
                            { shopId, counterName: counterName },
                            { $inc: { seq: -numberOfProduct } },
                            { new: true, upsert: true }
                        )

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
                    console.log(error);

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