import express from "express"
import { createPaymentAccount } from "../../../controller/paymentAccountController/index.js"
import { shopVerifyToken } from "../../../middleware/shopCookieTokenVerification.js";
import { userVerifyToken } from "../../../middleware/cookieTokenVerification.js";
import { checkUserRole } from "../../../middleware/authRoleVerification.js";

const paymentAccountRouter = express.Router()

paymentAccountRouter.post("/", shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), createPaymentAccount);

export default paymentAccountRouter;