import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    userCode: {
      type: String,
      required: false,
    },
    firstName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobileNo: {
      type: String,
      required: false,
    },
    gender: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  // Check if the document is new (not an update)
  if (this.isNew) {
    // Find the highest userCode in the collection
    const highestOrder = await this.constructor.findOne()
      .sort("-userCode")
      .exec();

    // If there are no existing documents, start with UNREG01
    if (!highestOrder || !highestOrder.userCode) {
      this.userCode = "REG01";
    } else {
      // Extract the numeric part of the highest userCode and increment it
      const highestNumber = parseInt(highestOrder.userCode.match(/\d+/)[0]);
      const nextNumber = highestNumber + 1;
      // Pad the number with leading zeros if necessary
      const nextUserCode = `REG${nextNumber.toString().padStart(2, "0")}`;
      this.userCode = nextUserCode;
    }
  }

  next();
});



export default mongoose.model("User", userSchema);
