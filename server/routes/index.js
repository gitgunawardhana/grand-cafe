import express from "express";
import authRoutes from "./auth.js";
import cartController from "./cart.js";
import productsController from "./products.js";
import categoryController from "./category.js";
import userRoutes from "./user.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/products", productsController);
router.use("/add_cart", cartController);
router.use("/category", categoryController);

export default router;
