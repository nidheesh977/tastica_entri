import express from "express"
import { createPaymentAccount, getAccountType, getPaymentAccountForShop, getPaymentAcountForExpenseForm, paymentActiveOrInactive } from "../../../controller/paymentAccountController/index.js"
import { shopVerifyToken } from "../../../middleware/shopCookieTokenVerification.js";
import { userVerifyToken } from "../../../middleware/cookieTokenVerification.js";
import { checkUserRole } from "../../../middleware/authRoleVerification.js";

const paymentAccountRouter = express.Router()

paymentAccountRouter.post("/", shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), createPaymentAccount);
paymentAccountRouter.get("/", shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), getPaymentAccountForShop);
paymentAccountRouter.get("/form", shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), getPaymentAcountForExpenseForm);
paymentAccountRouter.get("/type", shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), getAccountType);
paymentAccountRouter.patch("/", shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), paymentActiveOrInactive);

export default paymentAccountRouter;