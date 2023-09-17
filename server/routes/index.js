import express from "express";
import adminAuthRoutes from "./adminUser.js";
import authRoutes from "./auth.js";
import cartController from "./cart.js";
import categoryController from "./category.js";
import inventoryController from "./inventory.js";
import itemSalesRoutes from "./itemSales.js";
import ordersController from "./order.js";
import passcodeRoutes from "./passcode.js";
import productsController from "./products.js";
import unregController from "./unreg.js";
import userRoutes from "./user.js";
import favouriteRoutes from "./favourites.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/admin/auth", adminAuthRoutes);
router.use("/user", userRoutes);
router.use("/products", productsController);
router.use("/add_cart", cartController);
router.use("/category", categoryController);
router.use("/inventory", inventoryController);
router.use("/order", ordersController);
router.use("/item-sales", itemSalesRoutes);
router.use("/passcode", passcodeRoutes);
router.use("/address", unregController);
router.use("/favourite", favouriteRoutes);

export default router;
