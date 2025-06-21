import express from "express";
import staffRouter from "./staffRoute/staffRoutes.js";
import productRouter from "./productRoute/productRoutes.js";
import adminRouter from "./adminRoutes/adminRoute.js";
import shopRouter from "./shopRoute/shopRoutes.js";
import categoryRoute from "./categoryRoute/categoryRoutes.js";
import superAdminRouter from "./superAdminRoute/superAdminRoutes.js";
import invoiceRouter from "./invoiceRoute/invoiceRoutes.js";
import customerRouter from "./customerRoute/customerRoutes.js";
import searchRouter from "./searchRoute/searchRoutes.js";
import fileUploadRouter from "./fileUploadRoute/fileUploadRoutes.js";
import customProductRouter from "./customProductRoute/customProductRoutes.js";
import paymentRouter from "./paymentRoutes/paymentRoute.js";
import loyalityRouter from './loyalityPointRoute/loyalityPointRoutes.js'
import redeemRouter from "./redeemRoute/redeemRoutes.js";
import adminDashBoardRouter from "./adminDashboardRoute/adminDashboardRoutes.js";
import passwordResetRouter from "./passwordResetRoute/passwordResetRoute.js";
import printRouter from "./thermalPrintRoute/thermalPrintRoutes.js";


const v1Router = express.Router();

v1Router.use("/payment",paymentRouter);
v1Router.use("/search",searchRouter);
v1Router.use("/file",fileUploadRouter);
v1Router.use("/custom-product",customProductRouter);
v1Router.use("/staff", staffRouter);
v1Router.use("/product", productRouter);
v1Router.use("/admin", adminRouter);
v1Router.use("/shop",shopRouter);
v1Router.use("/categories",categoryRoute);
v1Router.use("/invoice",invoiceRouter);
v1Router.use("/customer",customerRouter);
v1Router.use("/super-admin",superAdminRouter);
v1Router.use("/loyality",loyalityRouter);
v1Router.use("/redeem",redeemRouter);
v1Router.use("/admin/dashboard",adminDashBoardRouter);
v1Router.use("/password",passwordResetRouter);
v1Router.use("/print",printRouter);


export default v1Router;
