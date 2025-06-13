import express from "express";
import { checkStaffLogin,  loginStaff, logOutStaff } from "../../../controller/staffController.js";
import { checkUserRole } from "../../../middleware/authRoleVerification.js";
import { userVerifyToken} from "../../../middleware/cookieTokenVerification.js";
import { shopVerifyToken } from "../../../middleware/shopCookieTokenVerification.js";





const staffRouter = express.Router();


staffRouter.post('/login',shopVerifyToken,loginStaff)

//  protected routes
staffRouter.get('/check-logged',shopVerifyToken,userVerifyToken,checkUserRole("staff"),checkStaffLogin)
staffRouter.post('/logout',shopVerifyToken,userVerifyToken,checkUserRole("staff"),logOutStaff)




export default staffRouter; 