import express from "express";
import { addTaxRatesToAccount, createTaxRateAccount, getTaxRatesForExpenseForm, getTaxRatesForShop, taxRateStatusUpdate } from "../../../controller/taxController/index.js";
import { shopVerifyToken } from "../../../middleware/shopCookieTokenVerification.js";
import { userVerifyToken } from "../../../middleware/cookieTokenVerification.js";
import { checkUserRole } from "../../../middleware/authRoleVerification.js";

const taxRateRouter = express.Router();

taxRateRouter.post("/", shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), createTaxRateAccount)
taxRateRouter.post("/add", shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), addTaxRatesToAccount)
taxRateRouter.get("/", shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), getTaxRatesForShop)
taxRateRouter.get("/expense-form", shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), getTaxRatesForExpenseForm)
taxRateRouter.patch("/:taxAccountId/", shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), taxRateStatusUpdate)


export default taxRateRouter 