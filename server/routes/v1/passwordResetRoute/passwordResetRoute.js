import express from'express';
import { resetPassword, sendOtp, verifyOtp } from '../../../controller/commonController/commonController.js';

const passwordResetRouter = express.Router();

passwordResetRouter.post('/otp',sendOtp);
passwordResetRouter.post('/otp/verify',verifyOtp);
passwordResetRouter.post('/reset',resetPassword);

export default passwordResetRouter;