import express from "express";
import { loginUser } from "../../../controller/staffController.js";

const staffRouter = express.Router();


staffRouter.post('/login', loginUser)

export default staffRouter; 