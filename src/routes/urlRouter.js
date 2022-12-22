import { listUrlsById, redirectToLink, deleteUrlById} from '../controllers/urlController.js';
import { tokenValidation } from '../middlewares/tokenValidationMiddleware.js';
import {Router} from 'express';

const router = Router();

router.get("/urls/:id", listUrlsById);
router.get("/urls/open/:shortUrl", redirectToLink);
router.delete("/urls/:id",tokenValidation, deleteUrlById);

export default router;