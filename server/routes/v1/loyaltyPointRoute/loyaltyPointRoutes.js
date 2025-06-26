import express from 'express';
import { createLoyalityRate, deleteLoyalityPoint, getLoyalityRate, updateLoyalityRate, loyalityToProduct } from '../../../controller/loyalityPointController/loyalityPointController.js';
import { shopVerifyToken } from '../../../middleware/shopCookieTokenVerification.js';
import { userVerifyToken } from '../../../middleware/cookieTokenVerification.js';
import { checkUserRole } from '../../../middleware/authRoleVerification.js';

const loyaltyRouter = express.Router()

loyaltyRouter.post('/',shopVerifyToken,userVerifyToken,checkUserRole("admin"),createLoyalityRate);
loyaltyRouter.patch('/:id',shopVerifyToken,userVerifyToken,checkUserRole("admin"),updateLoyalityRate);
loyaltyRouter.delete('/:id',shopVerifyToken,userVerifyToken,checkUserRole("admin"),deleteLoyalityPoint);
loyaltyRouter.get('/',shopVerifyToken,userVerifyToken,checkUserRole("admin","staff"),getLoyalityRate);

loyaltyRouter.put('/products',shopVerifyToken,userVerifyToken,checkUserRole("admin"),loyalityToProduct);

 
export default loyaltyRouter