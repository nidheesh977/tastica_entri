import express from 'express'
import { userVerifyToken } from '../../../middleware/cookieTokenVerification.js';
import { checkUserRole } from '../../../middleware/authRoleVerification.js';
import { shopVerifyToken } from '../../../middleware/shopCookieTokenVerification.js';
import { addProductToInvoice, removeProductFromInvoice, softDeleteInvoice, createNewInvoiceTab, getInvoice, getFullInvoice, invoiceSave, getInvoiceSaved, getInvoiceWithId, deleteOpenOrder, invoiceClear, addProductDiscountInPOS } from '../../../controller/invoiceController/index.js';
import { addCustomerDetailToCustomInvoice, customInvoiceCreate, customInvoiceDelete } from '../../../controller/invoiceCustomController/invoiceCustomController.js';



const invoiceRouter = express.Router()

//  This route only admin
invoiceRouter.get('/', shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), getFullInvoice);

invoiceRouter.post('/:customerId', shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), createNewInvoiceTab);
invoiceRouter.post('/:invoiceId/products', shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), addProductToInvoice);
invoiceRouter.put('/:invoiceId/product/:productsId', shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), removeProductFromInvoice);
invoiceRouter.get('/:invoiceId', shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), getInvoice);
invoiceRouter.patch('/:id', shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), invoiceSave);
invoiceRouter.get('/save/status-saved', shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), getInvoiceSaved)

invoiceRouter.delete('/status-saved/:id', shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), deleteOpenOrder)
invoiceRouter.put('/:invoiceId/toggle-archived', shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), softDeleteInvoice)

invoiceRouter.post('/', shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), getInvoiceWithId)
invoiceRouter.put('/:id/clear', shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), invoiceClear)


// Add manual discount
invoiceRouter.put('/:invoiceId/discount/product', shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), addProductDiscountInPOS)

invoiceRouter.post('/custom/create', shopVerifyToken, userVerifyToken, checkUserRole('admin'), customInvoiceCreate)
invoiceRouter.delete('/custom/:id', shopVerifyToken, userVerifyToken, checkUserRole('admin'), customInvoiceDelete)
invoiceRouter.put('/custom/:id/customer', shopVerifyToken, userVerifyToken, checkUserRole('admin'), addCustomerDetailToCustomInvoice)

// This endpoint from add invoice controller
invoiceRouter.post('/custom/:invoiceId/product', shopVerifyToken, userVerifyToken, checkUserRole('admin'), addProductToInvoice)
invoiceRouter.put('/custom/:invoiceId/product/:productsId', shopVerifyToken, userVerifyToken, checkUserRole('admin'), removeProductFromInvoice)



export default invoiceRouter
