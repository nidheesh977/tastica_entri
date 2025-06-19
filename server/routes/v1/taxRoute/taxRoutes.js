// import express from 'express'
// import { addOrRemoveTaxInvoice, createTax } from '../../../controller/taxController/taxController.js'
// import { shopVerifyToken } from '../../../middleware/shopCookieTokenVerification.js'
// import { userVerifyToken } from '../../../middleware/cookieTokenVerification.js'
// import { checkUserRole } from '../../../middleware/authRoleVerification.js'

// const taxRouter = express.Router()

// taxRouter.post('/',shopVerifyToken,userVerifyToken,checkUserRole('admin','staff'),createTax);
// taxRouter.put('/invoice/:invoiceId/',shopVerifyToken,userVerifyToken,checkUserRole('admin','staff'),addOrRemoveTaxInvoice);

// export default taxRouter