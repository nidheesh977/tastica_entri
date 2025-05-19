import express from 'express'
import { addProductToInvoice, createNewInvoiceTab, removeProductFromInvoice,getInvoice, getFullInvoice, invoiceSave, getInvoiceSaved, getInvoiceWithId} from '../../../controller/invoiceController.js';
import { userVerifyToken } from '../../../middleware/cookieTokenVerification.js';
import { checkUserRole } from '../../../middleware/authRoleVerification.js';
import { shopVerifyToken } from '../../../middleware/shopCookieTokenVerification.js';

const invoiceRouter = express.Router()

//  This route only admin
 invoiceRouter.get('/',shopVerifyToken,userVerifyToken,checkUserRole('admin'),getFullInvoice);

invoiceRouter.post('/:customerId',shopVerifyToken,userVerifyToken,checkUserRole('admin','staff'),createNewInvoiceTab);
invoiceRouter.post('/:invoiceId/products',shopVerifyToken,userVerifyToken,checkUserRole('admin','staff'),addProductToInvoice);
invoiceRouter.put('/:invoiceId/product/:productsId',shopVerifyToken,userVerifyToken,checkUserRole('admin','staff'),removeProductFromInvoice);
invoiceRouter.get('/:invoiceId',shopVerifyToken,userVerifyToken,checkUserRole('admin','staff'),getInvoice);
invoiceRouter.patch('/:id',shopVerifyToken,userVerifyToken,checkUserRole('admin','staff'),invoiceSave);
invoiceRouter.get('/save/status-saved',shopVerifyToken,userVerifyToken,checkUserRole('admin','staff'),getInvoiceSaved)

invoiceRouter.post('/',getInvoiceWithId)


 
export default invoiceRouter