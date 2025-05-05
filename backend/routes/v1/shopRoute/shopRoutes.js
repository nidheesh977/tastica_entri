import {checkShopLogin, createShop, logOutShop, shopLogin} from '../../../controller/shopController.js';
import express from 'express';
import { verifyToken } from '../../../middleware/cookieTokenVerification.js';
import { checkUserRole } from '../../../middleware/authRoleVerification.js';



const shopRouter = express.Router();

shopRouter.post('/login-shop',shopLogin);

// protected routes
 shopRouter.post('/create-shop',verifyToken,checkUserRole("admin"),createShop);
 shopRouter.post('/logout',verifyToken,logOutShop);

//  check shop logged-in
 shopRouter.get('/check-logged',verifyToken,checkShopLogin);


export default shopRouter;
