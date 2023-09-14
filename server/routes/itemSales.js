import express from "express";
import { getSoldQuantityByCategory } from "../controllers/itemSales.js";
const router = express.Router();

// Use the imported productsController
router.use("/sold-quantity-by-category", getSoldQuantityByCategory);

export default router;
