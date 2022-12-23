import { getUrlById, redirectToLink, deleteUrlById, rankingUrlsByVisit} from '../controllers/urlController.js';
import { tokenValidation } from '../middlewares/tokenValidationMiddleware.js';
import {Router} from 'express';

const router = Router();

router.get("/urls/:id", getUrlById);
router.get("/urls/open/:shortUrl", redirectToLink);
router.get("/ranking", rankingUrlsByVisit )
router.delete("/urls/:id",tokenValidation, deleteUrlById);


export default router;