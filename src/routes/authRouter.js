import {signUp, signIn} from '../controllers/authController.js';
import { signUpValidation } from '../middlewares/authMiddleware.js';
import {Router} from 'express';

const router = Router();

router.post("/sign-up",signUpValidation, signUp); 

router.post("/sign-in", signIn);

export default router;