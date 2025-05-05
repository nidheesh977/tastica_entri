import express from 'express'
import { addProductToInvoice, createNewInvoiceTab, removeProductFromInvoice, saveInvoice } from '../../../controller/invoiceController.js';
import { verifyToken } from '../../../middleware/cookieTokenVerification.js';
import { checkUserRole } from '../../../middleware/authRoleVerification.js';

const invoiceRouter = express.Router()

invoiceRouter.post('/',verifyToken,checkUserRole('admin','staff'),createNewInvoiceTab);
invoiceRouter.patch('/:id/products',verifyToken,checkUserRole('admin','staff'),addProductToInvoice);
invoiceRouter.patch('/:id/products/:productId',verifyToken,checkUserRole('admin','staff'),removeProductFromInvoice);
invoiceRouter.patch('/:id',verifyToken,checkUserRole('admin','staff'),saveInvoice);

export default invoiceRouter