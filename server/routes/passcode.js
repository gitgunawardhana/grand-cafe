import express from "express";
import { checkExpiration, createPasscode } from "../controllers/passcode.js";
const router = express.Router();

router.post("/create", createPasscode);
router.get("/check-expiration/:passcodeId", checkExpiration);

export default router;
