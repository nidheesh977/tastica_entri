import express from 'express'
import { createCustomProduct } from '../../../controller/customProductController.js';
import { shopVerifyToken } from '../../../middleware/shopCookieTokenVerification.js';
import { userVerifyToken } from '../../../middleware/cookieTokenVerification.js';
import { checkUserRole } from '../../../middleware/authRoleVerification.js';


const customProductRouter = express.Router();


customProductRouter.post('/create',shopVerifyToken,userVerifyToken,checkUserRole('admin','staff'),createCustomProduct)

export default customProductRouter