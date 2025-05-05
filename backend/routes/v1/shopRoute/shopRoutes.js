import {checkShopLogin, createShop, logOutShop, shopLogin} from '../../../controller/shopController.js';
import express from 'express';
import { userVerifyToken } from '../../../middleware/cookieTokenVerification.js';
import { checkUserRole } from '../../../middleware/authRoleVerification.js';
import { shopVerifyToken } from '../../../middleware/shopCookieTokenVerification.js';



const shopRouter = express.Router();

shopRouter.post('/login-shop',shopLogin);

// protected routes
 shopRouter.post('/create-shop',userVerifyToken,checkUserRole("admin"),createShop);


 //  check shop logged-in
 shopRouter.post('/logout',shopVerifyToken,logOutShop);
 shopRouter.get('/check-logged',shopVerifyToken,checkShopLogin);


export default shopRouter;
