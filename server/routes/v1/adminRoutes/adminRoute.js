import express from 'express'
import { loginAdmin, CreateEmployee, checkAdminLogin, logOutAdmin, getStaffs, deleteStaff, UpdateStaff, updateUserPassword } from '../../../controller/adminController.js';
import { userVerifyToken } from '../../../middleware/cookieTokenVerification.js';
import { checkUserRole } from '../../../middleware/authRoleVerification.js';
import { shopVerifyToken } from '../../../middleware/shopCookieTokenVerification.js';



const adminRouter = express.Router();

adminRouter.post('/login',loginAdmin);

// protected routes
adminRouter.post('/create-employee',shopVerifyToken,userVerifyToken,checkUserRole("admin","staff"),CreateEmployee);
adminRouter.get('/staff/list',shopVerifyToken,userVerifyToken,checkUserRole("admin","staff"),getStaffs);
adminRouter.delete('/staff/:id',shopVerifyToken,userVerifyToken,checkUserRole("admin"),deleteStaff);
adminRouter.put('/staff/:id',shopVerifyToken,userVerifyToken,checkUserRole("admin"),UpdateStaff);
adminRouter.patch('/staff/:id/password',shopVerifyToken,userVerifyToken,checkUserRole("admin"),updateUserPassword);
adminRouter.post('/logout',shopVerifyToken,userVerifyToken,checkUserRole("admin"),logOutAdmin);
adminRouter.get('/check-logged',shopVerifyToken,userVerifyToken,checkUserRole("admin"),checkAdminLogin);

 
export default adminRouter;