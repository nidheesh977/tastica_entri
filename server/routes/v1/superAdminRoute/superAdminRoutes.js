import express from 'express';
import { checkSuperAdminLogin, CreateEmployeeBySuperAdmin, deleteStaffBySuperAdmin, getShops, getStaffsBySuperAdmin, logOutSuperAdmin, superAdminlogin, UpdateStaffBySuperAdmin } from '../../../controller/superAdminController.js';
import { createShop } from '../../../controller/shopController.js';
import { userVerifyToken } from '../../../middleware/cookieTokenVerification.js';
import { checkUserRole } from '../../../middleware/authRoleVerification.js';

const superAdminRouter = express.Router();

//  super admin
superAdminRouter.post('/login', superAdminlogin);
superAdminRouter.get('/check-logged',userVerifyToken,checkUserRole("super-admin"),checkSuperAdminLogin);
superAdminRouter.post('/logout',userVerifyToken,checkUserRole("super-admin"),logOutSuperAdmin);

// This routes for shops
superAdminRouter.post('/create-shop',userVerifyToken,checkUserRole("super-admin"),createShop);
superAdminRouter.get('/shop',userVerifyToken,checkUserRole("super-admin"),getShops);

// This routes for staffs
superAdminRouter.post('/create-employee',userVerifyToken,checkUserRole("super-admin"),CreateEmployeeBySuperAdmin);
superAdminRouter.delete('/employee/:id/delete',userVerifyToken,checkUserRole("super-admin"),deleteStaffBySuperAdmin);
superAdminRouter.put('/employee/:id/update',userVerifyToken,checkUserRole("super-admin"),UpdateStaffBySuperAdmin);
superAdminRouter.get('/employee/list',userVerifyToken,checkUserRole("super-admin"),getStaffsBySuperAdmin);


 

export default superAdminRouter