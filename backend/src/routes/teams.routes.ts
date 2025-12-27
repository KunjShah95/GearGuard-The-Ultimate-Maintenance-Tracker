import { Router } from 'express';
import * as teamsController from '../controllers/teams.controller.js';
import { auth } from '../middleware/auth.js';

const router = Router();

router.use(auth);

router.get('/', teamsController.getAll);
router.get('/:id', teamsController.getById);
router.post('/', teamsController.create);
router.patch('/:id', teamsController.update);
router.delete('/:id', teamsController.remove);

router.post('/:id/members', teamsController.addMember);
router.delete('/:id/members/:userId', teamsController.removeMember);

export default router;
