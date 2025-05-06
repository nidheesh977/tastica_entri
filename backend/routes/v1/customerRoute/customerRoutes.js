import express from 'express'
import { createCustomer,updateCustomer } from '../../../controller/customerController.js';


const customerRouter = express.Router();

customerRouter.post('/create',createCustomer);
customerRouter.put('/:id',updateCustomer);

export default customerRouter;