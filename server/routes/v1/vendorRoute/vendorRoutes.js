import express from "express"
import { createNewVendor, getVendorDataForShop, getVendorForExpenseForm, vendorStatusUpdate } from "../../../controller/vendorController/index.js";
import { shopVerifyToken } from "../../../middleware/shopCookieTokenVerification.js";
import { userVerifyToken } from "../../../middleware/cookieTokenVerification.js";
import { checkUserRole } from "../../../middleware/authRoleVerification.js";

const vendorRouter = express.Router();

vendorRouter.post("/", shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), createNewVendor)
vendorRouter.patch("/", shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), vendorStatusUpdate)
vendorRouter.get("/", shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), getVendorDataForShop)
vendorRouter.get("/form", shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), getVendorForExpenseForm)

export default vendorRouter