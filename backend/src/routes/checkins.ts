import { Router } from 'express';
import { checkinController } from '../controllers/checkinController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.use(authMiddleware);

router.post('/', checkinController.createOrUpdate);
router.get('/today', checkinController.getToday);
router.get('/', checkinController.getHistory);
router.get('/:id', checkinController.getById);

export default router;