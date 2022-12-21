import {signUp, signIn} from '../controllers/authController.js';
import { signUpValidation, signInValidation } from '../middlewares/authMiddleware.js';
import {Router} from 'express';

const router = Router();

router.post("/signup",signUpValidation, signUp); 

router.post("/signin",signInValidation, signIn);

export default router;