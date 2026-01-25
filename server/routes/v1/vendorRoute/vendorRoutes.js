import express from "express"
import { createNewVendor, getVendorForExpenseForm } from "../../../controller/vendorController/index.js";
import { shopVerifyToken } from "../../../middleware/shopCookieTokenVerification.js";
import { userVerifyToken } from "../../../middleware/cookieTokenVerification.js";
import { checkUserRole } from "../../../middleware/authRoleVerification.js";

const vendorRouter = express.Router();

vendorRouter.post("/", shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), createNewVendor)
vendorRouter.get("/", shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), getVendorForExpenseForm)

export default vendorRouter