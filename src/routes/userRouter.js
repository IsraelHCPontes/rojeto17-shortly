import {createShortly, listUserData} from '../controllers/userController.js';
import {tokenValidation} from '../middlewares/tokenValidationMiddleware.js';
import { urlValidation } from '../middlewares/urlMiddlewere.js';
import {Router} from 'express';

const router = Router();

router.post("/urls/shorten",
urlValidation,
tokenValidation,
createShortly); 

router.get("/users/me",
tokenValidation,
listUserData); 

export default router;