import {createShop, shopLogin} from '../../../controller/shopController.js';
import express from 'express';
import { verifyAuthAdminToken } from '../../../middleware/admin/authAdminVerifyToken.js';
import { adminAuthorizeRole } from '../../../middleware/admin/adminAuthorizeRole.js';


const shopRouter = express.Router();

shopRouter.post('/login-shop',shopLogin);

// protected routes
 shopRouter.post('/create-shop',verifyAuthAdminToken,adminAuthorizeRole("admin"),createShop);


export default shopRouter;
