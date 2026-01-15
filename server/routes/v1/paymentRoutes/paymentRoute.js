import express from 'express';
import { cashPayment } from '../../../controller/paymentControllers/cashPaymentController.js';
import { OnlinePaymentFailed, onlinePaymentStripe, OnlinePaymentSuccess } from '../../../controller/paymentControllers/onlinePymentController.js';
import { shopVerifyToken } from '../../../middleware/shopCookieTokenVerification.js';
import { userVerifyToken } from '../../../middleware/cookieTokenVerification.js';
import { checkUserRole } from '../../../middleware/authRoleVerification.js';
import { internalDevicePayment } from '../../../controller/paymentControllers/internalDevicePayment.js';
import { paymentRefund } from '../../../controller/paymentControllers/paymentRefundController.js';
import { payCreditAmount, addCredit, createCreditBook, getCreditBooks, getSingleCreditBookForPayment, getCreditSingleBookForDisplay, clearAdvanceAmt } from '../../../controller/paymentControllers/creditPaymentController.js';
import { checkPermission } from '../../../middleware/permissonMiddleware.js';


const paymentRouter = express.Router();



paymentRouter.post('/cash/invoice/:invoiceId', shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), cashPayment);
paymentRouter.post('/internal-device/invoice/:invoiceId', shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), internalDevicePayment);

paymentRouter.post('/create/credit/invoice/:invoiceId', shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), checkPermission("credit_create"), createCreditBook);
paymentRouter.post('/credit/invoice/:invoiceId', shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), checkPermission("credit_give"), addCredit);
paymentRouter.put('/pay-credit/:bookid', shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), checkPermission("credit_pay"), payCreditAmount);
paymentRouter.get('/credits', shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), checkPermission("credit_read"), getCreditBooks)
paymentRouter.get('/credit/pay/:id', shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), checkPermission("credit_read"), getSingleCreditBookForPayment)
paymentRouter.get('/credit/:id', shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), checkPermission("credit_read"), getCreditSingleBookForDisplay)
paymentRouter.patch('/credit/:id', shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), checkPermission("credit_pay"), clearAdvanceAmt)


// invoice refund
paymentRouter.put('/:id/invoice', shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), paymentRefund);


paymentRouter.post('/card/invoice/:invoiceId', shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), onlinePaymentStripe);
paymentRouter.put('/card/success/invoice/:invoiceId', shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), OnlinePaymentSuccess);
paymentRouter.put('/card/failed/invoice/:invoiceId', shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), OnlinePaymentFailed);

export default paymentRouter; 