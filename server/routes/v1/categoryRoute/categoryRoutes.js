import express from 'express';
import {addCategoryDiscount, createCategory, deleteCategory, getCategories, removeCategoryDiscount, updateCategory} from '../../../controller/categoryController/categoryController.js'
import { checkUserRole } from '../../../middleware/authRoleVerification.js';
import { userVerifyToken } from '../../../middleware/cookieTokenVerification.js';
import {shopVerifyToken} from '../../../middleware/shopCookieTokenVerification.js'
import { checkPermission } from '../../../middleware/permissonMiddleware.js';

const categoryRoute = express.Router();

categoryRoute.post('/',shopVerifyToken,userVerifyToken,checkUserRole("admin","staff"),checkPermission("category_create"),createCategory);
categoryRoute.delete('/:id',shopVerifyToken,userVerifyToken,checkUserRole("admin","staff"),checkPermission("category_delete"),deleteCategory);
categoryRoute.put('/:id',shopVerifyToken,userVerifyToken,checkUserRole("admin","staff"),checkPermission("category_update"),updateCategory);
categoryRoute.patch('/:id/discount/add',shopVerifyToken,userVerifyToken,checkUserRole("admin"),addCategoryDiscount);
categoryRoute.patch('/:id/discount/remove',shopVerifyToken,userVerifyToken,checkUserRole("admin"),removeCategoryDiscount);

categoryRoute.get('/',shopVerifyToken,userVerifyToken,checkUserRole("admin","staff"),checkPermission("category_read"),getCategories);


export default categoryRoute; 