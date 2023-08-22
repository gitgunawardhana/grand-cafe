import express from 'express';
import authRoutes from './auth.js';
import productsController from './products.js';


const router = express.Router();

router.use('/auth', authRoutes);

router.use('/products', productsController);

export default router;
