import express from "express"
import { shopVerifyToken } from "../../../middleware/shopCookieTokenVerification.js";
import { userVerifyToken } from "../../../middleware/cookieTokenVerification.js";
import { checkUserRole } from "../../../middleware/authRoleVerification.js";
import { createCustomInvoiceCustomer, getCustomCustomerForForm, getCustomCustomerInvoice } from "../../../controller/customInvoiceController/index.js";


const customInvoiceRouter = express.Router();


customInvoiceRouter.post('/customer/create', shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), createCustomInvoiceCustomer)
customInvoiceRouter.get('/customer', shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), getCustomCustomerInvoice)
customInvoiceRouter.get('/customer/form', shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), getCustomCustomerForForm)

export default customInvoiceRouter