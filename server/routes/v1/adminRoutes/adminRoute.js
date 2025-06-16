import express from 'express'
import { loginAdmin, CreateEmployee, checkAdminLogin, logOutAdmin, getStaffs, deleteStaff, UpdateStaff, addPermissionToStaff, removePermissionFromStaff} from '../../../controller/adminController/adminController.js';
import { userVerifyToken } from '../../../middleware/cookieTokenVerification.js';
import { checkUserRole } from '../../../middleware/authRoleVerification.js';
import { shopVerifyToken } from '../../../middleware/shopCookieTokenVerification.js';
import { updateStaffPassword } from '../../../controller/commonController/commonController.js';




const adminRouter = express.Router();


adminRouter.post('/login',shopVerifyToken,loginAdmin);

// protected routes
adminRouter.post('/create-employee',shopVerifyToken,userVerifyToken,checkUserRole("admin"),CreateEmployee);
adminRouter.get('/staff/list',shopVerifyToken,userVerifyToken,checkUserRole("admin"),getStaffs);
adminRouter.delete('/staff/:id',shopVerifyToken,userVerifyToken,checkUserRole("admin"),deleteStaff);
adminRouter.put('/staff/:id',shopVerifyToken,userVerifyToken,checkUserRole("admin"),UpdateStaff);
adminRouter.patch('/staff/:id/password',shopVerifyToken,userVerifyToken,checkUserRole("admin"),updateStaffPassword);
adminRouter.post('/logout',shopVerifyToken,userVerifyToken,checkUserRole("admin"),logOutAdmin);
adminRouter.get('/check-logged',shopVerifyToken,userVerifyToken,checkUserRole("admin"),checkAdminLogin);

adminRouter.patch('/staff/:id/permissions/add',shopVerifyToken,userVerifyToken,checkUserRole("admin"),addPermissionToStaff);
adminRouter.patch('/staff/:id/permissions/remove',shopVerifyToken,userVerifyToken,checkUserRole("admin"),removePermissionFromStaff);


 
export default adminRouter;