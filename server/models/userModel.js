import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true, // Corrected from "require" to "required"
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensures email addresses are unique across users
    },
    password: {
      type: String,
      required: true,
    },
    resetPasswordToken: {
      type: String,
      required: false, // Made optional, only needed during password reset
    },
    resetPasswordExpires: {
      type: Date, // Corrected from "Data" to "Date"
      required: false, // Made optional, only needed during password reset
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

export default mongoose.model("User", userSchema);
