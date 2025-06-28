import express from 'express';
import { createLoyaltyRate, deleteLoyaltyPoint, getLoyaltyRate, updateLoyaltyRate, loyaltyToProduct } from '../../../controller/loyaltyPointController/loyaltyPointController.js';
import { shopVerifyToken } from '../../../middleware/shopCookieTokenVerification.js';
import { userVerifyToken } from '../../../middleware/cookieTokenVerification.js';
import { checkUserRole } from '../../../middleware/authRoleVerification.js';

const loyaltyRouter = express.Router()

loyaltyRouter.post('/',shopVerifyToken,userVerifyToken,checkUserRole("admin"),createLoyaltyRate);
loyaltyRouter.patch('/:id',shopVerifyToken,userVerifyToken,checkUserRole("admin"),updateLoyaltyRate);
loyaltyRouter.delete('/:id',shopVerifyToken,userVerifyToken,checkUserRole("admin"),deleteLoyaltyPoint);
loyaltyRouter.get('/',shopVerifyToken,userVerifyToken,checkUserRole("admin","staff"),getLoyaltyRate);
loyaltyRouter.put('/products',shopVerifyToken,userVerifyToken,checkUserRole("admin"),loyaltyToProduct);

 
export default loyaltyRouter