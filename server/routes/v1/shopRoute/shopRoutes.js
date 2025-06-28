import {checkShopLogin, logOutShop, shopLogin} from '../../../controller/shopController/shopController.js';
import express from 'express';
import { shopVerifyToken } from '../../../middleware/shopCookieTokenVerification.js';



const shopRouter = express.Router();

shopRouter.post('/login',shopLogin);
 shopRouter.post('/logout',shopVerifyToken,logOutShop);
 shopRouter.get('/check-login',shopVerifyToken,checkShopLogin);




export default shopRouter;
