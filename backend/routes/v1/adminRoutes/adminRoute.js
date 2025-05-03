import express from 'express'
import { loginAdmin, CreateEmployee, checkAdminLogin, logOutAdmin } from '../../../controller/adminController.js';
import { verifyAuthAdminToken } from '../../../middleware/admin/authAdminVerifyToken.js';
import { adminAuthorizeRole } from '../../../middleware/admin/adminAuthorizeRole.js';
import { getAllProducts, getCategoryProducts } from '../../../controller/productContollers/productController.js';
import { getCategories } from '../../../controller/categoryController.js';
import { addProductToInvoice, createNewInvoiceTab, removeProductFromInvoice, saveInvoice } from '../../../controller/invoiceController.js';


const adminRouter = express.Router();

adminRouter.post('/login',loginAdmin);

// protected routes
adminRouter.post('/create-employee',verifyAuthAdminToken,adminAuthorizeRole("admin"),CreateEmployee)
adminRouter.post('/logout',verifyAuthAdminToken,adminAuthorizeRole("admin"),logOutAdmin)
adminRouter.get('/check-logged',verifyAuthAdminToken,adminAuthorizeRole("admin"),checkAdminLogin)

adminRouter.get('/products/category-search',verifyAuthAdminToken,adminAuthorizeRole('admin'),getCategoryProducts);
adminRouter.get('/products/categories',verifyAuthAdminToken,adminAuthorizeRole('admin'),getCategories);
adminRouter.get('/products',verifyAuthAdminToken,adminAuthorizeRole('admin'),getAllProducts);

adminRouter.post('/invoice-create',verifyAuthAdminToken,adminAuthorizeRole('admin'),createNewInvoiceTab);
adminRouter.put('/invoice/:invoiceId/add-products',verifyAuthAdminToken,adminAuthorizeRole('admin'),addProductToInvoice);
adminRouter.put('/invoice/:invoiceId/product/:invoiceProductId/remove',verifyAuthAdminToken,adminAuthorizeRole('admin'),removeProductFromInvoice);
adminRouter.put('/invoice-save/:invoiceId',verifyAuthAdminToken,adminAuthorizeRole('admin'),saveInvoice);
 
export default adminRouter;