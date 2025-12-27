import { Router } from 'express';
import * as dashboardController from '../controllers/dashboard.controller.js';
import { auth } from '../middleware/auth.js';

const router = Router();

router.use(auth);

router.get('/stats', dashboardController.getStats);
router.get('/recent-requests', dashboardController.getRecentRequests);
router.get('/users', dashboardController.getUsers);

export default router;
