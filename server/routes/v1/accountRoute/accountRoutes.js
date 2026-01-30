import express from "express"
import { createPaymentAccount, getPaymentAcountForExpenseForm } from "../../../controller/paymentAccountController/index.js"
import { shopVerifyToken } from "../../../middleware/shopCookieTokenVerification.js";
import { userVerifyToken } from "../../../middleware/cookieTokenVerification.js";
import { checkUserRole } from "../../../middleware/authRoleVerification.js";

const paymentAccountRouter = express.Router()

paymentAccountRouter.post("/", shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), createPaymentAccount);
paymentAccountRouter.get("/", shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), getPaymentAcountForExpenseForm);

export default paymentAccountRouter;