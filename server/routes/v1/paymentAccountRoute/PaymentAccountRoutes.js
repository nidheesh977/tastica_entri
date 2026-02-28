import express from "express"
import { createPaymentAccount, getAccountType, getPaymentAccountForShop, getPaymentAcountForExpenseForm, paymentActiveOrInactive } from "../../../controller/paymentAccountController/index.js"
import { shopVerifyToken } from "../../../middleware/shopCookieTokenVerification.js";
import { userVerifyToken } from "../../../middleware/cookieTokenVerification.js";
import { checkUserRole } from "../../../middleware/authRoleVerification.js";
import { checkPermission } from "../../../middleware/permissonMiddleware.js";

const paymentAccountRouter = express.Router()

paymentAccountRouter.post("/", shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), checkPermission("payment_acc_create"), createPaymentAccount);
paymentAccountRouter.get("/", shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), checkPermission("payment_acc_view"), getPaymentAccountForShop);
paymentAccountRouter.get("/form", shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), getPaymentAcountForExpenseForm);
paymentAccountRouter.get("/type", shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), getAccountType);
paymentAccountRouter.patch("/", shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), checkPermission("payment_acc_change_status"), paymentActiveOrInactive);

export default paymentAccountRouter;