import mongoose from "mongoose";

const { Schema } = mongoose;

const seatBookingSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    inDateTime: {
      type: Date,
      required: true,
    },
    outDateTime: {
      type: Date,
      required: true,
      // Set up the TTL index here
      expires: 0, // Automatically delete documents when outDateTime is reached
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
    generatedRecipe: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("SeatBooking", seatBookingSchema);
