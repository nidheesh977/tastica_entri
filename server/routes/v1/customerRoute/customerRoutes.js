import express from 'express'
import { createCustomer,deleteCustomer,getCustomer,getSingleCustomer,updateCustomer } from '../../../controller/customerController/customerController.js';
import { shopVerifyToken } from '../../../middleware/shopCookieTokenVerification.js';
import { userVerifyToken } from '../../../middleware/cookieTokenVerification.js';
import { checkUserRole } from '../../../middleware/authRoleVerification.js';
import { checkPermission } from '../../../middleware/permissonMiddleware.js';


const customerRouter = express.Router();

customerRouter.post('/create',shopVerifyToken,userVerifyToken,checkUserRole("admin","staff"),createCustomer);
customerRouter.get('/',shopVerifyToken,userVerifyToken,checkUserRole("admin","staff"),checkPermission("customer_read"),getCustomer);
customerRouter.put('/:id',shopVerifyToken,userVerifyToken,checkUserRole("admin","staff"),checkPermission("customer_update"),updateCustomer);
customerRouter.delete('/:id',shopVerifyToken,userVerifyToken,checkUserRole("admin","staff"),checkPermission("customer_delete"),deleteCustomer);
customerRouter.get('/:id',shopVerifyToken,userVerifyToken,checkUserRole("admin","staff"),getSingleCustomer);
export default customerRouter; 
