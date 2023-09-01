import express from "express";
import authRoutes from "./auth.js";
import productsController from "./products.js";
import userRoutes from "./user.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/products", productsController);

export default router;
