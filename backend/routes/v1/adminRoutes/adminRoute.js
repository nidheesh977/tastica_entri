import express from 'express'
import { loginAdmin, CreateEmployee } from '../../../controller/adminController.js';
import { verifyAuthAdminToken } from '../../../middleware/admin/authAdminVerifyToken.js';
import { adminAuthorizeRole } from '../../../middleware/admin/adminAuthorizeRole.js';


const adminRouter = express.Router();

adminRouter.post('/login',loginAdmin);

// protected routes
adminRouter.post('/create-employee',verifyAuthAdminToken,adminAuthorizeRole("admin"),CreateEmployee)


 
export default adminRouter;