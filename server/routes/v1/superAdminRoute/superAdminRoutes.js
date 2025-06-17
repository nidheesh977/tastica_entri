import express from 'express';
import { checkSuperAdminLogin, CreateEmployeeBySuperAdmin, deleteStaffBySuperAdmin, getShops, getStaffsBySuperAdmin, logOutSuperAdmin, superAdminlogin, updateShopBySuperAdmin, updateShopPasswordBySuperAdmin, UpdateStaffBySuperAdmin, UpdateSuperAdmin} from '../../../controller/superAdminController.js';
import { createShop } from '../../../controller/shopController.js';
import { userVerifyToken } from '../../../middleware/cookieTokenVerification.js';
import { checkUserRole } from '../../../middleware/authRoleVerification.js';
import { addPermissionToStaff, getSingleStaff, removePermissionFromStaff, updateStaffPassword } from '../../../controller/commonController/commonController.js';


const superAdminRouter = express.Router();

//  super admin
superAdminRouter.post('/login', superAdminlogin);
superAdminRouter.get('/check-logged',userVerifyToken,checkUserRole("super-admin"),checkSuperAdminLogin);
superAdminRouter.post('/logout',userVerifyToken,checkUserRole("super-admin"),logOutSuperAdmin);
superAdminRouter.put('/:id',userVerifyToken,checkUserRole("super-admin"),UpdateSuperAdmin);

// This routes for shops
superAdminRouter.post('/shops',userVerifyToken,checkUserRole("super-admin"),createShop);
superAdminRouter.put('/shops/:id',userVerifyToken,checkUserRole("super-admin"),updateShopBySuperAdmin);
superAdminRouter.patch('/shops/:id',userVerifyToken,checkUserRole("super-admin"),updateShopPasswordBySuperAdmin);
superAdminRouter.get('/shops',userVerifyToken,checkUserRole("super-admin"),getShops);
 
// This routes for staffs
superAdminRouter.post('/employees',userVerifyToken,checkUserRole("super-admin"),CreateEmployeeBySuperAdmin);
superAdminRouter.delete('/employees/:id',userVerifyToken,checkUserRole("super-admin"),deleteStaffBySuperAdmin);
superAdminRouter.put('/employees/:id',userVerifyToken,checkUserRole("super-admin"),UpdateStaffBySuperAdmin);
superAdminRouter.get('/employees',userVerifyToken,checkUserRole("super-admin"),getStaffsBySuperAdmin);

// this endpoint from commom controller
superAdminRouter.patch('/employees/:id/password',userVerifyToken,checkUserRole("super-admin"),updateStaffPassword);
superAdminRouter.patch('/staff/:id/permissions',userVerifyToken,checkUserRole("super-admin"),addPermissionToStaff);
superAdminRouter.delete('/staff/:id/permissions',userVerifyToken,checkUserRole("super-admin"),removePermissionFromStaff);
superAdminRouter.get('/staff/:id/:shopId',userVerifyToken,checkUserRole("super-admin"),getSingleStaff);
 
 

export default superAdminRouter