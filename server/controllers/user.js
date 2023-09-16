import bcryptjs from "bcryptjs";
import moment from "moment";
import GeneratedRecipe from "../models/GeneratedRecipe.js";
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
    const user = await User.findOne({ _id: userId });

    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json(user);
    }
  } catch (err) {
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

// ? Update current user
export const updateUserByID = async (req, res) => {
  const userId = req.query.userId || req.body.userId;
  const { firstName, lastName, mobileNo, email, avatar, address, gender } =
    req.body;
  try {
    // Query the database to find the user based on the criteria
    const user = await User.findOne({ _id: userId });

    if (!user) {
      // If the user is not found, return a 404 status code
      res.status(404).json({ message: "User not found" });
    } else {
      // If the user is found, update the user data and return the updated user
      user.firstName = firstName;
      user.lastName = lastName;
      user.mobileNo = mobileNo;
      user.email = email;
      user.avatar = avatar;
      user.gender = gender;
      user.address = address;
      const updatedUser = await user.save({ new: true });

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
    const { email } = req.body;
    console.log("cham",email);
    const user = await User.findOne({ email : email });

    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(500).json(err);
  }
}; 

// ? Get user by Id
export const getUserById = async (req, res) => {
  let userId = req.query.userId || req.body.userId;
  try {
    if (!userId) {
      res.status(400).json({ message: "Id is required" });
      return;
    }

    const user = await User.findOne({ _id: userId });

    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
//?get user from


// ? Delete user by email
export const deleteUserByEmail = async (req, res) => {
  try {
    let email = req.query.email || req.body.email; // Check if email is in query parameters, if not, use request body

    if (!email) {
      res.status(400).json({ message: "Email is required" });
      return;
    }

    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      await User.findOneAndDelete({ email });
      res.status(200).json({ message: "User deleted successfully" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export const resetPassword = async (req, res) => {
  const userId = req.user.id;
  const { currentPassword, newPassword } = req.body;
  console.log(currentPassword, newPassword);

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: "Email & password are required" });
  }
  try {
    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedNewPassword = await bcryptjs.hash(newPassword, salt);

    bcryptjs.compare(currentPassword, user.password, async (err, result) => {
      if (err) {
        res.status(500).json({ message: "An error occurred" });
      }
      if (result === true) {
        // Update the user's password
        user.password = hashedNewPassword;

        // Save the updated user data
        await user.save();
        res.status(200).json({ message: "Password reset successful" });
      } else {
        return res
          .status(401)
          .json({ message: "Current password is incorrect" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
};

// ? Check email
export const checkIfEmailExists = async (req, res) => {
  try {
    let email = req.query.email || req.body.email; // Check if email is in query parameters, if not, use request body
    console.log(email);

    if (!email) {
      res.status(400).json({ message: "Email is required" });
      return;
    }

    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json({ message: "User found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// ? Update password
export const updatePassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email) {
      res.status(400).json({ message: "Email is required" });
      return;
    }

    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      const salt = await bcryptjs.genSalt(10);
      const hashedNewPassword = await bcryptjs.hash(newPassword, salt);
      user.password = hashedNewPassword;
      await user.save();
      res.status(200).json({ message: "Password reset successful" });
    }
  } catch (err) {
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

// ? Get all pending seat booking by user ID, where the parameter called 'snumber=true' is passed then the output will be the extract seat number only.
export const getPendingBookingSeatsByUserId = async (req, res) => {
  const userId = req.user.id;
  const showSeatNumbers = req.query.snumber === "true";
  const currentDateTime = moment().utc();

  try {
    const userBookingSeats = await SeatBooking.find({
      user: userId,
      outDateTime: { $gte: currentDateTime },
    }).populate("bookingSeats");

    if (!userBookingSeats) {
      return res
        .status(404)
        .json({ error: "No upcoming booking seats found for this user" });
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
export const deleteSeatBookingById = async (req, res) => {
  const bookingId = req.params.id;

  try {
    // Find the booking by its ID
    const booking = await SeatBooking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    // Extract the ID of the booking to be deleted
    const seatBookingIdToDelete = booking._id;

    // Delete the booking using deleteOne()
    await SeatBooking.deleteOne({ _id: bookingId });

    // Delete related generated recipes for the deleted seat booking
    await GeneratedRecipe.deleteOne({ seatBooking: seatBookingIdToDelete });

    res
      .status(200)
      .json({ message: "Booking and related recipe deleted successfully" });
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

    // Extract the IDs of seat bookings to be deleted
    const seatBookingIdsToDelete = bookings.map((booking) => booking._id);

    // Delete the seat bookings by user ID
    await SeatBooking.deleteMany({ user: userId });

    // Delete related generated recipes for the deleted seat bookings
    await GeneratedRecipe.deleteMany({
      seatBooking: { $in: seatBookingIdsToDelete },
    });

    res
      .status(200)
      .json({ message: "Bookings and related recipes deleted successfully" });
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

// ! Recipe Generating --------------------------------------------------------------

// ? Create a recipe for seat booking with seatBookingId
export const createGeneratedRecipe = async (req, res) => {
  const { seatBookingId, recipe } = req.body;

  try {
    // Find the corresponding SeatBooking document using the provided seatBookingId
    const seatBooking = await SeatBooking.findById(seatBookingId);

    if (!seatBooking) {
      return res.status(404).json({ error: "Seat Booking not found" });
    }

    const newGeneratedRecipe = new GeneratedRecipe({
      seatBooking: seatBookingId,
      recipe: recipe,
    });

    const savedGRecipe = await newGeneratedRecipe.save();

    // Update the generatedRecipe status in the seatBooking document
    seatBooking.generatedRecipe = true; // Set it to true since a recipe is now associated

    await seatBooking.save(); // Save the updated seatBooking document

    const savedGeneratedRecipe = await GeneratedRecipe.findById(
      savedGRecipe._id
    ).populate("seatBooking");

    res.status(200).json(savedGeneratedRecipe);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Create an endpoint to get a GeneratedRecipe by seatBookingId
export const getGeneratedRecipeBySeatBookingId = async (req, res) => {
  const seatBookingId = req.query.seatBookingId || req.body.seatBookingId;

  console.log(seatBookingId);

  try {
    // Find the GeneratedRecipe document with the given seatBookingId
    const generatedRecipe = await GeneratedRecipe.findOne({
      seatBooking: seatBookingId,
    }).populate("seatBooking");

    if (!generatedRecipe) {
      return res.status(404).json({
        error: "Generated Recipe not found for the specified Seat Booking ID",
      });
    }

    res.status(200).json(generatedRecipe);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
