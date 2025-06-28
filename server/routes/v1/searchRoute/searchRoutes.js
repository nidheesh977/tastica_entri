import express from 'express';
import { searchCustomer, productFilter, searchProduct, staffFilter } from '../../../controller/searchController/searchController.js';
import { shopVerifyToken } from '../../../middleware/shopCookieTokenVerification.js';
import { userVerifyToken } from '../../../middleware/cookieTokenVerification.js';
import { checkUserRole } from '../../../middleware/authRoleVerification.js';

const searchRouter = express.Router()

searchRouter.get('/product',shopVerifyToken,userVerifyToken,checkUserRole('admin','staff'),searchProduct);
searchRouter.get('/product/filter',shopVerifyToken,userVerifyToken,checkUserRole('admin'),productFilter);
searchRouter.get('/staff',shopVerifyToken,userVerifyToken,checkUserRole('admin'),staffFilter);
searchRouter.get('/customer',shopVerifyToken,userVerifyToken,checkUserRole('admin','staff'),searchCustomer);

 export default searchRouter 