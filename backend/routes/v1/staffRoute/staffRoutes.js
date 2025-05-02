import express from "express";
import { checkStaffLogin,  loginStaff, logOutStaff } from "../../../controller/staffController.js";
import { verifyAuthStaffToken } from "../../../middleware/staff/authStaffVerifyToken.js";
import { staffAuthorizeRole } from "../../../middleware/staff/staffAuthorizeRole.js";
import { getCategoryProducts } from "../../../controller/productContollers/productController.js";
import { getCategories } from "../../../controller/categoryController.js";

const staffRouter = express.Router();


staffRouter.post('/login', loginStaff)

//  protected routes
staffRouter.get('/check-logged',verifyAuthStaffToken,staffAuthorizeRole("staff"),checkStaffLogin)
staffRouter.post('/logout',verifyAuthStaffToken,staffAuthorizeRole("staff"),logOutStaff)

staffRouter.get('/products/category-search',verifyAuthStaffToken,staffAuthorizeRole('staff'),getCategoryProducts);
staffRouter.get('/products/categories',verifyAuthStaffToken,staffAuthorizeRole('staff'),getCategories);


export default staffRouter; 