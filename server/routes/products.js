import express from 'express';
const router = express.Router();
import {view} from '../controllers/products.js';

// Use the imported productsController
router.use('/product', view);

export default router;
