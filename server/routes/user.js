import express from "express";
import {
  createSeatBooking,
  deleteSeatBookingById,
  deleteSeatBookingByUser,
  deleteUserByEmail,
  getAllSeatBooking,
  getAllSeats,
  getAllUsers,
  getAvailableSeats,
  getBookingSeatsByUserId,
  getCurrentUser,
  getUserByEmail,
  getUserById,
  updateCurrentUser,
  updateSeats,
} from "../controllers/user.js";
import { verify } from "../utils/checkAuth.js";

const router = express.Router();

// user details
router.get("/get-all-users", getAllUsers);
router.get("/get-current-user", verify, getCurrentUser);
router.put("/update-current-user", verify, updateCurrentUser);
router.get("/get-user-by-email", verify, getUserByEmail);
router.get("/get-user-by-id", getUserById);
router.delete("/delete-user-by-email", deleteUserByEmail);

// table booking
router.get("/get-all-seats", verify, getAllSeats);
router.get("/get-available-seats", verify, getAvailableSeats);
router.put("/update-all-seats", verify, updateSeats);
router.post("/create-seat-booking", verify, createSeatBooking);
router.get("/get-all-seat-booking", verify, getAllSeatBooking);
router.get("/get-all-seat-booking-by-user", verify, getBookingSeatsByUserId);
router.delete("/delete-seats-booking/:id", verify, deleteSeatBookingById);
router.delete("/delete-seats-booking-by-user", verify, deleteSeatBookingByUser);

export default router;
