import { listUrlsById, redirectToLink} from '../controllers/urlController.js';
import {Router} from 'express';

const router = Router();

router.get("/urls/:id", listUrlsById);
router.get("/urls/open/:shortUrl", redirectToLink);

export default router;