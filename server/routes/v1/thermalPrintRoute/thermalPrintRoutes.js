import express from 'express'
import { thermalPrint } from '../../../controller/invoiceThermalPrintController/thermalPrintController.js';
import { shopVerifyToken } from '../../../middleware/shopCookieTokenVerification.js';
import { userVerifyToken } from '../../../middleware/cookieTokenVerification.js';
import { checkUserRole } from '../../../middleware/authRoleVerification.js';


const printRouter = express.Router();


printRouter.post('/',shopVerifyToken,userVerifyToken,checkUserRole("admin","staff"),thermalPrint);

export default printRouter