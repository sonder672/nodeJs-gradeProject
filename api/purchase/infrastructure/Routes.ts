import express from 'express';
import { leadController } from './IoC';

const router = express.Router();

router.post('/', leadController.saveAndSendLead);

export default router; 