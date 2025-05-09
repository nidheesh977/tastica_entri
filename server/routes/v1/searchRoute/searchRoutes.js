import express from 'express';
import { searchProduct } from '../../../controller/searchController.js';
import { shopVerifyToken } from '../../../middleware/shopCookieTokenVerification.js';
import { userVerifyToken } from '../../../middleware/cookieTokenVerification.js';
import { checkUserRole } from '../../../middleware/authRoleVerification.js';

const searchRouter = express.Router()

searchRouter.get('/product',shopVerifyToken,userVerifyToken,checkUserRole('admin','staff'),searchProduct);

 export default searchRouter 