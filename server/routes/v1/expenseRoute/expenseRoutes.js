import express from "express"
import { createExpense, getCustomerForExpenseForm, getExpense, getSingleExpense } from "../../../controller/expenseController/index.js";
import { shopVerifyToken } from "../../../middleware/shopCookieTokenVerification.js";
import { userVerifyToken } from "../../../middleware/cookieTokenVerification.js";
import { checkUserRole } from "../../../middleware/authRoleVerification.js";
import { upload } from "../../../middleware/multerMiddleware.js";
import { getImageDoc } from "../../../controller/expenseController/expenseController.controller.js";

const expenseRouter = express.Router();

expenseRouter.post("/", shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), upload.single("image_doc"), createExpense)
expenseRouter.get("/", shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), getExpense)
expenseRouter.get("/image", shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), getImageDoc)
expenseRouter.get("/customer", shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), getCustomerForExpenseForm)
expenseRouter.get("/:expenseId", shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), getSingleExpense)


export default expenseRouter