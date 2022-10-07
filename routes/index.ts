import express from 'express';
import authenticationRoutes from '../api/user/authentication/infrastructure/Routes';
import categoryRoutes from '../api/category/Infrastructure/Routes';

const router = express.Router();

router.use('/', authenticationRoutes);
router.use('/category', categoryRoutes);

export default router; 