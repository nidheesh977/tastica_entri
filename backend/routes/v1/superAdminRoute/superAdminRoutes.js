import express from 'express';
import { CreateEmployee } from '../../../controller/superAdminController.js';
import { createShop } from '../../../controller/shopController.js';

const superAdminRouter = express.Router();

// This route only for testing
superAdminRouter.post('/create-employee', CreateEmployee)
superAdminRouter.post('/create-shop', createShop)

export default superAdminRouter