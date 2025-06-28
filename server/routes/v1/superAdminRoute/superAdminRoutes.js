import express from 'express';
import { userVerifyToken } from '../../../middleware/cookieTokenVerification.js';
import { checkUserRole } from '../../../middleware/authRoleVerification.js';
import {superAdminlogin,UpdateSuperAdmin,checkSuperAdminLogin,superAdminProfilePage,logOutSuperAdmin,createShop,updateShopBySuperAdmin,updateShopPasswordBySuperAdmin,getShops,CreateEmployeeBySuperAdmin,getStaffsBySuperAdmin,deleteStaffBySuperAdmin,UpdateStaffBySuperAdmin,deleteShop} from "../../../controller/superAdminController/index.js"
import { addPermissionToStaff, getSingleStaff, removePermissionFromStaff, updateStaffPassword } from '../../../controller/commonController/commonController.js';
import { categorySale, daySaleForLineChart, monthBaseTotal, paymentMethodInvoice, weeklySale, yearBaseSale } from '../../../controller/dashboardController/dashboardController.js';


const superAdminRouter = express.Router();

//  super admin
superAdminRouter.post('/login', superAdminlogin);
superAdminRouter.get('/check-logged',userVerifyToken,checkUserRole("super-admin"),checkSuperAdminLogin);
superAdminRouter.post('/logout',userVerifyToken,checkUserRole("super-admin"),logOutSuperAdmin);
superAdminRouter.put('/:id',userVerifyToken,checkUserRole("super-admin"),UpdateSuperAdmin);
superAdminRouter.get('/',userVerifyToken,checkUserRole("super-admin"),superAdminProfilePage);

// This routes for shops
superAdminRouter.post('/shops',userVerifyToken,checkUserRole("super-admin"),createShop);
superAdminRouter.put('/shops/:id',userVerifyToken,checkUserRole("super-admin"),updateShopBySuperAdmin);
superAdminRouter.patch('/shops/:id',userVerifyToken,checkUserRole("super-admin"),updateShopPasswordBySuperAdmin);
superAdminRouter.get('/shops',userVerifyToken,checkUserRole("super-admin"),getShops);
 superAdminRouter.delete('/shops/:id',userVerifyToken,checkUserRole("super-admin"),deleteShop);
 
// This routes for staffs
superAdminRouter.post('/employees',userVerifyToken,checkUserRole("super-admin"),CreateEmployeeBySuperAdmin);
superAdminRouter.delete('/employees/:id',userVerifyToken,checkUserRole("super-admin"),deleteStaffBySuperAdmin);
superAdminRouter.put('/employees/:id',userVerifyToken,checkUserRole("super-admin"),UpdateStaffBySuperAdmin);
superAdminRouter.get('/employees',userVerifyToken,checkUserRole("super-admin"),getStaffsBySuperAdmin);

// this endpoint from commom controller
superAdminRouter.patch('/employees/:id/password',userVerifyToken,checkUserRole("super-admin"),updateStaffPassword);
superAdminRouter.patch('/staff/:id/permissions',userVerifyToken,checkUserRole("super-admin"),addPermissionToStaff);
superAdminRouter.delete('/staff/:id/permissions',userVerifyToken,checkUserRole("super-admin"),removePermissionFromStaff);
superAdminRouter.get('/staff/:id',userVerifyToken,checkUserRole("super-admin"),getSingleStaff);
 

// dashboard

superAdminRouter.get('/dashboard/invoices/month',userVerifyToken,checkUserRole("super-admin"),monthBaseTotal);
superAdminRouter.get('/dashboard/invoices/week',userVerifyToken,checkUserRole("super-admin"),weeklySale);
superAdminRouter.get('/dashboard/invoices/year',userVerifyToken,checkUserRole("super-admin"),yearBaseSale);
superAdminRouter.get('/dashboard/invoices/days',userVerifyToken,checkUserRole("super-admin"),daySaleForLineChart);
superAdminRouter.get('/dashboard/invoices/payment-method',userVerifyToken,checkUserRole("super-admin"),paymentMethodInvoice);
superAdminRouter.get('/dashboard/invoices/categories',userVerifyToken,checkUserRole("super-admin"),categorySale);


export default superAdminRouter
