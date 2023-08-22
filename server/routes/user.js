import express from "express";
import { getAllSeats, updateSeats } from "../controllers/user.js";

const router = express.Router();

router.get("/get-all-seats", getAllSeats);
router.put("/update-all-seats", updateSeats);

export default router;
