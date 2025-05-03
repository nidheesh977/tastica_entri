import express from "express";
import { checkStaffLogin,  loginStaff, logOutStaff } from "../../../controller/staffController.js";
import { verifyAuthStaffToken } from "../../../middleware/staff/authStaffVerifyToken.js";
import { staffAuthorizeRole } from "../../../middleware/staff/staffAuthorizeRole.js";
import { getAllProducts, getCategoryProducts } from "../../../controller/productContollers/productController.js";
import { getCategories } from "../../../controller/categoryController.js";
import { addProductToInvoice, createNewInvoiceTab, removeProductFromInvoice, saveInvoice } from "../../../controller/invoiceController.js";


const staffRouter = express.Router();


staffRouter.post('/login', loginStaff)

//  protected routes
staffRouter.get('/check-logged',verifyAuthStaffToken,staffAuthorizeRole("staff"),checkStaffLogin)
staffRouter.post('/logout',verifyAuthStaffToken,staffAuthorizeRole("staff"),logOutStaff)

staffRouter.get('/products/category-search',verifyAuthStaffToken,staffAuthorizeRole('staff'),getCategoryProducts);
staffRouter.get('/products/categories',verifyAuthStaffToken,staffAuthorizeRole('staff'),getCategories);
staffRouter.get('/products',verifyAuthStaffToken,staffAuthorizeRole('staff'),getAllProducts);

staffRouter.post('/invoice-create',verifyAuthStaffToken,staffAuthorizeRole('staff'),createNewInvoiceTab);
staffRouter.put('/invoice-save/:invoiceId',verifyAuthStaffToken,staffAuthorizeRole('staff'),saveInvoice);
staffRouter.put('/invoice/:invoiceId/add-products',verifyAuthStaffToken,staffAuthorizeRole('staff'),addProductToInvoice);
staffRouter.put('/invoice/:invoiceId/product/:invoiceProductId/remove',verifyAuthStaffToken,staffAuthorizeRole('staff'),removeProductFromInvoice);



export default staffRouter; 