import express from 'express';
import { createProduct, deleteProduct, getAllProducts, getCategoryProducts, productListTest,productListTestforAdmin, updateProduct } from '../../../controller/productContollers/productController.js';
import { userVerifyToken } from '../../../middleware/cookieTokenVerification.js';
import { checkUserRole } from '../../../middleware/authRoleVerification.js';
import { addDiscount, removeDiscount } from '../../../controller/productContollers/discountController.js';
import { addCostPriceProfit, removeCostPriceProfit, updateCostPriceProfit } from '../../../controller/productContollers/costPriceProfitController.js';
import { addCostPrice, removeCostPrice } from '../../../controller/productContollers/costPriceController.js';
import { addSellingPrice, removeSellingPrice } from '../../../controller/productContollers/sellingPriceController.js';
import { shopVerifyToken } from '../../../middleware/shopCookieTokenVerification.js';
import { checkPermission } from '../../../middleware/permissonMiddleware.js';
;

const productRouter = express.Router();
 

productRouter.post('/create',shopVerifyToken,userVerifyToken,checkUserRole('admin'),checkPermission("product_create"),createProduct);
productRouter.delete('/delete/:id',shopVerifyToken,userVerifyToken,checkUserRole('admin'),checkPermission("product_delete"),deleteProduct);
productRouter.put('/update/:id/',shopVerifyToken,userVerifyToken,checkUserRole('admin'),checkPermission("product_update"),updateProduct);
productRouter.get('/',shopVerifyToken,userVerifyToken,checkUserRole('admin','staff'),checkPermission("product_read"),getAllProducts);
productRouter.get('/category-search',shopVerifyToken,userVerifyToken,checkUserRole('admin','staff'),getCategoryProducts);



export default productRouter;