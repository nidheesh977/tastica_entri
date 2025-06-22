import express from 'express';
import { cashPayment } from '../../../controller/paymentControllers/cashPaymentController.js';
import { OnlinePaymentFailed, onlinePaymentStripe, OnlinePaymentSuccess } from '../../../controller/paymentControllers/onlinePymentController.js';
import { shopVerifyToken } from '../../../middleware/shopCookieTokenVerification.js';
import { userVerifyToken } from '../../../middleware/cookieTokenVerification.js';
import { checkUserRole } from '../../../middleware/authRoleVerification.js';
import { internalDevicePayment } from '../../../controller/paymentControllers/internalDevicePayment.js';
import { paymentRefund } from '../../../controller/paymentControllers/paymentRefundController.js';


const paymentRouter = express.Router();


paymentRouter.post('/cash/invoice/:invoiceId',shopVerifyToken,userVerifyToken,checkUserRole('admin','staff'),cashPayment);
paymentRouter.post('/internal-device/invoice/:invoiceId',shopVerifyToken,userVerifyToken,checkUserRole('admin','staff'),internalDevicePayment);

// invoice refund
paymentRouter.put('/:id/invoice',shopVerifyToken,userVerifyToken,checkUserRole('admin','staff'),paymentRefund);


paymentRouter.post('/card/invoice/:invoiceId',shopVerifyToken,userVerifyToken,checkUserRole('admin','staff'),onlinePaymentStripe);
paymentRouter.put('/card/success/invoice/:invoiceId',shopVerifyToken,userVerifyToken,checkUserRole('admin','staff'),OnlinePaymentSuccess);
paymentRouter.put('/card/failed/invoice/:invoiceId',shopVerifyToken,userVerifyToken,checkUserRole('admin','staff'),OnlinePaymentFailed);

export default paymentRouter; 