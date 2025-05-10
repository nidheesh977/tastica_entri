import express from 'express';
import { productsFileUploader } from '../../../controller/fileUploadController.js';
import upload from '../../../middleware/uploadMiddleware.js.js';

const fileUploadRouter = express.Router()


fileUploadRouter.post('/upload',upload.single('file'),productsFileUploader);


export default fileUploadRouter