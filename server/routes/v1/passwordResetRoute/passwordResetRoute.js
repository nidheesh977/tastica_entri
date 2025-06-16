import express from'express';
import { resetPassword, sendResetLink, verifyOtp } from '../../../controller/commonController/commonController.js';

const passwordResetRouter = express.Router();

passwordResetRouter.post('/reset-link',sendResetLink);
passwordResetRouter.post('/otp/verify',verifyOtp);
passwordResetRouter.post('/reset',resetPassword);

export default passwordResetRouter;