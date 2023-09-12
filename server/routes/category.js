import express from 'express';
const router = express.Router();
import { view, addCategory , deleteCategory } from '../controllers/category.js';

// Use the imported productsController
router.use('/viewcategory', view);
router.use('/addcategory', addCategory);
router.use('/deleteCategory/:CategoryId', deleteCategory);


export default router;
