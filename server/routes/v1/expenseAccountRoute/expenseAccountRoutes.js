import express from "express"
import { createExpenseAccount, addNewExpenseInAccount, getExpenseAccountForExpenseForm, getExpenseAccounts, getSingleExpenseAccount, expenseAccountTitleStatusUpdate, expenseAccountStatusUpdate, getExpenseAccountTitle } from "../../../controller/expenseAccoutController/index.js";
import { shopVerifyToken } from "../../../middleware/shopCookieTokenVerification.js";
import { userVerifyToken } from "../../../middleware/cookieTokenVerification.js";
import { checkUserRole } from "../../../middleware/authRoleVerification.js";
import { checkPermission } from "../../../middleware/permissonMiddleware.js";



const expenseAccountRouter = express.Router();

expenseAccountRouter.post('/', shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), checkPermission("create_expense_account"), createExpenseAccount)
expenseAccountRouter.post('/:id', shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), checkPermission("create_expense_account"), addNewExpenseInAccount)
expenseAccountRouter.patch('/', shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), checkPermission("status_expense_accoun"), expenseAccountStatusUpdate)
expenseAccountRouter.patch('/:expenseId/title', shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), checkPermission("status_expense_account"), expenseAccountTitleStatusUpdate)
expenseAccountRouter.get('/', shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), checkPermission("view_expense_account"), getExpenseAccounts)
expenseAccountRouter.get("/title", shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), getExpenseAccountTitle)
expenseAccountRouter.get('/form', shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), getExpenseAccountForExpenseForm)
expenseAccountRouter.get('/:expenseId', shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), checkPermission("view_expense_account"), getSingleExpenseAccount)

export default expenseAccountRouter; 