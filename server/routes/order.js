import express from 'express';
const router = express.Router();
import {viewOrder, addOrder } from '../controllers/order.js';

// Use the imported productsController
router.use('/viewOrder', viewOrder);
router.use('/addOrder', addOrder);

export default router;
