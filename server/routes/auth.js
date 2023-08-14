import express from "express";
import { login, logout, refresh, register } from "../controllers/auth.js";
import { verify } from "../utils/checkAuth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", verify, logout);
router.post("/refresh", refresh);

export default router;
