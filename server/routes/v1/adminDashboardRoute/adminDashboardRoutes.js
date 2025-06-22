import express from 'express';
import { invoiceTotal, paymentMethodInvoice, yearBaseSale } from '../../../controller/dashboardController/dashboardController.js';
import { shopVerifyToken } from '../../../middleware/shopCookieTokenVerification.js';
import { userVerifyToken } from '../../../middleware/cookieTokenVerification.js';
import { checkUserRole } from '../../../middleware/authRoleVerification.js';


const adminDashBoardRouter = express.Router();


adminDashBoardRouter.get('/invoice/total',shopVerifyToken,userVerifyToken,checkUserRole('admin'),invoiceTotal);
adminDashBoardRouter.get('/invoice/total/year',shopVerifyToken,userVerifyToken,checkUserRole('admin'),yearBaseSale);


export default adminDashBoardRouter;