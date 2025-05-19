import express from 'express';
import {addCategoryDiscount, createCategory, deleteCategory, getCategories, removeCategoryDiscount, updateCategory} from '../../../controller/categoryController.js'
import { checkUserRole } from '../../../middleware/authRoleVerification.js';
import { userVerifyToken } from '../../../middleware/cookieTokenVerification.js';
import {shopVerifyToken} from '../../../middleware/shopCookieTokenVerification.js'

const categoryRoute = express.Router();

categoryRoute.post('/',shopVerifyToken,userVerifyToken,checkUserRole("admin"),createCategory);
categoryRoute.delete('/:id',shopVerifyToken,userVerifyToken,checkUserRole("admin"),deleteCategory);
categoryRoute.put('/:id',shopVerifyToken,userVerifyToken,checkUserRole("admin"),updateCategory);
categoryRoute.patch('/:id/discount/add',shopVerifyToken,userVerifyToken,checkUserRole("admin"),addCategoryDiscount);
categoryRoute.patch('/:id/discount/remove',shopVerifyToken,userVerifyToken,checkUserRole("admin"),removeCategoryDiscount);

categoryRoute.get('/',shopVerifyToken,userVerifyToken,checkUserRole("admin","staff"),getCategories);


export default categoryRoute; 