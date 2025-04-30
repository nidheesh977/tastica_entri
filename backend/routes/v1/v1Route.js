import express from "express";
import staffRouter from "./staffRoute/staffRoutes.js";
import productRouter from "./productRoute/productRoutes.js";
import adminRouter from "./adminRoutes/adminRoute.js";
import shopRouter from "./shopRoute/shopRoutes.js";
import categoryRoute from "./categoryRoute/categoryRoutes.js";

const v1Router = express.Router();

v1Router.use("/staff", staffRouter);
v1Router.use("/product", productRouter);
v1Router.use("/admin", adminRouter);
v1Router.use("/shop",shopRouter);
v1Router.use("/category",categoryRoute);

export default v1Router;
