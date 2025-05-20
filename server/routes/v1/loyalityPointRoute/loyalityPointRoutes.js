import express from 'express';
import { createLoyalityRate, deleteLoyalityPoint, updateLoyalityRate } from '../../../controller/loyalityPointController/loyalityPointController.js';
import { shopVerifyToken } from '../../../middleware/shopCookieTokenVerification.js';
import { userVerifyToken } from '../../../middleware/cookieTokenVerification.js';
import { checkUserRole } from '../../../middleware/authRoleVerification.js';

const loyalityRouter = express.Router()

loyalityRouter.post('/',shopVerifyToken,userVerifyToken,checkUserRole("admin"),createLoyalityRate);
loyalityRouter.patch('/:id',shopVerifyToken,userVerifyToken,checkUserRole("admin"),updateLoyalityRate);
loyalityRouter.delete('/:id',shopVerifyToken,userVerifyToken,checkUserRole("admin"),deleteLoyalityPoint);

export default loyalityRouter