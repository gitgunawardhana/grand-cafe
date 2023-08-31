import mongoose from "mongoose";

const { Schema } = mongoose;

const seatBookingSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    dateTime: {
      type: Date,
      required: true,
    },
    bookingSeats: [
      {
        type: Schema.Types.ObjectId,
        ref: "Seat",
      },
    ],
    state: {
      type: Boolean,
      default: true,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("SeatBooking", seatBookingSchema);
