import express from 'express';
import { createProduct, productListTest,productListTestforAdmin } from '../../../controller/productController.js';
import { verifyAuthStaffToken } from '../../../middleware/staff/authStaffVerifyToken.js';
import { staffAuthorizeRole } from '../../../middleware/staff/staffAuthorizeRole.js';
import { verifyAuthAdminToken } from '../../../middleware/admin/authAdminVerifyToken.js';
import { adminAuthorizeRole } from '../../../middleware/admin/adminAuthorizeRole.js';

const productRouter = express.Router();


productRouter.post('/create',createProduct)

// for test
productRouter.get('/',verifyAuthStaffToken,staffAuthorizeRole("staff"),productListTest)
productRouter.get('/test',verifyAuthAdminToken,adminAuthorizeRole('admin',),productListTestforAdmin)


export default productRouter;