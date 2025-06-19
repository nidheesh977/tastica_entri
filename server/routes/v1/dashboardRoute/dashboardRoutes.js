import express from 'express';
import { invoiceTotal, monthBaseTotal, paymentMethodInvoice, yearBaseSale } from '../../../controller/dashboardController.js/adminDashboard.js';
import { shopVerifyToken } from '../../../middleware/shopCookieTokenVerification.js';
import { userVerifyToken } from '../../../middleware/cookieTokenVerification.js';
import { checkUserRole } from '../../../middleware/authRoleVerification.js';


const dashBoardRouter = express.Router();


dashBoardRouter.get('/invoice/total',shopVerifyToken,userVerifyToken,checkUserRole('admin'),invoiceTotal);
dashBoardRouter.get('/invoice/total/month',shopVerifyToken,userVerifyToken,checkUserRole('admin'),monthBaseTotal);
dashBoardRouter.get('/invoice/total/year',shopVerifyToken,userVerifyToken,checkUserRole('admin'),yearBaseSale);

dashBoardRouter.get('/invoice/payment-method',shopVerifyToken,userVerifyToken,checkUserRole('admin'),paymentMethodInvoice);

export default dashBoardRouter;