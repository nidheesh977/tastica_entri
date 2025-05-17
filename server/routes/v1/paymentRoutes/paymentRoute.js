import express from 'express';
import { cashPayment } from '../../../controller/paymentControllers/cashPaymentController.js';
import { onlinePaymentStripe } from '../../../controller/paymentControllers/onlinePymentController.js';


const paymentRouter = express.Router();


paymentRouter.post('/cash/invoice/:invoiceId',cashPayment);
paymentRouter.post('/card/invoice/:invoiceId',onlinePaymentStripe);

export default paymentRouter;