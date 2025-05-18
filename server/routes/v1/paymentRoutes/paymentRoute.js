import express from 'express';
import { cashPayment } from '../../../controller/paymentControllers/cashPaymentController.js';
import { onlinePaymentStripe } from '../../../controller/paymentControllers/onlinePymentController.js';
import { shopVerifyToken } from '../../../middleware/shopCookieTokenVerification.js';
import { userVerifyToken } from '../../../middleware/cookieTokenVerification.js';
import { checkUserRole } from '../../../middleware/authRoleVerification.js';


const paymentRouter = express.Router();


paymentRouter.post('/cash/invoice/:invoiceId',shopVerifyToken,userVerifyToken,checkUserRole('admin','staff'),cashPayment);
paymentRouter.post('/card/invoice/:invoiceId',shopVerifyToken,userVerifyToken,checkUserRole('admin','staff'),onlinePaymentStripe);

export default paymentRouter;