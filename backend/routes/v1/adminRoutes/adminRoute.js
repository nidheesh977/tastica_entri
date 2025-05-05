import express from 'express'
import { loginAdmin, CreateEmployee, checkAdminLogin, logOutAdmin } from '../../../controller/adminController.js';
import { userVerifyToken } from '../../../middleware/cookieTokenVerification.js';
import { checkUserRole } from '../../../middleware/authRoleVerification.js';



const adminRouter = express.Router();

adminRouter.post('/login',loginAdmin);

// protected routes
adminRouter.post('/create-employee',userVerifyToken,checkUserRole("admin"),CreateEmployee)
adminRouter.post('/logout',userVerifyToken,checkUserRole("admin"),logOutAdmin)
adminRouter.get('/check-logged',userVerifyToken,checkUserRole("admin"),checkAdminLogin)

 
export default adminRouter;