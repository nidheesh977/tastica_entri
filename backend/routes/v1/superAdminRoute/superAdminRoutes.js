import express from 'express';
import { CreateEmployee, createShop } from '../../../controller/superAdminController.js';

const superAdminRouter = express.Router();

// This route only for testing
superAdminRouter.post('/create-employee', CreateEmployee)
superAdminRouter.post('/create-shop', createShop)

export default superAdminRouter