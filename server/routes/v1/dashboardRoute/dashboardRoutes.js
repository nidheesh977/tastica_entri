import express from 'express';
import { invoiceTotal, monthBaseTotal } from '../../../controller/adminController/adminDashboard.js';
import { shopVerifyToken } from '../../../middleware/shopCookieTokenVerification.js';
import { userVerifyToken } from '../../../middleware/cookieTokenVerification.js';
import { checkUserRole } from '../../../middleware/authRoleVerification.js';


const dashBoardRouter = express.Router();


dashBoardRouter.get('/invoice/total',shopVerifyToken,userVerifyToken,checkUserRole('admin'),invoiceTotal);
dashBoardRouter.get('/invoice/total/month',shopVerifyToken,userVerifyToken,checkUserRole('admin'),monthBaseTotal);

export default dashBoardRouter;