import express from "express";
import { checkUserRole } from "../../../middleware/authRoleVerification.js";
import { userVerifyToken} from "../../../middleware/cookieTokenVerification.js";
import { shopVerifyToken } from "../../../middleware/shopCookieTokenVerification.js";
import {loginStaff,staffLogged,logOutStaff} from "../../../controller/staffControllers/index.js";


const staffRouter = express.Router();


staffRouter.post('/login',shopVerifyToken,loginStaff)

//  protected routes
staffRouter.get('/check-logged',shopVerifyToken,userVerifyToken,checkUserRole("staff"),staffLogged)
staffRouter.post('/logout',shopVerifyToken,userVerifyToken,checkUserRole("staff"),logOutStaff)




export default staffRouter; 