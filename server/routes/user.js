import express from "express";
import {
  checkIfEmailExists,
  createGeneratedRecipe,
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
  getGeneratedRecipeBySeatBookingId,
  getPendingBookingSeatsByUserId,
  getUserByEmail,
  getUserById,
  resetPassword,
  updateCurrentUser,
  updatePassword,
  updateSeats,
  updateUserByID,
} from "../controllers/user.js";
import { verify } from "../utils/checkAuth.js";

const router = express.Router();

// user details
router.get("/get-all-users", getAllUsers);
router.get("/get-current-user", verify, getCurrentUser);
router.put("/update-current-user", verify, updateCurrentUser);
router.put("/update-user-by-id", updateUserByID);
router.get("/get-user-by-email", verify, getUserByEmail);
router.post("/reset-password", verify, resetPassword);
router.get("/get-user-by-id", getUserById);
router.delete("/delete-user-by-email", deleteUserByEmail);
router.use("/get-user-email", getUserByEmail);

// table booking
router.get("/get-all-seats", verify, getAllSeats);
router.get("/get-available-seats", verify, getAvailableSeats);
router.put("/update-all-seats", verify, updateSeats);
router.post("/create-seat-booking", verify, createSeatBooking);
router.post("/check-if-email-exists", checkIfEmailExists);
router.post("/update-password", updatePassword);
router.get("/get-all-seat-booking", getAllSeatBooking);
router.get("/get-all-seat-booking-by-user", verify, getBookingSeatsByUserId);
router.get(
  "/get-all-pending-seat-booking-by-user",
  verify,
  getPendingBookingSeatsByUserId
);
router.delete("/delete-seats-booking/:id", deleteSeatBookingById);
router.delete("/delete-seats-booking-by-user", verify, deleteSeatBookingByUser);

// recipe generating
router.post("/create-recipe", verify, createGeneratedRecipe);
router.get(
  "/get-recipe-by-seat-booking-id",

  getGeneratedRecipeBySeatBookingId
);

export default router;
