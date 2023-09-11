import express from 'express';
const router = express.Router();
import { view, addCategory } from '../controllers/category.js';

// Use the imported productsController
router.use('/viewcategory', view);
router.use('/addcategory', addCategory);


export default router;
