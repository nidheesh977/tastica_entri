import express from 'express';
import { addRedeemToInvoice } from '../../../controller/redeemController/redeemController.js';
import { shopVerifyToken } from '../../../middleware/shopCookieTokenVerification.js';
import { userVerifyToken } from '../../../middleware/cookieTokenVerification.js';
import { checkUserRole } from '../../../middleware/authRoleVerification.js';

const redeemRouter = express.Router()

redeemRouter.put('/:invoiceId',shopVerifyToken,userVerifyToken,checkUserRole('admin','staff'),addRedeemToInvoice)

export default redeemRouter 