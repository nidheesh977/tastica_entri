import express from 'express';
import { createProduct, deleteProduct, productListTest,productListTestforAdmin, updateProduct } from '../../../controller/productContollers/productController.js';
import { verifyAuthStaffToken } from '../../../middleware/staff/authStaffVerifyToken.js';
import { staffAuthorizeRole } from '../../../middleware/staff/staffAuthorizeRole.js';
import { verifyAuthAdminToken } from '../../../middleware/admin/authAdminVerifyToken.js';
import { adminAuthorizeRole } from '../../../middleware/admin/adminAuthorizeRole.js';
import { addDiscount, removeDiscount } from '../../../controller/productContollers/discountController.js';
import { addCostPriceProfit, removeCostPriceProfit, updateCostPriceProfit } from '../../../controller/productContollers/costPriceProfitController.js';
import { addCostPrice, removeCostPrice } from '../../../controller/productContollers/costPriceController.js';
import { addSellingPrice, removeSellingPrice } from '../../../controller/productContollers/sellingPriceController.js';
;

const productRouter = express.Router();
 

productRouter.post('/create',verifyAuthAdminToken,adminAuthorizeRole('admin'),createProduct);
productRouter.delete('/delete/:id',verifyAuthAdminToken,adminAuthorizeRole('admin'),deleteProduct);
productRouter.put('/update/:id/category/:category',verifyAuthAdminToken,adminAuthorizeRole('admin'),updateProduct);

productRouter.put('/cost-price-profit/:id/add',verifyAuthAdminToken,adminAuthorizeRole('admin'),addCostPriceProfit);
productRouter.put('/cost-price-profit/:id/update',verifyAuthAdminToken,adminAuthorizeRole('admin'),updateCostPriceProfit);
productRouter.put('/cost-price-profit/:id/remove',verifyAuthAdminToken,adminAuthorizeRole('admin'),removeCostPriceProfit);

productRouter.put('/discount/:id/add',verifyAuthAdminToken,adminAuthorizeRole('admin'),addDiscount);
productRouter.put('/discount/:id/remove',verifyAuthAdminToken,adminAuthorizeRole('admin'),removeDiscount);

productRouter.put('/cost-price/:id/add',verifyAuthAdminToken,adminAuthorizeRole('admin'),addCostPrice);
productRouter.put('/cost-price/:id/remove',verifyAuthAdminToken,adminAuthorizeRole('admin'),removeCostPrice);


productRouter.put('/selling-price/:id/add',verifyAuthAdminToken,adminAuthorizeRole('admin'),addSellingPrice);
productRouter.put('/selling-price/:id/remove',verifyAuthAdminToken,adminAuthorizeRole('admin'),removeSellingPrice);


// for test
productRouter.get('/',verifyAuthStaffToken,staffAuthorizeRole("staff"),productListTest)
productRouter.get('/test',verifyAuthAdminToken,adminAuthorizeRole('admin'),productListTestforAdmin)


export default productRouter;