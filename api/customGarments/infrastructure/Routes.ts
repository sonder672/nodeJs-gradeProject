import express from 'express';
import { customController } from './IoC';

const router = express.Router();

router.post('/', customController.save);
router.post('/user', customController.getByUser);

export default router;