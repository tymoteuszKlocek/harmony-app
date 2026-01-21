import { Router } from 'express';
import { contentController } from '../controllers/contentController';

const router = Router();

router.get('/questions', contentController.getQuestions);
router.get('/quote', contentController.getQuote);

export default router;