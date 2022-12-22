import { listUrlsForId } from '../controllers/urlController.js';
import {Router} from 'express';

const router = Router();

router.get("/urls/:id", listUrlsForId)

export default router;