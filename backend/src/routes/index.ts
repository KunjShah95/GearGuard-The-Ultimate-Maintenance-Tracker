import { Router } from 'express';
import authRoutes from './auth.routes.js';
import equipmentRoutes from './equipment.routes.js';
import teamsRoutes from './teams.routes.js';
import requestsRoutes from './requests.routes.js';
import dashboardRoutes from './dashboard.routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/equipment', equipmentRoutes);
router.use('/teams', teamsRoutes);
router.use('/requests', requestsRoutes);
router.use('/dashboard', dashboardRoutes);

export default router;
