import express from "express";
import {
  createSeatBooking,
  deleteSeatBookingById,
  deleteSeatBookingByUser,
  getAllSeatBooking,
  getAllSeats,
  getAvailableSeats,
  getBookingSeatsByUserId,
  updateSeats,
} from "../controllers/user.js";
import { verify } from "../utils/checkAuth.js";

const router = express.Router();

router.get("/get-all-seats", verify, getAllSeats);
router.get("/get-available-seats", verify, getAvailableSeats);
router.put("/update-all-seats", verify, updateSeats);
router.post("/create-seat-booking", verify, createSeatBooking);
router.get("/get-all-seat-booking", verify, getAllSeatBooking);
router.get("/get-all-seat-booking-by-user", verify, getBookingSeatsByUserId);
router.delete("/delete-seats-booking/:id", verify, deleteSeatBookingById);
router.delete("/delete-seats-booking-by-user", verify, deleteSeatBookingByUser);

export default router;
