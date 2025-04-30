import express from 'express';
import { createProduct, deleteProduct, productListTest,productListTestforAdmin, updateProduct } from '../../../controller/productController.js';
import { verifyAuthStaffToken } from '../../../middleware/staff/authStaffVerifyToken.js';
import { staffAuthorizeRole } from '../../../middleware/staff/staffAuthorizeRole.js';
import { verifyAuthAdminToken } from '../../../middleware/admin/authAdminVerifyToken.js';
import { adminAuthorizeRole } from '../../../middleware/admin/adminAuthorizeRole.js';

const productRouter = express.Router();


productRouter.post('/create/:category',verifyAuthAdminToken,adminAuthorizeRole('admin'),createProduct)
productRouter.delete('/delete/:id',verifyAuthAdminToken,adminAuthorizeRole('admin'),deleteProduct)
productRouter.put('/update/:id/category/:category',verifyAuthAdminToken,adminAuthorizeRole('admin'),updateProduct)

// for test
productRouter.get('/',verifyAuthStaffToken,staffAuthorizeRole("staff"),productListTest)
productRouter.get('/test',verifyAuthAdminToken,adminAuthorizeRole('admin'),productListTestforAdmin)


export default productRouter;