import express from 'express';
import { productsFileUploader } from '../../../controller/csvOrExeclFileUploud/productFileUploadController.js';
import upload from '../../../middleware/uploadMiddleware.js.js';
import { categoryFileUploader } from '../../../controller/csvOrExeclFileUploud/categoryFileUploadController.js';
import { shopVerifyToken } from '../../../middleware/shopCookieTokenVerification.js';
import { userVerifyToken } from '../../../middleware/cookieTokenVerification.js';
import { checkUserRole } from '../../../middleware/authRoleVerification.js';
import { checkPermission } from '../../../middleware/permissonMiddleware.js';

const fileUploadRouter = express.Router()


fileUploadRouter.post('/upload',shopVerifyToken,userVerifyToken,checkUserRole("admin","staff"),checkPermission("product_create"),upload.single('file'),productsFileUploader);
fileUploadRouter.post('/upload/category',shopVerifyToken,userVerifyToken,checkUserRole("admin","staff"),checkPermission("category_create"),upload.single('file'),categoryFileUploader);


export default fileUploadRouter
