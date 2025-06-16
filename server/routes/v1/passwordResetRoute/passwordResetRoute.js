import express from'express';
import { resetPassword, sendResetLink} from '../../../controller/commonController/commonController.js';

const passwordResetRouter = express.Router();

passwordResetRouter.post('/reset-link',sendResetLink);
passwordResetRouter.post('/reset/:token',resetPassword);

export default passwordResetRouter;