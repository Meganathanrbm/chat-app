import bcrypt from "bcryptjs";
import crypto from "crypto";
import nodemailer from "nodemailer";
import User from "../db/models/user.model.js";
import generateJWTandSetCookie from "../utils/generateJWTandSetCookie.js";
import AuthUser from "../db/models/auth.model.js";
import dotenv from "dotenv";

dotenv.config();
export const signup = async (req, res) => {
  try {
    const { fullname, mobile, emailId, gender } = req.body;
    // find the user
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      return res
        .status(500)
        .json({ code: 500, error: "Internal Server Error!." });
    }
    //  profile picture
    const boy = "https://avatar.iran.liara.run/public/boy?username=" + emailId;
    const girl =
      "https://avatar.iran.liara.run/public/girl?username=" + emailId;

    // for side panel user profile list
    const allUsers = await User.find(
      {},
      {
        _id: 1,
        fullname: 1,
        profilePic: 1,
        createdAt: 1,
        gender: 1,
        emailId: 1,
        about: 1,
      }
    );
    user.fullname = fullname;
    user.mobile = mobile;
    user.emailId = emailId;
    user.gender = gender;
    user.profilePic = gender === "male" ? boy : girl;
    user.chatList = allUsers;

    if (user) {
      // JWT - for authorization
      generateJWTandSetCookie(user._id, res);
      await user.save();
      return res.status(201).json({
        code: 201,
        data: {
          _id: user._id,
          fullname: user.fullname,
          mobile: user.mobile,
          emailId: user.emailId,
          profilePic: user.profilePic,
          gender: user.gender,
          createdAt: user.createdAt,
          about: user.about,
        },
        message: "Signup success!",
      });
    } else {
      return res.status(400).json({ code: 400, error: "Invalid Credentials!" });
    }
  } catch (error) {
    console.log("signup failed", error);
    res.status(500).json({ code: 500, error: "Internal Server Error " });
  }
};
export const login = async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    const passwordMatch = await bcrypt.compare(password, user?.password || "");
    if (!user || !passwordMatch) {
      return res
        .status(500)
        .json({ code: 500, error: "Invalid username or password." });
    }

    generateJWTandSetCookie(user._id, res);
    res.status(200).json({
      code: 200,
      data: {
        _id: user._id,
        fullname: user.fullname,
        mobile: user.mobile,
        emailId: user.emailId,
        profilePic: user.profilePic,
        gender: user.gender,
        createdAt: user.createdAt,
        about: user.about,
      },
      message: "Login success!.",
    });
  } catch (error) {
    console.log("Login failed", error);
    res.status(500).json({ code: 500, error: "Internal Server Error" });
  }
};
export const logout = async (req, res) => {
  try {
    res
      .cookie("jwt", "", { maxAge: 0 })
      .status(200)
      .json({ code: 200, message: "logout success." });
  } catch (error) {
    console.log("Logout failed", error);
    res.status(500).json({ code: 500, error: "Internal Server Error " });
  }
};
export const forgetPassword = async (req, res) => {
  try {
    const { emailId } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      return res.status(404).json({ code: 404, error: "user not found!" });
    }
    // generate token for more secure
    const token = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 2 * 60 * 60 * 1000; // expire after 1 hour
    await user.save();
    // for send reset password email send.
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: true,
      },
    });
    const resetLink = `${req.protocol}://${req.get(
      "host"
    )}/auth/resetPassword/${token}`;
    const emailOptions = {
      from: "chat-app@gmail.com",
      to: emailId,
      subject: "Chat App Reset Password!.",
      html: `
        <p>Hello, ${user.fullname}</p>
        <p>You have requested to reset your password. Please click the link below to reset your password:</p>
        <a href="${resetLink}">Reset Password</a>
        <p>If you did not request this, please ignore this email.</p>
        <p>Regards,</p>
        <p>Chat-App.</p>
      `,
    };
    transporter.sendMail(emailOptions, (err) => {
      if (err) {
        console.log("Forget Password  failed", err);
        return res.status(500).json({
          code: 500,
          error: "Internal Server Error ",
        });
      }
      return res.status(200).json({
        code: 200,
        message: "Forget Password mail sent!.",
      });
    });
  } catch (error) {
    console.log("Forget Password  failed", error);
    res.status(500).json({ code: 500, error: "Internal Server Error " });
  }
};
export const resetPassword = async (req, res) => {
  try {
    // search user who satisfy token and expires.
    const user = await User.findOne({
      resetPasswordToken: req.query.resetPasswordToken,
      resetPasswordExpires: { $gt: Date.now() },
    });
    // if user doesnt exist
    if (!user) {
      return res
        .status(404)
        .json({ code: 404, error: "Password reset is expired! or Invalid." });
    }
    const { password, confirmPassword } = req.body;

    if (confirmPassword !== password) {
      return res
        .status(400)
        .json({ code: 400, error: "Confirm password doesn't match!" });
    }
    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    user.password = hashedPassword;
    generateJWTandSetCookie(user._id, res);
    await user.save();
    return res
      .status(200)
      .json({ code: 200, message: "password updated successfully!" });
  } catch (error) {
    console.log("Reset Password  failed", error);
    res.status(500).json({ code: 500, error: "Internal Server Error " });
  }
};
// otp generate
export const generateOTP = async (req, res) => {
  try {
    const { emailId, password, confirmPassword } = req.body;
    if (confirmPassword !== password) {
      return res
        .status(400)
        .json({ code: 400, error: "Confirm password doesn't match!" });
    }
    // if user already exist return
    const user = await User.find({ emailId: emailId });
    if (user.length) {
      return res.status(400).json({ code: 400, error: "User already exist!" });
    }
    // generate otp
    const otp = crypto.randomInt(1000, 9999).toString();
    const otpExpire = Date.now() + 15 * 60 * 1000; // expire after 15 Minutes
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new AuthUser({
      emailId,
      otp,
      otpExpire,
      password: hashedPassword,
    });
    await newUser.save();
    // send mail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: true,
      },
    });
    const emailOptions = {
      from: `"Chat-App" <${process.env.EMAIL_ID}>`,
      to: emailId,
      subject: "Chat App Email Verification.",
      html: `
        <h4>Welcome to ChatApp!</h4>
        <h2>Confirm verification code</h2>
        <p>Please enter the following code on the page where you Entered your Email ID</p>
        <h1>${otp}</h1>
        <p>This verification code will only be valid for the next 15 minutes.</p>
        <p>If you did not request this, please ignore this email.</p>
        <p>Regards,</p>
        <p>Chat-App.</p>
      `,
    };
    transporter.sendMail(emailOptions, (err) => {
      if (err) {
        console.log("generateOTP  failed", err);
        return res.status(500).json({
          code: 500,
          error: "Internal Server Error ",
        });
      }
    });
    return res
      .status(200)
      .json({ code: 200, message: "Verification mail sent Successfully!." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ code: 500, error: "Internal Server Error!" });
  }
};
// verify OTP
export const verifyOTP = async (req, res) => {
  try {
    const { emailId, otp } = req.body;
    const user = await AuthUser.findOne({
      emailId: emailId,
      otpExpire: { $gt: Date.now() },
    });
    // check authuser exist and otp match
    if (!user || user.otp != otp) {
      return res.status(404).json({ code: 404, error: "Invalid Code." });
    }
    const existingUser = await User.find({ emailId: emailId });
    if (existingUser.length) {
      return res.status(500).json({ code: 500, error: "User already exist!." });
    }
    const newUser = new User({ emailId, password: user.password });
    await newUser.save();
    // clean up
    await AuthUser.findByIdAndDelete(user._id);
    return res
      .status(201)
      .json({ code: 201, message: "User created Successfully!." });
  } catch (error) {
    console.log("verify otp", error);
    return res
      .status(500)
      .json({ code: 500, error: "Internal Server Error!." });
  }
};
