import csv from 'csv-parser';
import fs from 'fs';
import productModel from '../model/productModel.js';

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
                
                if (!row.product_id || !row.productName || !row.quantity) {
                    return res.status(400).json({ success: false, message: "Invalid CSV data" });
                }

                products.push({
                    product_id: row.product_id,
                    productName: row.productName,
                    quantity: Number(row.quantity),
                    costPrice: Number(row.costPrice),
                    sellingPrice: Number(row.sellingPrice),
                    discount: Number(row.discount),
                    category: row.category,
                    countryName: row.countryName,
                    currencyCode: row.currencyCode,
                    shop:row.shop,
                    discountType:row.discountType,
                    unit:row.unit
                });
            })
            .on('end', async () => {
                try {
                    
                    const existingProductIds = new Set(
                        (await productModel.find({ product_id: { $in: products.map(p => p.product_id) } }, 'product_id'))
                            .map(product => product.product_id)
                    );

                   
                    const newProducts = products.filter(
                        (product) => !existingProductIds.has(product.product_id)
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