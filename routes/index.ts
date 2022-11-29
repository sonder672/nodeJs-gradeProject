import express from 'express';
import authenticationRoutes from '../api/user/authentication/infrastructure/Routes';
import categoryRoutes from '../api/category/infrastructure/Routes';
import productRoutes from '../api/product/infrastructure/Routes';
import cartRoutes from '../api/cart/infrastructure/Routes';
import leadRoutes from '../api/purchase/infrastructure/Routes';
import colorRoutes from '../api/color/infrastructure/Routes';
import customizationRoutes from '../api/customGarments/infrastructure/Routes';

const router = express.Router();

router.use('/user', authenticationRoutes);
router.use('/category', categoryRoutes);
router.use('/product', productRoutes);
router.use('/cart', cartRoutes);
router.use('/lead', leadRoutes);
router.use('/color', colorRoutes);
router.use('/customization', customizationRoutes);

export default router; 