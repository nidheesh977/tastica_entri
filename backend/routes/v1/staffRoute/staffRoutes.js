import express from "express";
import { checkStaffLogin, loginUser } from "../../../controller/staffController.js";
import { verifyAuthStaffToken } from "../../../middleware/staff/authStaffVerifyToken.js";

const staffRouter = express.Router();


staffRouter.post('/login', loginUser)

//  protected routes
staffRouter.get('/check-logged',verifyAuthStaffToken,checkStaffLogin)



export default staffRouter; 