import express from 'express'
import { addProductToInvoice, createNewInvoiceTab, removeProductFromInvoice, saveInvoice } from '../../../controller/invoiceController.js';
import { userVerifyToken } from '../../../middleware/cookieTokenVerification.js';
import { checkUserRole } from '../../../middleware/authRoleVerification.js';

const invoiceRouter = express.Router()

invoiceRouter.post('/',userVerifyToken,checkUserRole('admin','staff'),createNewInvoiceTab);
invoiceRouter.patch('/:id/products',userVerifyToken,checkUserRole('admin','staff'),addProductToInvoice);
invoiceRouter.patch('/:id/products/:productId',userVerifyToken,checkUserRole('admin','staff'),removeProductFromInvoice);
invoiceRouter.patch('/:id',userVerifyToken,checkUserRole('admin','staff'),saveInvoice);

export default invoiceRouter