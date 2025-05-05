import express from 'express';
import { createProduct, deleteProduct, getAllProducts, getCategoryProducts, productListTest,productListTestforAdmin, updateProduct } from '../../../controller/productContollers/productController.js';
import { verifyToken } from '../../../middleware/cookieTokenVerification.js';
import { checkUserRole } from '../../../middleware/authRoleVerification.js';
import { addDiscount, removeDiscount } from '../../../controller/productContollers/discountController.js';
import { addCostPriceProfit, removeCostPriceProfit, updateCostPriceProfit } from '../../../controller/productContollers/costPriceProfitController.js';
import { addCostPrice, removeCostPrice } from '../../../controller/productContollers/costPriceController.js';
import { addSellingPrice, removeSellingPrice } from '../../../controller/productContollers/sellingPriceController.js';
;

const productRouter = express.Router();
 

productRouter.post('/create',verifyToken,checkUserRole('admin'),createProduct);
productRouter.delete('/delete/:id',verifyToken,checkUserRole('admin'),deleteProduct);
productRouter.put('/update/:id/category/:category',verifyToken,checkUserRole('admin'),updateProduct);

productRouter.put('/cost-price-profit/:id/add',verifyToken,checkUserRole('admin'),addCostPriceProfit);
productRouter.put('/cost-price-profit/:id/update',verifyToken,checkUserRole('admin'),updateCostPriceProfit);
productRouter.put('/cost-price-profit/:id/remove',verifyToken,checkUserRole('admin'),removeCostPriceProfit);

productRouter.put('/discount/:id/add',verifyToken,checkUserRole('admin'),addDiscount);
productRouter.put('/discount/:id/remove',verifyToken,checkUserRole('admin'),removeDiscount);

productRouter.put('/cost-price/:id/add',verifyToken,checkUserRole('admin'),addCostPrice);
productRouter.put('/cost-price/:id/remove',verifyToken,checkUserRole('admin'),removeCostPrice);


productRouter.put('/selling-price/:id/add',verifyToken,checkUserRole('admin'),addSellingPrice);
productRouter.put('/selling-price/:id/remove',verifyToken,checkUserRole('admin'),removeSellingPrice);

// get products for admin and staff

productRouter.get('/category-search',verifyToken,checkUserRole('admin','staff'),getCategoryProducts);
productRouter.get('/',verifyToken,checkUserRole('admin','staff'),getAllProducts);

// for test
productRouter.get('/',verifyToken,checkUserRole("staff"),productListTest)
productRouter.get('/test',verifyToken,checkUserRole('admin'),productListTestforAdmin)


export default productRouter;