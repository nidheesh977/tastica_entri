import express from 'express'
import { loginAdmin, CreateEmployee, checkAdminLogin, logOutAdmin } from '../../../controller/adminController.js';
import { verifyToken } from '../../../middleware/cookieTokenVerification.js';
import { checkUserRole } from '../../../middleware/authRoleVerification.js';



const adminRouter = express.Router();

adminRouter.post('/login',loginAdmin);

// protected routes
adminRouter.post('/create-employee',verifyToken,checkUserRole("admin"),CreateEmployee)
adminRouter.post('/logout',verifyToken,checkUserRole("admin"),logOutAdmin)
adminRouter.get('/check-logged',verifyToken,checkUserRole("admin"),checkAdminLogin)

 
export default adminRouter;