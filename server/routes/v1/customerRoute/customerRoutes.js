import express from 'express'
import { createCustomer,deleteCustomer,getCustomer,getSingleCustomer,updateCustomer } from '../../../controller/customerController.js';
import { shopVerifyToken } from '../../../middleware/shopCookieTokenVerification.js';
import { userVerifyToken } from '../../../middleware/cookieTokenVerification.js';
import { checkUserRole } from '../../../middleware/authRoleVerification.js';


const customerRouter = express.Router();

customerRouter.post('/create',shopVerifyToken,userVerifyToken,checkUserRole("admin","staff"),createCustomer);
customerRouter.get('/',shopVerifyToken,userVerifyToken,checkUserRole("admin","staff"),getCustomer);

customerRouter.put('/:id',shopVerifyToken,userVerifyToken,checkUserRole("admin"),updateCustomer);
customerRouter.delete('/:id',shopVerifyToken,userVerifyToken,checkUserRole("admin"),deleteCustomer);
customerRouter.get('/:id',shopVerifyToken,userVerifyToken,checkUserRole("admin"),getSingleCustomer);
export default customerRouter; 