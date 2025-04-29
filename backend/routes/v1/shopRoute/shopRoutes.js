import {checkShopLogin, createShop, shopLogin} from '../../../controller/shopController.js';
import express from 'express';
import { verifyAuthAdminToken } from '../../../middleware/admin/authAdminVerifyToken.js';
import { adminAuthorizeRole } from '../../../middleware/admin/adminAuthorizeRole.js';
import { verifyAuthShopToken } from '../../../middleware/shop/authShopVerifyToken.js';


const shopRouter = express.Router();

shopRouter.post('/login-shop',shopLogin);

// protected routes
 shopRouter.post('/create-shop',verifyAuthAdminToken,adminAuthorizeRole("admin"),createShop);

//  check shop logged-in
 shopRouter.get('/check-logged',verifyAuthShopToken,checkShopLogin);


export default shopRouter;
