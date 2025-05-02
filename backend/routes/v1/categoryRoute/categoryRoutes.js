import express from 'express';
import {addCategoryDiscount, createCategory, deleteCategory, removeCategoryDiscount, updateCategory} from '../../../controller/categoryController.js'
import { adminAuthorizeRole } from '../../../middleware/admin/adminAuthorizeRole.js';
import { verifyAuthAdminToken } from '../../../middleware/admin/authAdminVerifyToken.js';

const categoryRoute = express.Router();

categoryRoute.post('/create',verifyAuthAdminToken,adminAuthorizeRole("admin"),createCategory);
categoryRoute.delete('/delete/:id',verifyAuthAdminToken,adminAuthorizeRole("admin"),deleteCategory);
categoryRoute.put('/update/:id',verifyAuthAdminToken,adminAuthorizeRole("admin"),updateCategory);

categoryRoute.put('/discount-add/:id',verifyAuthAdminToken,adminAuthorizeRole("admin"),addCategoryDiscount);
categoryRoute.put('/discount-remove/:id',verifyAuthAdminToken,adminAuthorizeRole("admin"),removeCategoryDiscount);


export default categoryRoute;