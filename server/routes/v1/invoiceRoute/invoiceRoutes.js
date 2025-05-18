import express from 'express'
import { addProductToInvoice, createNewInvoiceTab, removeProductFromInvoice,getInvoice, getFullInvoice, invoiceSave, getSavedInvoice } from '../../../controller/invoiceController.js';
import { userVerifyToken } from '../../../middleware/cookieTokenVerification.js';
import { checkUserRole } from '../../../middleware/authRoleVerification.js';
import { shopVerifyToken } from '../../../middleware/shopCookieTokenVerification.js';

const invoiceRouter = express.Router()

invoiceRouter.post('/:customerId',shopVerifyToken,userVerifyToken,checkUserRole('admin','staff'),createNewInvoiceTab);
invoiceRouter.post('/:invoiceId/products',shopVerifyToken,userVerifyToken,checkUserRole('admin','staff'),addProductToInvoice);
invoiceRouter.put('/:invoiceId/product/:productsId',shopVerifyToken,userVerifyToken,checkUserRole('admin','staff'),removeProductFromInvoice);
invoiceRouter.get('/:invoiceId',shopVerifyToken,userVerifyToken,checkUserRole('admin','staff'),getInvoice);
invoiceRouter.patch('/:id',shopVerifyToken,userVerifyToken,checkUserRole('admin','staff'),invoiceSave);
invoiceRouter.get('/saved',shopVerifyToken,userVerifyToken,checkUserRole('admin','staff'),getSavedInvoice);

//  This route only admin
invoiceRouter.get('/',shopVerifyToken,userVerifyToken,checkUserRole('admin'),getFullInvoice);






export default invoiceRouter