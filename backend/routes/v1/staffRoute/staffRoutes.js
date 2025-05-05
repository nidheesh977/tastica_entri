import express from "express";
import { checkStaffLogin,  loginStaff, logOutStaff } from "../../../controller/staffController.js";
import { checkUserRole } from "../../../middleware/authRoleVerification.js";
import { verifyToken } from "../../../middleware/cookieTokenVerification.js";





const staffRouter = express.Router();


staffRouter.post('/login', loginStaff)

//  protected routes
staffRouter.get('/check-logged',verifyToken,checkUserRole("staff"),checkStaffLogin)
staffRouter.post('/logout',verifyToken,checkUserRole("staff"),logOutStaff)




export default staffRouter; 