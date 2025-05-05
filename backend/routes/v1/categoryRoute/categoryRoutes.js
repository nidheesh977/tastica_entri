import express from 'express';
import {addCategoryDiscount, createCategory, deleteCategory, getCategories, removeCategoryDiscount, updateCategory} from '../../../controller/categoryController.js'
import { checkUserRole } from '../../../middleware/authRoleVerification.js';
import { verifyToken } from '../../../middleware/cookieTokenVerification.js';

const categoryRoute = express.Router();

categoryRoute.post('/',verifyToken,checkUserRole("admin"),createCategory);
categoryRoute.delete('/:id',verifyToken,checkUserRole("admin"),deleteCategory);
categoryRoute.put('/:id',verifyToken,checkUserRole("admin"),updateCategory);
categoryRoute.patch('/:id/discount/add',verifyToken,checkUserRole("admin"),addCategoryDiscount);
categoryRoute.patch('/:id/discount/remove',verifyToken,checkUserRole("admin"),removeCategoryDiscount);

categoryRoute.get('/',verifyToken,checkUserRole("admin","staff"),getCategories);


export default categoryRoute;