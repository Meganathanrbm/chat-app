import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
  emailId: {
    type: String,
  },
  password: {
    type: String,
  },
  otp: {
    type: Number,
  },
  otpExpire: {
    type: Date,
  },
});

const AuthUser = mongoose.model("AuthUser", authSchema);
export default AuthUser;
