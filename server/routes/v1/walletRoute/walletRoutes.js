import express from "express";
import { createWallet, rechargeWallet, walletLog } from "../../../controller/walletController/walletController.js";
import { shopVerifyToken } from "../../../middleware/shopCookieTokenVerification.js";
import { userVerifyToken } from "../../../middleware/cookieTokenVerification.js";
import { checkUserRole } from "../../../middleware/authRoleVerification.js";
import { walletVerifyToken } from "../../../middleware/walletTokenVerify.js";


const walletRouter = express.Router();

walletRouter.post('/login',shopVerifyToken,userVerifyToken,checkUserRole("staff","admin"),walletLog);
walletRouter.put('/recharge',shopVerifyToken,userVerifyToken,checkUserRole("staff","admin"),walletVerifyToken,rechargeWallet);


export default walletRouter;