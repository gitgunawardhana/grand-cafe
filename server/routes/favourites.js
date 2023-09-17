import express from 'express';
const router = express.Router();
import { addFavourite , view }  from '../controllers/favourites.js';

// Use the imported productsController
router.use('/addFavourites', addFavourite);
router.use('/viewFavourites', view);
export default router;
