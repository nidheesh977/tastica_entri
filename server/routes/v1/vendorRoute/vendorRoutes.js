import express from "express"
import { createNewVendor, getVendorDataForShop, getVendorForExpenseForm, vendorStatusUpdate } from "../../../controller/vendorController/index.js";
import { shopVerifyToken } from "../../../middleware/shopCookieTokenVerification.js";
import { userVerifyToken } from "../../../middleware/cookieTokenVerification.js";
import { checkUserRole } from "../../../middleware/authRoleVerification.js";
import { createVendorStaff, getVendorStaffForExpenseForm, vendorStaffDataForShop, vendorStaffStatusUpdate } from "../../../controller/VendorStaffController/index.js";
import { checkPermission } from "../../../middleware/permissonMiddleware.js";

const vendorRouter = express.Router();

vendorRouter.post("/", shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), checkPermission("vendor_create"), createNewVendor)
vendorRouter.patch("/", shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), checkPermission("vendor_change_status"), vendorStatusUpdate)
vendorRouter.get("/", shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), checkPermission("vendor_view"), getVendorDataForShop)
vendorRouter.get("/form", shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), getVendorForExpenseForm)

vendorRouter.post("/staff/create", shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), checkPermission("vendor_create"), createVendorStaff)
vendorRouter.patch("/staff/:vendorId", shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), checkPermission("vendor_change_status"), vendorStaffStatusUpdate)
vendorRouter.get("/staff/form/:vendorId", shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), getVendorStaffForExpenseForm)
vendorRouter.get("/:vendorId/staff", shopVerifyToken, userVerifyToken, checkUserRole('admin', 'staff'), checkPermission("vendor_view"), vendorStaffDataForShop)


export default vendorRouter