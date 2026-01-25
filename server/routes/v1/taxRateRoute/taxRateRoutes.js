import express from "express";
import { addTaxRatesToAccount, createTaxRateAccount, getTaxRatesForExpenseForm } from "../../../controller/taxController/index.js";
import { shopVerifyToken } from "../../../middleware/shopCookieTokenVerification.js";
import { userVerifyToken } from "../../../middleware/cookieTokenVerification.js";
import { checkUserRole } from "../../../middleware/authRoleVerification.js";

const taxRateRouter = express.Router();

taxRateRouter.post("/", shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), createTaxRateAccount)
taxRateRouter.post("/:id", shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), addTaxRatesToAccount)
taxRateRouter.get("/", shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), getTaxRatesForExpenseForm)


export default taxRateRouter