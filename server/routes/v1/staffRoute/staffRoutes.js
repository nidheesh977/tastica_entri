import express from "express";
import { checkStaffLogin,  loginStaff, logOutStaff } from "../../../controller/staffController.js";
import { checkUserRole } from "../../../middleware/authRoleVerification.js";
import { userVerifyToken} from "../../../middleware/cookieTokenVerification.js";





const staffRouter = express.Router();


staffRouter.post('/login', loginStaff)

//  protected routes
staffRouter.get('/check-logged',userVerifyToken,checkUserRole("staff"),checkStaffLogin)
staffRouter.post('/logout',userVerifyToken,checkUserRole("staff"),logOutStaff)




export default staffRouter; 