import express from 'express';
import { createProduct, deleteProduct, getAllProducts, getCategoryProducts, productListTest,productListTestforAdmin, updateProduct } from '../../../controller/productContollers/productController.js';
import { userVerifyToken } from '../../../middleware/cookieTokenVerification.js';
import { checkUserRole } from '../../../middleware/authRoleVerification.js';
import { addDiscount, removeDiscount } from '../../../controller/productContollers/discountController.js';
import { addCostPriceProfit, removeCostPriceProfit, updateCostPriceProfit } from '../../../controller/productContollers/costPriceProfitController.js';
import { addCostPrice, removeCostPrice } from '../../../controller/productContollers/costPriceController.js';
import { addSellingPrice, removeSellingPrice } from '../../../controller/productContollers/sellingPriceController.js';
import { shopVerifyToken } from '../../../middleware/shopCookieTokenVerification.js';
;

const productRouter = express.Router();
 

productRouter.post('/create',shopVerifyToken,userVerifyToken,checkUserRole('admin'),createProduct);
productRouter.delete('/delete/:id',shopVerifyToken,userVerifyToken,checkUserRole('admin'),deleteProduct);
productRouter.put('/update/:id/category/:category',shopVerifyToken,userVerifyToken,checkUserRole('admin'),updateProduct);

productRouter.put('/cost-price-profit/:id/add',userVerifyToken,checkUserRole('admin'),addCostPriceProfit);
productRouter.put('/cost-price-profit/:id/update',userVerifyToken,checkUserRole('admin'),updateCostPriceProfit);
productRouter.put('/cost-price-profit/:id/remove',userVerifyToken,checkUserRole('admin'),removeCostPriceProfit);

productRouter.put('/discount/:id/add',userVerifyToken,checkUserRole('admin'),addDiscount);
productRouter.put('/discount/:id/remove',userVerifyToken,checkUserRole('admin'),removeDiscount);

productRouter.put('/cost-price/:id/add',userVerifyToken,checkUserRole('admin'),addCostPrice);
productRouter.put('/cost-price/:id/remove',userVerifyToken,checkUserRole('admin'),removeCostPrice);


productRouter.put('/selling-price/:id/add',userVerifyToken,checkUserRole('admin'),addSellingPrice);
productRouter.put('/selling-price/:id/remove',userVerifyToken,checkUserRole('admin'),removeSellingPrice);

// get products for admin and staff

productRouter.get('/category-search',shopVerifyToken,userVerifyToken,checkUserRole('admin','staff'),getCategoryProducts);
productRouter.get('/',shopVerifyToken,userVerifyToken,checkUserRole('admin','staff'),getAllProducts);




export default productRouter;