import mongoose from "mongoose";

const user = new mongoose.Schema(
  {
    fullname: {
      type: String,
    },
    mobile: {
      type: String,
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
      enum: ["male", "female"],
    },
    profilePic: {
      type: String,
      default: "",
    },
    about: {
      type: String,
      default: "Hey! there am using Chatapp!.",
      maxLength: 100,
    },
    chatList: {
      type: Object,
      default: {},
    },
  },
  // for createdAt and updatedAt
  { timestamps: true }
);

const User = mongoose.model("User", user);
export default User;
