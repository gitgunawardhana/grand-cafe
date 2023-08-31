import mongoose from "mongoose";

const { Schema } = mongoose;

const seatSchema = new Schema(
  {
    number: {
      type: String,
      required: true,
    },
    available: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Seat", seatSchema);
