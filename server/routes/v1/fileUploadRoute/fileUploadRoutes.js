import express from 'express';
import { productsFileUploader } from '../../../controller/csvOrExeclFileUploud/productFileUploadController.js';
import upload from '../../../middleware/uploadMiddleware.js.js';
import { categoryFileUploader } from '../../../controller/csvOrExeclFileUploud/categoryFileUploadController.js';

const fileUploadRouter = express.Router()


fileUploadRouter.post('/upload',upload.single('file'),productsFileUploader);
fileUploadRouter.post('/upload/category',upload.single('file'),categoryFileUploader);


export default fileUploadRouter