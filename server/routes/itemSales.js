import express from "express";
import { getSoldQuantityByCategory,getItemSales } from "../controllers/itemSales.js";
const router = express.Router();

// Use the imported productsController
router.use("/sold-quantity-by-category", getSoldQuantityByCategory);
router.use("/get-item-sales", getItemSales);

export default router;
