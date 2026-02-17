import express from "express";
import { addTaxRatesToAccount, createTaxRateAccount, deleteTaxRate, getTaxRatesForExpenseForm, getTaxRatesForShop } from "../../../controller/taxController/index.js";
import { shopVerifyToken } from "../../../middleware/shopCookieTokenVerification.js";
import { userVerifyToken } from "../../../middleware/cookieTokenVerification.js";
import { checkUserRole } from "../../../middleware/authRoleVerification.js";

const taxRateRouter = express.Router();

taxRateRouter.post("/", shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), createTaxRateAccount)
taxRateRouter.post("/add", shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), addTaxRatesToAccount)
taxRateRouter.get("/", shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), getTaxRatesForShop)
taxRateRouter.get("/expense-form", shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), getTaxRatesForExpenseForm)
taxRateRouter.delete("/:taxAccountId/rate/:taxRateId", shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), deleteTaxRate)


export default taxRateRouter