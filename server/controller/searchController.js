import productModel from "../model/productModel.js";

export const searchProduct = async (req, res) => {
    try {
        const { productId, productName } = req.query; // Added productName query parameter
        const { id } = req.shop;

        console.log(productName)
        if (!productId && !productName) {
            return res.status(400).json({ success: false, message: 'At least one query parameter (productId or productName) is required' });
        }
 
        const query = { shop: id };

        if (productId) {
            query.product_id = { $regex: `^${productId}`, $options: 'i' }; // Search by productId
        }

        if (productName) { 
            query.productName = { $regex: `^${productName}`, $options: 'i' }; // Search by productName
        }

        const productData = await productModel.find(query);

        if (productData.length === 0) {
            return res.status(400).json({ success: false, message: 'No data found' });
        }

        res.status(200).json({ success: true, message: 'Data fetched successfully', data: productData });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};