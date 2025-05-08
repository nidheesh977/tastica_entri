import {checkShopLogin, createShop, deleteShop, logOutShop, shopLogin, shopUpdate} from '../../../controller/shopController.js';
import express from 'express';
import { userVerifyToken } from '../../../middleware/cookieTokenVerification.js';
import { checkUserRole } from '../../../middleware/authRoleVerification.js';
import { shopVerifyToken } from '../../../middleware/shopCookieTokenVerification.js';



const shopRouter = express.Router();

shopRouter.post('/login',shopLogin);

// protected routes
 shopRouter.post('/create',userVerifyToken,checkUserRole("admin"),createShop);


 //  check shop logged-in
 shopRouter.post('/logout',shopVerifyToken,logOutShop);
 shopRouter.get('/check-login',shopVerifyToken,checkShopLogin);
 shopRouter.put('/',shopVerifyToken,userVerifyToken,checkUserRole("admin"),shopUpdate);
 shopRouter.delete('/',shopVerifyToken,userVerifyToken,checkUserRole("admin"),deleteShop);


export default shopRouter;
