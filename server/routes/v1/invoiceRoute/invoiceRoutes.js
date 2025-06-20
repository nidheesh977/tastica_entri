import express from 'express'
import { addProductToInvoice, createNewInvoiceTab, removeProductFromInvoice,getInvoice, getFullInvoice, invoiceSave, getInvoiceSaved, getInvoiceWithId, deleteOpenOrder, invoiceClear} from '../../../controller/invoiceController/invoiceController.js';
import { userVerifyToken } from '../../../middleware/cookieTokenVerification.js';
import { checkUserRole } from '../../../middleware/authRoleVerification.js';
import { shopVerifyToken } from '../../../middleware/shopCookieTokenVerification.js';

const invoiceRouter = express.Router()

//  This route only admin
invoiceRouter.get('/',shopVerifyToken,userVerifyToken,checkUserRole('admin', 'staff'),getFullInvoice);

invoiceRouter.post('/:customerId',shopVerifyToken,userVerifyToken,checkUserRole('admin','staff'),createNewInvoiceTab);
invoiceRouter.post('/:invoiceId/products',shopVerifyToken,userVerifyToken,checkUserRole('admin','staff'),addProductToInvoice);
invoiceRouter.put('/:invoiceId/product/:productsId',shopVerifyToken,userVerifyToken,checkUserRole('admin','staff'),removeProductFromInvoice);
invoiceRouter.get('/:invoiceId',shopVerifyToken,userVerifyToken,checkUserRole('admin','staff'),getInvoice);
invoiceRouter.patch('/:id',shopVerifyToken,userVerifyToken,checkUserRole('admin','staff'),invoiceSave);
invoiceRouter.get('/save/status-saved',shopVerifyToken,userVerifyToken,checkUserRole('admin','staff'),getInvoiceSaved)

invoiceRouter.delete('/status-saved/:id',shopVerifyToken,userVerifyToken,checkUserRole('admin','staff'),deleteOpenOrder)

invoiceRouter.post('/',shopVerifyToken,userVerifyToken,checkUserRole('admin','staff'),getInvoiceWithId)
invoiceRouter.put('/:id/clear',shopVerifyToken,userVerifyToken,checkUserRole('admin','staff'),invoiceClear)

 
  
export default invoiceRouter
