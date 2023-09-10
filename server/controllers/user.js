import Seat from "../models/Seat.js";
import SeatBooking from "../models/SeatBooking.js";
import User from "../models/User.js";

// ? Get all user details
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

// ? Get current user
export const getCurrentUser = async (req, res) => {
  const userId = req.user.id;
  try {
    // Query the database to find the user based on the criteria
    const user = await User.findOne({ _id: userId });

    if (!user) {
      // If the user is not found, return a 404 status code
      res.status(404).json({ message: "User not found" });
    } else {
      // If the user is found, return the user data
      res.status(200).json(user);
    }
  } catch (err) {
    // Handle any errors that occur during the process
    res.status(500).json(err);
  }
};

// ? Update current user
export const updateCurrentUser = async (req, res) => {
  const userId = req.user.id;
  const userData = req.body;
  try {
    // Query the database to find the user based on the criteria
    const user = await User.findOne({ _id: userId });

    if (!user) {
      // If the user is not found, return a 404 status code
      res.status(404).json({ message: "User not found" });
    } else {
      // If the user is found, update the user data and return the updated user
      const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        userData,
        { new: true }
      );
      res.status(200).json(updatedUser);
    }
  } catch (err) {
    // Handle any errors that occur during the process
    res.status(500).json(err);
  }
};

// ? Get user by email
export const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.body; // Get the criteria from the request body

    // Query the database to find the user based on the criteria
    const user = await User.findOne({ email });

    if (!user) {
      // If the user is not found, return a 404 status code
      res.status(404).json({ message: "User not found" });
    } else {
      // If the user is found, return the user data
      res.status(200).json(user);
    }
  } catch (err) {
    // Handle any errors that occur during the process
    res.status(500).json(err);
  }
};

// ! Table booking related --------------------------------------------------------------

// ? Get all seat details
export const getAllSeats = async (req, res) => {
  try {
    const seats = await Seat.find();
    res.status(200).json(seats);
  } catch (err) {
    res.status(500).json(err);
  }
};

// ? Update seat availability
export const updateSeats = async (req, res) => {
  try {
    const updatedSeats = req.body.updatedSeats;

    // Loop through the updated seats and update the database
    for (const updatedSeat of updatedSeats) {
      const number = updatedSeat.number;

      const updatedSeatNew = await Seat.findOneAndUpdate(
        { number: number },
        { number: updatedSeat.number, available: updatedSeat.available },
        {
          new: true,
        }
      );
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// ? Create a new seat booking with user id
export const createSeatBooking = async (req, res) => {
  const { inDateTime, outDateTime, bookingSeats } = req.body; // ! bookingSeats: string[] = ["T1S2", "T1S3"]

  try {
    // Find the corresponding Seat documents using the provided seat numbers
    const seats = await Seat.find({ number: { $in: bookingSeats } });

    // Extract the Seat IDs from the found Seat documents
    const seatIds = seats.map((seat) => seat._id);

    const newSeatBooking = new SeatBooking({
      user: req.user.id,
      inDateTime,
      outDateTime,
      bookingSeats: seatIds,
    });

    // Update the availability of booked seats to false
    // await Seat.updateMany(
    //   { _id: { $in: seatIds } },
    //   { $set: { available: false } }
    // );

    const savedSeatBooking = await newSeatBooking.save();
    res.status(200).json(savedSeatBooking);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// ? Get all seat booking without filtering
export const getAllSeatBooking = async (req, res) => {
  try {
    const seatBookings = await SeatBooking.find().populate("user bookingSeats");
    res.status(200).json(seatBookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ? Get all seat booking by user ID, where the parameter called 'snumber=true' is passed then the output will be the extract seat number only.
export const getBookingSeatsByUserId = async (req, res) => {
  const userId = req.user.id;
  const showSeatNumbers = req.query.snumber === "true";

  try {
    const userBookingSeats = await SeatBooking.find({ user: userId }).populate(
      "bookingSeats"
    );

    if (!userBookingSeats) {
      return res
        .status(404)
        .json({ error: "No booking seats found for this user" });
    }

    // Extract and return seat numbers if showSeatNumbers is true
    if (showSeatNumbers) {
      const seatNumbers = userBookingSeats.map((booking) =>
        booking.bookingSeats.map((seat) => seat.number)
      );
      res.status(200).json(seatNumbers);
    } else {
      res.status(200).json(userBookingSeats);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ? Seat booking delete from booking id
export const deleteSeatBookingById = async (req, res) => {
  const bookingId = req.params.id;

  try {
    const booking = await SeatBooking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    // const seatIds = booking.bookingSeats;

    // Update the availability of booked seats to true
    // await Seat.updateMany(
    //   { _id: { $in: seatIds } },
    //   { $set: { available: true } }
    // );

    // Delete the booking using deleteOne()
    await SeatBooking.deleteOne({ _id: bookingId });

    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ? Delete Seat booking By User ID Here will delete all seat bookings related to the particular user
export const deleteSeatBookingByUser = async (req, res) => {
  const userId = req.user.id;

  try {
    const bookings = await SeatBooking.find({ user: userId });

    if (bookings.length === 0) {
      return res
        .status(404)
        .json({ error: "Bookings not found for this user" });
    }

    // for (const booking of bookings) {
    //   const seatIds = booking.bookingSeats;

    //   // Update the availability of booked seats to true
    //   await Seat.updateMany(
    //     { _id: { $in: seatIds } },
    //     { $set: { available: true } }
    //   );
    // }

    // Delete the bookings by user ID
    await SeatBooking.deleteMany({ user: userId });

    res.status(200).json({ message: "Bookings deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function to get available seats based on inDateTime and outDateTime
export const getAvailableSeats = async (req, res) => {
  const { inDateTime, outDateTime } = req.query;

  try {
    // Parse the query parameters into Date objects
    const inDate = new Date(inDateTime);
    const outDate = new Date(outDateTime);

    // Find all seat bookings that overlap with the specified time range
    const overlappingBookings = await SeatBooking.find({
      $or: [
        {
          inDateTime: { $lte: inDate },
          outDateTime: { $gte: inDate },
        },
        {
          inDateTime: { $lte: outDate },
          outDateTime: { $gte: outDate },
        },
        {
          inDateTime: { $gte: inDate },
          outDateTime: { $lte: outDate },
        },
      ],
    });

    // Extract the seat IDs from the overlapping bookings
    const bookedSeatIds = overlappingBookings.flatMap(
      (booking) => booking.bookingSeats
    );

    // Find all seats and mark them as available or not available
    const allSeats = await Seat.find();

    // Create the response in the desired format
    const response = allSeats.map((seat) => ({
      _id: seat._id,
      number: seat.number,
      available: !bookedSeatIds.some((bookedSeatId) =>
        bookedSeatId.equals(seat._id)
      ),
    }));

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
