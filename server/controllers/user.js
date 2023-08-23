import Seat from "../models/Seat.js";
import SeatBooking from "../models/SeatBooking.js";

export const getAllSeats = async (req, res) => {
  try {
    const seats = await Seat.find();
    res.status(200).json(seats);
  } catch (err) {
    res.status(500).json(err);
  }
};

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
      console.log("updatedSeatNew ", updatedSeatNew);
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const seatBooking = async (req, res) => {
  const newSeatBooking = new SeatBooking({
    user: req.user.id,
    dateTime: req.body.dateTime,
    bookingSeats: req.body.bookingSeats,
  });

  try {
    const savedSeatBooking = await newSeatBooking.save();
    res.status(200).json(savedSeatBooking);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
