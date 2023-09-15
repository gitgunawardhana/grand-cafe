import mongoose from "mongoose";

const passcodeSchema = new mongoose.Schema({
  passcode: String,
  expiresAt: Date,
});

export default mongoose.model("Passcode", passcodeSchema);
