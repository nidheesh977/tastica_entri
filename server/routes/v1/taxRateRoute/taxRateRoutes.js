import express from "express";
import { addTaxRatesToAccount, createTaxRateAccount, getTaxRatesForExpenseForm, getTaxRatesForShop, taxRateStatusUpdate } from "../../../controller/taxController/index.js";
import { shopVerifyToken } from "../../../middleware/shopCookieTokenVerification.js";
import { userVerifyToken } from "../../../middleware/cookieTokenVerification.js";
import { checkUserRole } from "../../../middleware/authRoleVerification.js";
import { checkPermission } from "../../../middleware/permissonMiddleware.js";

const taxRateRouter = express.Router();

taxRateRouter.post("/", shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), checkPermission("tax_create"), createTaxRateAccount)
taxRateRouter.post("/add", shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), checkPermission("tax_create"), addTaxRatesToAccount)
taxRateRouter.get("/", shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), checkPermission("tax_rate_view"), getTaxRatesForShop)
taxRateRouter.get("/expense-form", shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), getTaxRatesForExpenseForm)
taxRateRouter.patch("/:taxAccountId/", shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), checkPermission("tax_change_status"), taxRateStatusUpdate)


export default taxRateRouter 