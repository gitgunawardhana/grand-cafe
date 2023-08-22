import Seat from "../models/Seat.js";

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

    // Loop through the updated tasks and update the database
    for (const updatedSeat of updatedSeats) {
      const number = updatedSeat.number;

      console.log("number ", number);

      // Update the task in the database
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
