import { json2csv } from 'json-2-csv';
import { productMocks } from '../mockdatas/productMock.js';

export const convertJsonToCsv = async (req, res) => {
    try {
        // Convert JSON to CSV using json2csvAsync
        const csv = await json2csv(productMocks);

        // Set response headers for CSV download
        res.header('Content-Type', 'text/csv');
        res.attachment('products.csv');
        res.send(csv);
    } catch (error) {
        console.error('Error converting JSON to CSV:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};