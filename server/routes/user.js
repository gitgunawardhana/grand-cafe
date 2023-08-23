import express from "express";
import { getAllSeats, seatBooking, updateSeats } from "../controllers/user.js";
import { verify } from "../utils/checkAuth.js";

const router = express.Router();

router.get("/get-all-seats", getAllSeats);
router.put("/update-all-seats", updateSeats);
router.post("/seat-booking", verify, seatBooking);

export default router;
