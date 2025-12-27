import { Router } from 'express';
import * as equipmentController from '../controllers/equipment.controller.js';
import { auth } from '../middleware/auth.js';

const router = Router();

router.use(auth);

router.get('/', equipmentController.getAll);
router.get('/:id', equipmentController.getById);
router.get('/:id/requests', equipmentController.getRequests);
router.post('/', equipmentController.create);
router.patch('/:id', equipmentController.update);
router.delete('/:id', equipmentController.remove);

export default router;
