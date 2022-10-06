import express from 'express';
import authenticationRoutes from '../api/user/authentication/infrastructure/Routes';

const router = express.Router();

router.use('/api', authenticationRoutes);

export default router; 