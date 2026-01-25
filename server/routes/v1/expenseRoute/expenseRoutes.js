import express from "express"
import { createExpense, getExpense } from "../../../controller/expenseController/index.js";
import { shopVerifyToken } from "../../../middleware/shopCookieTokenVerification.js";
import { userVerifyToken } from "../../../middleware/cookieTokenVerification.js";
import { checkUserRole } from "../../../middleware/authRoleVerification.js";

const expenseRouter = express.Router();

expenseRouter.post("/", shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), createExpense)
expenseRouter.get("/", shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), getExpense)

export default expenseRouter