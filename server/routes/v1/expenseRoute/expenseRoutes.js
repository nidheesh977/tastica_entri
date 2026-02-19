import express from "express"
import { createExpense, getExpense, getSingleExpense } from "../../../controller/expenseController/index.js";
import { shopVerifyToken } from "../../../middleware/shopCookieTokenVerification.js";
import { userVerifyToken } from "../../../middleware/cookieTokenVerification.js";
import { checkUserRole } from "../../../middleware/authRoleVerification.js";
import { upload } from "../../../middleware/multerMiddleware.js";
import { downloadExpensePdf, getImageDoc, getTaxRateAmount, uploadImageToExpense } from "../../../controller/expenseController/expenseController.controller.js";

const expenseRouter = express.Router();

expenseRouter.post("/", shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), upload.single("image_doc"), createExpense)
expenseRouter.post("/tax", shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), getTaxRateAmount)
expenseRouter.get("/", shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), getExpense)
expenseRouter.get("/download/:expenseId", shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), downloadExpensePdf)
expenseRouter.get("/image", shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), getImageDoc)
expenseRouter.get("/:expenseId", shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), getSingleExpense)
expenseRouter.patch("/upload", shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), upload.single("image_doc"), uploadImageToExpense)
expenseRouter.patch("/:expenseId", shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), upload.single("image_doc"), uploadImageToExpense)
export default expenseRouter 