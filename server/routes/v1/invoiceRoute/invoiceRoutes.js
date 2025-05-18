import express from 'express'
import { addProductToInvoice, createNewInvoiceTab, removeProductFromInvoice,getInvoice, getFullInvoice } from '../../../controller/invoiceController.js';
import { userVerifyToken } from '../../../middleware/cookieTokenVerification.js';
import { checkUserRole } from '../../../middleware/authRoleVerification.js';
import { shopVerifyToken } from '../../../middleware/shopCookieTokenVerification.js';

const invoiceRouter = express.Router()

invoiceRouter.post('/:customerId',shopVerifyToken,userVerifyToken,checkUserRole('admin','staff'),createNewInvoiceTab);
invoiceRouter.post('/:invoiceId/products',userVerifyToken,checkUserRole('admin','staff'),addProductToInvoice);
invoiceRouter.put('/:invoiceId/product/:productsId',userVerifyToken,checkUserRole('admin','staff'),removeProductFromInvoice);
invoiceRouter.get('/:invoiceId',userVerifyToken,checkUserRole('admin','staff'),getInvoice);

//  This route only admin
invoiceRouter.get('/',shopVerifyToken,userVerifyToken,checkUserRole('admin'),getFullInvoice);




// invoiceRouter.patch('/:id',userVerifyToken,checkUserRole('admin','staff'),saveInvoice);

export default invoiceRouter