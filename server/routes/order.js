import express from "express";
import {
  addOrder,
  getOrdersCountByCurrentMonth,
  getOrdersCountByMonth,
  getOrdersForCurrentMonth,
  viewOrder,
} from "../controllers/order.js";
const router = express.Router();

// Use the imported productsController
router.use("/viewOrder", viewOrder);
router.use("/addOrder", addOrder);
router.get("/current-month", getOrdersForCurrentMonth);
router.get("/count-by-current-month", getOrdersCountByCurrentMonth);
router.get("/count-by-month", getOrdersCountByMonth);

export default router;
