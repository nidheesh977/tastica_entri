import express from 'express';
import {addCategoryDiscount, createCategory, deleteCategory, getCategories, removeCategoryDiscount, updateCategory} from '../../../controller/categoryController.js'
import { checkUserRole } from '../../../middleware/authRoleVerification.js';
import { userVerifyToken } from '../../../middleware/cookieTokenVerification.js';

const categoryRoute = express.Router();

categoryRoute.post('/',userVerifyToken,checkUserRole("admin"),createCategory);
categoryRoute.delete('/:id',userVerifyToken,checkUserRole("admin"),deleteCategory);
categoryRoute.put('/:id',userVerifyToken,checkUserRole("admin"),updateCategory);
categoryRoute.patch('/:id/discount/add',userVerifyToken,checkUserRole("admin"),addCategoryDiscount);
categoryRoute.patch('/:id/discount/remove',userVerifyToken,checkUserRole("admin"),removeCategoryDiscount);

categoryRoute.get('/',userVerifyToken,checkUserRole("admin","staff"),getCategories);


export default categoryRoute;