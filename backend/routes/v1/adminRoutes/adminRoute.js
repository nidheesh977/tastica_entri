import express from 'express'
import { loginAdmin, CreateEmployee, checkAdminLogin, logOutAdmin } from '../../../controller/adminController.js';
import { verifyAuthAdminToken } from '../../../middleware/admin/authAdminVerifyToken.js';
import { adminAuthorizeRole } from '../../../middleware/admin/adminAuthorizeRole.js';


const adminRouter = express.Router();

adminRouter.post('/login',loginAdmin);

// protected routes
adminRouter.post('/create-employee',verifyAuthAdminToken,adminAuthorizeRole("admin"),CreateEmployee)
adminRouter.post('/logout',verifyAuthAdminToken,adminAuthorizeRole("admin"),logOutAdmin)
adminRouter.get('/check-logged',verifyAuthAdminToken,adminAuthorizeRole("admin"),checkAdminLogin)

 
export default adminRouter;