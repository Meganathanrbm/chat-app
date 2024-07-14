import mongoose from "mongoose";

const user = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      minLength: 6,
      required: true,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
    },
    profilePic: {
      type: String,
      default: "",
    },
  },
  // for createdAt and updatedAt
  { timestamps: true }
);

const User = mongoose.model("User", user);
export default User;
