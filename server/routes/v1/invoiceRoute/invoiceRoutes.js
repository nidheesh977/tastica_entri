import express from 'express'
import { userVerifyToken } from '../../../middleware/cookieTokenVerification.js';
import { checkUserRole } from '../../../middleware/authRoleVerification.js';
import { shopVerifyToken } from '../../../middleware/shopCookieTokenVerification.js';
import { addProductToInvoice,removeProductFromInvoice, createNewInvoiceTab,getInvoice, getFullInvoice, invoiceSave, getInvoiceSaved, getInvoiceWithId, deleteOpenOrder, invoiceClear} from '../../../controller/invoiceController/index.js';
import { customInvoiceCreate, customInvoiceDelete, payCustomInvoice } from '../../../controller/invoiceCustomController/invoiceCustomController.js';


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


invoiceRouter.post('/custom/create',shopVerifyToken,userVerifyToken,checkUserRole('admin'),customInvoiceCreate)
invoiceRouter.delete('/custom/:id',shopVerifyToken,userVerifyToken,checkUserRole('admin'),customInvoiceDelete)
invoiceRouter.put('/custom/:id/pay',shopVerifyToken,userVerifyToken,checkUserRole('admin'),payCustomInvoice)

// This endpoint from add invoice controller
invoiceRouter.post('/custom/:invoiceId/product',shopVerifyToken,userVerifyToken,checkUserRole('admin'),addProductToInvoice)
invoiceRouter.put('/custom/:invoiceId/product/:productsId',shopVerifyToken,userVerifyToken,checkUserRole('admin'),removeProductFromInvoice)

 
  
export default invoiceRouter
