import express from "express"
import { createExpense, getExpense, getSingleExpense } from "../../../controller/expenseController/index.js";
import { shopVerifyToken } from "../../../middleware/shopCookieTokenVerification.js";
import { userVerifyToken } from "../../../middleware/cookieTokenVerification.js";
import { checkUserRole } from "../../../middleware/authRoleVerification.js";
import { upload } from "../../../middleware/multerMiddleware.js";
import { downloadExpensePdf, getImageDoc, getTaxRateAmount, uploadImageToExpense } from "../../../controller/expenseController/expenseController.controller.js";
import { checkPermission } from "../../../middleware/permissonMiddleware.js";

const expenseRouter = express.Router();

expenseRouter.post("/", shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), upload.single("image_doc"), checkPermission("create_expense"), createExpense)
expenseRouter.post("/tax", shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), checkPermission("create_expense"), getTaxRateAmount)
expenseRouter.get("/", shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), checkPermission("view_expense"), getExpense)
expenseRouter.get("/download/:expenseId", shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), checkPermission("view_expense"), downloadExpensePdf)
expenseRouter.get("/image", shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), getImageDoc)
// expenseRouter.patch("/upload", shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), upload.single("image_doc"), uploadImageToExpense)
expenseRouter.get("/:expenseId", shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), checkPermission("view_expense"), getSingleExpense)
expenseRouter.patch("/:expenseId", shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), upload.single("image_doc"), checkPermission("create_expense"), uploadImageToExpense)
export default expenseRouter 