import express from "express";
import adminAuthRoutes from "./adminUser.js";
import authRoutes from "./auth.js";
import cartController from "./cart.js";
import categoryController from "./category.js";
import inventoryController from "./inventory.js";
import productsController from "./products.js";
import userRoutes from "./user.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/admin/auth", adminAuthRoutes);
router.use("/user", userRoutes);
router.use("/products", productsController);
router.use("/add_cart", cartController);
router.use("/category", categoryController);
router.use("/inventory", inventoryController);

export default router;
