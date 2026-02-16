import express from "express"
import { createExpenseAccount, addNewExpenseInAccount, getExpenseAccountForExpenseForm, getExpenseAccounts, getSingleExpenseAccount, deleteExpenseAccountTitle, expenseAccountStatusUpdate } from "../../../controller/expenseAccoutController/index.js";
import { shopVerifyToken } from "../../../middleware/shopCookieTokenVerification.js";
import { userVerifyToken } from "../../../middleware/cookieTokenVerification.js";
import { checkUserRole } from "../../../middleware/authRoleVerification.js";


const expenseAccountRouter = express.Router();

expenseAccountRouter.post('/', shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), createExpenseAccount)
expenseAccountRouter.post('/:id', shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), addNewExpenseInAccount)
expenseAccountRouter.patch('/', shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), expenseAccountStatusUpdate)
expenseAccountRouter.get('/', shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), getExpenseAccounts)
expenseAccountRouter.get('/form', shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), getExpenseAccountForExpenseForm)
expenseAccountRouter.get('/:expenseId', shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), getSingleExpenseAccount)
expenseAccountRouter.patch('/:expenseId/title', shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), deleteExpenseAccountTitle)

export default expenseAccountRouter; 