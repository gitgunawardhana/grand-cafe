import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    userCode: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

// Middleware function to generate and assign userCode
userSchema.pre("save", async function (next) {
  // Check if the document is new (not an update)
  if (this.isNew) {
    // Find the highest userCode in the collection
    const highestUser = await this.constructor.findOne()
      .sort("-userCode")
      .exec();

    // If there are no existing documents, start with UNREG01
    if (!highestUser || !highestUser.userCode) {
      this.userCode = "UNREG01";
    } else {
      // Extract the numeric part of the highest userCode and increment it
      const highestNumber = parseInt(highestUser.userCode.match(/\d+/)[0]);
      const nextNumber = highestNumber + 1;
      // Pad the number with leading zeros if necessary
      const nextUserCode = `UNREG${nextNumber.toString().padStart(2, "0")}`;
      this.userCode = nextUserCode;
    }
  }

  next();
});

export default mongoose.model("Unreg", userSchema);
