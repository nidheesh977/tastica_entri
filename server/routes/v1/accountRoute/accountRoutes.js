import express from "express"
import { shopVerifyToken } from "../../../middleware/shopCookieTokenVerification.js"
import { userVerifyToken } from "../../../middleware/cookieTokenVerification.js"
import { checkUserRole } from "../../../middleware/authRoleVerification.js"
import { defaultAccountsSystemCreate, getAccountsForSales } from "../../../controller/accountController/accountController.js"


const acountRouter = express.Router()

acountRouter.post("/", shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), defaultAccountsSystemCreate)
acountRouter.get("/sales/purchase/customInvoice/form", shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), getAccountsForSales)




export default acountRouter